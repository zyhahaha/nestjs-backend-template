import * as WebSocket from 'ws';
import { WebSocketAdapter, INestApplicationContext } from '@nestjs/common';
import { MessageMappingProperties } from '@nestjs/websockets';
import { Observable, fromEvent, EMPTY } from 'rxjs';
import { mergeMap, filter } from 'rxjs/operators';

export class WsAdapter implements WebSocketAdapter {

    constructor(private app: INestApplicationContext) { }

    create(port: number, options: any = {}): any {
        return new WebSocket.Server({ port, ...options });
    }

    bindClientConnect(server, callback: Function) {
        server.on('connection', callback);
    }

    bindMessageHandlers(
        client: WebSocket,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>,
    ) {
        fromEvent(client, 'message')
            .pipe(
                mergeMap(data => this.bindMessageHandler(client, data, handlers, process)),
                filter(result => result),
            )
            .subscribe(response => client.send(JSON.stringify(response)));
    }

    bindMessageHandler(
        client: WebSocket,
        buffer,
        handlers: MessageMappingProperties[],
        process: (data: any) => Observable<any>,
    ): Observable<any> {
        let message = null;
        try {
            const bufferData = buffer.data;
            try {
                message = JSON.parse(bufferData);
            } catch (error) {
                message = {
                    event: 'hello',
                    data: bufferData,
                }
            }
        } catch (error) {
            console.log('ws解析json出错', error);
            return EMPTY;
        }

        const messageHandler = handlers.find(
            handler => handler.message === message.event,
        );
        if (!messageHandler) {
            return EMPTY;
        }
        return process(messageHandler.callback(message.data));
    }

    close(server) {
        console.log('ws server close');
        server.close();
    }
}
