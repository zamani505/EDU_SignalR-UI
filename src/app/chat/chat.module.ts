import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ChatComponent } from './chat.component';
import { ChatService } from './services/chat.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChatComponent],
  providers:[ChatService,DatePipe],
})
export class ChatModule { }
