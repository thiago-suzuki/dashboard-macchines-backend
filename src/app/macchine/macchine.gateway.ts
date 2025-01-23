import {
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
  
@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class MachinesGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
  
    private clients: Map<string, Socket> = new Map();
  
    afterInit(server: Server) {
      console.log('WebSocket Gateway iniciado.');
    }
  
    handleConnection(client: Socket) {
      console.log(`Cliente conectado: ${client.id}`);
      this.clients.set(client.id, client);
    }
  
    handleDisconnect(client: Socket) {
      console.log(`Cliente desconectado: ${client.id}`);
      this.clients.delete(client.id);
    }
  
    @SubscribeMessage('updateMacchine')
    handleUpdateMacchine(client: Socket, payload: any): void {
      console.log(`Status recebido de ${client.id}:`, payload);
  
      // Broadcast para todos os clientes
      this.server.emit('macchineUpdated', payload);
    }
  
    // Método para emitir atualizações manualmente
    emitStatusUpdate(data: any) {
      this.server.emit('macchineUpdated', data);
    }

    @SubscribeMessage('createMacchine')
    handleCreateMacchine(client: Socket, payload: any): void {
      console.log(`Status recebido de ${client.id}:`, payload);
  
      // Broadcast para todos os clientes
      this.server.emit('macchineCreated', payload);
    }
  
    // Método para emitir atualizações manualmente
    emitStatusCreate(data: any) {
      this.server.emit('macchineCreated', data);
    }
}