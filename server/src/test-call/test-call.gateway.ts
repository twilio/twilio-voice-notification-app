import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

/**
 * Simple Websockets gateway.
 * Test call updates are pushed to the UI in real time.
 * @see https://docs.nestjs.com/websockets/gateways
 */
@WebSocketGateway()
export class TestCallGateway {
  @WebSocketServer() server: any;
}
