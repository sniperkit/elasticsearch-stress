package elasticsearch

import (
	"bytes"
	"net/http"
	"io/ioutil"
	"strings"
	"fmt"
)

// rest interface with elasticsearch
type rest struct {
	HTTPClient *http.Client
	BaseURL string
}

var (
	// bulk operations are represented in Elasticsearch as NDJSON formatted pairs where the first object literal denoting
	// the operation/selectors and the second object containing the payload of the operation itself:
	//
	// {"create" : { "_index" : "test", "_type" : "test" }}\n
	// {"message":"hello, world"}\n
	//
	// Will insert a document with contents {"message":"hello, world"} to the test index with type test
	//
	bulkOperationModifyPrefix = `{"%v":{"_index":"%v","_type":"%v","_id":"%v"}}`
	bulkOperationInsertPrefix = `{"index":{"_index":"%v","_type":"%v"}}`
)

// Call the elasticsearch Search API for  given index
func (r *rest) searchIndex(index string, queryString string) ([]*Document, error){
	qs := fmt.Sprintf("_search?q=%v", queryString)
	URL := r.buildURL(index, qs)
	body, err := r.request("GET", URL, nil)

	if err != nil {
		return nil, err
	}

	return searchResponseToDocument(body)
}

// Call the elasticsearch Index API
func (r *rest) deleteIndex(index string) error {
	URL := r.buildURL(index)
	body, err := r.request("DELETE", URL, nil)

	if err != nil {
		return err
	}

	return deleteIndexResponseToDocument(body)
}

// Call the elasticsearch Search API for  given index
func (r *rest) searchType(index string, _type string, queryString string) ([]*Document, error){
	qs := fmt.Sprintf("_search?q=%v", queryString)
	URL := r.buildURL(index, _type, qs)
	body, err := r.request("GET", URL, nil)

	if err != nil {
		fmt.Println(err)
		return nil, err
	}

	return searchResponseToDocument(body)
}

// Call the elasticsearch Index API
func (r *rest) insertDocument(index string, _type string, doc []byte) (string, error){
	URL := r.buildURL(index, _type, "?refresh")
	body, err := r.request("POST", URL, doc)

	if err != nil {
		return "", err
	}

	return indexResponseToDocument(body)
}

// Call the elasticsearch Bulk API with insert operations
func (r *rest) bulkInsertDocuments(index string, _type string, docs [][]byte)([]string, error){
	// construct an NDJSON payload that satisfies the Elasticsearch API
	payload := make([][]byte, len(docs) * 2)

	// insert a bulk operation prefix before each document in the docs slice
	for i := 0; i < len(docs); i++ {
		payload[i * 2] = []byte(fmt.Sprintf(bulkOperationInsertPrefix, index, _type))
		payload[(i * 2) + 1] = docs[i]
	}

	URL := r.buildURL( "_bulk?refresh")
	body, err := r.bulkRequest("POST", URL, payload)

	if err != nil {
		return nil, err
	}

	return bulkInsertResponseToIDs(body)
}

// Call the elasticsearch Document API
func (r *rest) getDocument(index string, _type string, ID string) (*Document, error){
	URL := r.buildURL(index, _type, ID)
	body, err := r.request("GET", URL, nil)

	if err != nil {
		return nil, err
	}

	return getDocumentResponseToDocument(body)
}

// Call the elasticsearch Document API
func (r *rest) updateDocument(index string, _type string, ID string, doc []byte) error {
	URL := r.buildURL(index, _type, ID, "?refresh")
	body, err := r.request("PUT", URL, doc)

	if err != nil {
		return err
	}

	return updateDocumentResponseToDocument(body)
}

// Call the elasticsearch Bulk API with update operations
func (r *rest) bulkUpdateDocuments(index string, _type string, docs []*Document) ([]string, error){
	// construct an NDJSON payload that satisfies the Elasticsearch API
	payload := make([][]byte, len(docs) * 2)

	// insert a bulk operation prefix before each document in the docs slice
	for i := 0; i < len(docs); i++ {
		payload[i * 2] = []byte(fmt.Sprintf(bulkOperationModifyPrefix, "update", index, _type, docs[i].ID))
		doc := fmt.Sprintf(`{"doc":%v}`, string(docs[i].Body))
		payload[(i * 2) + 1] = []byte(doc)
	}

	URL := r.buildURL("_bulk")
	body, err := r.bulkRequest("POST", URL, payload)

	if err != nil {
		return nil, err
	}

	return bulkUpdateResponseToIDs(body)
}

// Call the elasticsearch Document API
func (r *rest) deleteDocument(index string, _type string, ID string) error {
	URL := r.buildURL(index, _type, ID, "?refresh")
	body, err := r.request("DELETE", URL, nil)

	if err != nil {
		return err
	}

	return deleteDocumentResponseToDocument(body)
}

// Call the elasticsearch Bulk API with delete operations
func (r *rest) bulkDeleteDocuments(index string, _type string, IDs []string) ([]string, error){
	// construct an NDJSON payload that satisfies the Elasticsearch bulk API delete operation
	payload := make([][]byte, len(IDs))

	// insert a bulk operation prefix before each document in the docs slice
	for idx, ID := range IDs {
		payload[idx] = []byte(fmt.Sprintf(bulkOperationModifyPrefix, "delete", index, _type, ID))
	}


	URL := r.buildURL("_bulk?refresh")
	body, err := r.bulkRequest("POST", URL, payload)

	if err != nil {
		return nil, err
	}

	return bulkDeleteResponseToIDs(body)
}

// Concatenate a URL from an array of strings.
func (r *rest) buildURL(parts ...string) string {
	parts = append([]string{r.BaseURL },  parts...)
	return strings.Join(parts, "/")
}

func (r *rest) buildRequest(method string, url string, body []byte) (*http.Request, error){
	var req *http.Request
	var err error

	if body == nil {
		req, err = http.NewRequest(method, url, bytes.NewBuffer([]byte{}))
	} else {
		req, err = http.NewRequest(method, url, bytes.NewBuffer(body))
	}

	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", "application/json")
	return req, nil
}

func (r *rest) buildBulkRequest(method string, url string, bodies [][]byte)(*http.Request, error){
	buffer := new(bytes.Buffer)

	for _, body := range bodies {
		buffer.Write(body)
		buffer.Write([]byte("\n"))
	}

	req, err := http.NewRequest(method, url, buffer)

	if err != nil {
		return nil, err
	}

	req.Header.Add("Content-Type", "application/json")
	return req, nil
}

func (r *rest) sendRequest(req *http.Request) ([]byte, error){
	response, err := r.HTTPClient.Do(req)

	if err != nil {
		return nil, err
	}

	defer response.Body.Close()
	contents, err := ioutil.ReadAll(response.Body)

	if err != nil {
		return nil, err
	}

	if response.StatusCode >= 299 {
		//fmt.Println(response.StatusCode, string(contents))
		return nil, errorResponseToError(contents)
	}

	return contents, err
}

// Generic method to make a JSON request against a configured endpoint.
func (r *rest) request(method string, url string, body []byte) ([]byte, error){
	req, err := r.buildRequest(method, url, body)

	if err != nil {
		return nil, err
	}

	return r.sendRequest(req)
}

// Generic method to make an NDJSON request against a configured endpoint
func (r *rest) bulkRequest(method string, url string, bodies [][]byte)([]byte, error){
	req, err := r.buildBulkRequest(method, url, bodies)

	if err != nil {
		return nil, err
	}

	return r.sendRequest(req)
}