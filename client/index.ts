import {grpc, BrowserHeaders} from "grpc-web-client";
import {CommandService} from "./_proto/commands_pb_service";
import {Query, IndexResponse} from "./_proto/commands_pb";

import { Component } from 'vue-typed'
import * as Vue from 'vue'

const template = require('./app.jade')();

@Component({
    template
})
class App extends Vue {
    host: string = 'http://beere.me/api';
    query: number = 0;
    queries: Array<IndexResponse.AsObject> = [];

    indexDocuments(){
        const request = new Query();
        request.setDesired(this.query);

        grpc.invoke(CommandService.Index, {
            host: this.host,
            request: request,

            onMessage:(res: IndexResponse) => {
                console.log(res);
                this.queries.push(res.toObject())
            },

            onEnd(code: grpc.Code, message: string, trailers: BrowserHeaders){
                console.log(code, message);
                console.log(trailers);
            }
        })
    }
}

new App().$mount('#app');