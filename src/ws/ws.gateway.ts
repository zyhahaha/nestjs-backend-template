import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import * as WebSocket from 'ws';

@WebSocketGateway(3001)
export class WsStartGateway {

    @SubscribeMessage('hello')
    hello(@MessageBody() data: any): any {
        return {
            "event": "hello",
            "data": data,
            "msg": 'rustfisher.com'
        };
    }

    @SubscribeMessage('hello2')
    hello2(@MessageBody() data: any, @ConnectedSocket() client: WebSocket): any {
        client.send(JSON.stringify({ event: 'tmp', data: '这里是个临时信息' }));
        return { event: 'hello2', data: data };
    }
}
