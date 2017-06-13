// package: commands
// file: commands.proto

import * as commands_pb from "./commands_pb";
export class CommandService {
  static serviceName = "commands.CommandService";
}
export namespace CommandService {
  export class Index {
    static methodName = "Index";
    static service = CommandService;
    static requestStream = false;
    static responseStream = false;
    static requestType = commands_pb.Query;
    static responseType = commands_pb.IndexResponse;
  }
  export class Search {
    static methodName = "Search";
    static service = CommandService;
    static requestStream = false;
    static responseStream = false;
    static requestType = commands_pb.Query;
    static responseType = commands_pb.SearchResponse;
  }
}
