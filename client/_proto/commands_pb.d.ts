// package: commands
// file: commands.proto

import * as jspb from "google-protobuf";

export class Query extends jspb.Message {
  getDesired(): number;
  setDesired(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Query.AsObject;
  static toObject(includeInstance: boolean, msg: Query): Query.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Query, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Query;
  static deserializeBinaryFromReader(message: Query, reader: jspb.BinaryReader): Query;
}

export namespace Query {
  export type AsObject = {
    desired: number,
  }
}

export class RawDocument extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RawDocument.AsObject;
  static toObject(includeInstance: boolean, msg: RawDocument): RawDocument.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RawDocument, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RawDocument;
  static deserializeBinaryFromReader(message: RawDocument, reader: jspb.BinaryReader): RawDocument;
}

export namespace RawDocument {
  export type AsObject = {
    message: string,
  }
}

export class Document extends jspb.Message {
  getID(): string;
  setID(value: string): void;

  getBody(): Uint8Array | string;
  getBody_asU8(): Uint8Array;
  getBody_asB64(): string;
  setBody(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Document.AsObject;
  static toObject(includeInstance: boolean, msg: Document): Document.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Document, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Document;
  static deserializeBinaryFromReader(message: Document, reader: jspb.BinaryReader): Document;
}

export namespace Document {
  export type AsObject = {
    ID: string,
    Body: Uint8Array | string,
  }
}

export class IndexResponse extends jspb.Message {
  clearIDsList(): void;
  getIDsList(): Array<string>;
  setIDsList(value: Array<string>): void;
  addIDs(value: string, index?: number): void;

  getDuration(): number;
  setDuration(value: number): void;

  getSize(): number;
  setSize(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IndexResponse.AsObject;
  static toObject(includeInstance: boolean, msg: IndexResponse): IndexResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: IndexResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IndexResponse;
  static deserializeBinaryFromReader(message: IndexResponse, reader: jspb.BinaryReader): IndexResponse;
}

export namespace IndexResponse {
  export type AsObject = {
    IDsList: Array<string>,
    Duration: number,
    Size: number,
  }
}

export class SearchResponse extends jspb.Message {
  clearDocumentsList(): void;
  getDocumentsList(): Array<Document>;
  setDocumentsList(value: Array<Document>): void;
  addDocuments(value?: Document, index?: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchResponse): SearchResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SearchResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchResponse;
  static deserializeBinaryFromReader(message: SearchResponse, reader: jspb.BinaryReader): SearchResponse;
}

export namespace SearchResponse {
  export type AsObject = {
    documentsList: Array<Document.AsObject>,
  }
}

