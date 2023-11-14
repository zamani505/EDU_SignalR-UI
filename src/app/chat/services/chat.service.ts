import { EventEmitter, Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Message } from '../models/message.model';

@Injectable()
export class ChatService {
  messageReceived = new EventEmitter<Message>();
  connectionEstablished = new EventEmitter<Boolean>();

  private connectionIsEstablished = false;
  private _hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.startConnection();
  }

  /**
   * ارسال پیام به بک
   * @param message پیام ورودی
   */
  sendMessage(message: Message) {
    this._hubConnection.invoke('ReceiveAsync', message);
  }

  /**
   * ایجاد ارتباط با بک
   */
  private createConnection() {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl('http://localhost:5170/Chat')
      .configureLogging(LogLevel.Information)
      .build();
  }

  /**
   * شروع گوش دادن به کانال
   */
  private startConnection(): void {
    this._hubConnection
      .start()
      .then(() => {
        this.registerOnServerEvents();
        console.log('Connection started.......!');
      })
      .catch((err) => console.log('Error while connect with server'));
  }

  /**
   * دریافت پیام جدید از بک
   */
  private registerOnServerEvents(): void {
    this._hubConnection.on('SendAsync', (data:Message) => {
      this.messageReceived.emit(data);
    });
  }
}
