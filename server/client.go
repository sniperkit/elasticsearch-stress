package main

import (
	pb "github.com/b3ntly/elasticsearch-stress/server/_proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/icrowley/fake"
	"golang.org/x/net/context"
	"github.com/b3ntly/elasticsearch"
	"fmt"
	"log"
	"time"
	"encoding/json"
	"net/http"
	"os"
	"google.golang.org/grpc/grpclog"
)

var (
	// env vars we use to dynamically configure the application
	PORT_KEY = "GRPC_PORT"
	ES_URI_KEY = "ELASTICSEARCH_URI"
	ES_DEFAULT_INDEX = "ELASTICSEARCH_DEFAULT_INDEX"
	ES_DEFAULT_TYPE = "ELASTICSEARCH_DEFAULT_TYPE"

	GRPC_PORT = os.Getenv(PORT_KEY)
	ELASTICSEARCH_URI = os.Getenv(ES_URI_KEY)
	ELASTICSEARCH_INDEX = os.Getenv(ES_DEFAULT_INDEX)
	ELASTICSEARCH_TYPE = os.Getenv(ES_DEFAULT_TYPE)

	ES *elasticsearch.Client
	COLLECTION *elasticsearch.Type
)

func main(){
	var err error

	ES, err = elasticsearch.New(&elasticsearch.Options{ URL: ELASTICSEARCH_URI})

	if err != nil {
		log.Fatal(err)
	}

	COLLECTION = ES.I(ELASTICSEARCH_INDEX).T(ELASTICSEARCH_TYPE)

	grpcServer := grpc.NewServer()

	pb.RegisterCommandServiceServer(grpcServer, &commandService{})
	wrappedServer := grpcweb.WrapServer(grpcServer)

	handler := func(res http.ResponseWriter, req *http.Request) {
		wrappedServer.ServeHttp(res, req)
	}

	httpServer := &http.Server{
		Addr:    fmt.Sprintf(":%v", GRPC_PORT),
		Handler: http.HandlerFunc(handler),
	}

	grpclog.Println("Starting server...")
	log.Fatalln(httpServer.ListenAndServe())
}

func generateDocument() ([]byte, error) {
	return json.Marshal(&struct{ Message string }{ Message: fake.Sentence() })
}

type commandService struct {}

func (c *commandService) Index(ctx context.Context, query *pb.Query)(*pb.IndexResponse, error){
	// allocate a slice of raw json documents which we will Index
	documents := make([][]byte, query.GetDesired())

	// size in bytes of the document
	size := int64(0)
	for i := 0; i < len(documents); i++ {
		rawDocument, err := generateDocument()

		if err != nil {
			log.Println(err)
			continue
		}

		size += int64(len(rawDocument))
		documents[i] = rawDocument
	}

	// attempt to index the documents using the elasticsearch Bulk API
	begin := time.Now()
	ids, err := COLLECTION.BulkInsert(documents)
	elapsed := time.Since(begin)

	if err != nil {
		log.Println(err)
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	log.Printf("Inserted (%v) in (%v) milliseconds \n", len(ids), elapsed.Seconds() / 1000)
	return &pb.IndexResponse{ IDs: ids, Duration: int64(elapsed), Size: size }, err
}

func (c *commandService) Search(ctx context.Context, query *pb.Query)(*pb.SearchResponse, error){
	querystring := fmt.Sprintf("*:*&size=%v", query.Desired)
	log.Println(querystring)
	rawDocuments, err := COLLECTION.Search(querystring)

	if err != nil {
		log.Println(err)
		return nil, status.Errorf(codes.Internal, err.Error())
	}

	log.Printf("Found: %v documents", len(rawDocuments))

	// types pb.Document and elasticsearch.Document are incompatible
	processedDocuments := make([]*pb.Document, len(rawDocuments))
	for i := 0; i < len(rawDocuments); i++ {
		processedDocuments[i] = &pb.Document{
			ID: rawDocuments[i].ID,
			Body: rawDocuments[i].Body,
		}
	}

	return &pb.SearchResponse{ Documents: processedDocuments}, nil
}

