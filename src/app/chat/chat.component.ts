import { Component, NgZone } from '@angular/core';
import { Message } from './models/message.model';
import { ChatService } from './services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent {
  title = 'ClientApp';
  txtMessage: string = '';
  messages = new Array<Message>();
  message = new Message();
  constructor(private chatService: ChatService, private _ngZone: NgZone) {
    this.subscribeToEvents();
  }

  /**
   * ارسال پیام به بک
   */
  sendMessage(): void {
    if (this.txtMessage) {
      this.message = new Message();
      this.message.type = 'sent';
      this.message.message = this.txtMessage;
      this.message.date = new Date();
      this.messages.push(this.message);
      this.chatService.sendMessage(this.message);
      this.txtMessage = '';
    }
  }
  private subscribeToEvents(): void {
    this.chatService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        message.type = 'received';
        this.messages.push(message);
      });
    });
  }

  changeTxtMessage(e: any) {
    this.txtMessage = e.target?.value;
  }
}
