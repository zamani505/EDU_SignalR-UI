import { Component, OnInit } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SignalR';
  private hubConnectionBuilder!: HubConnection;
  message: any[] = [];
  myMessage = '';
  myUser='';
  alertText:string="";
  constructor() {}
  ngOnInit() {

    //دو نوع مثال ارتباط با SignalR

    //==================================================
    // this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://localhost:5170/message').configureLogging(LogLevel.Information).build();//ایجاد ارتباط با هاب براساس نامی که در بک اند داده شده است مانند(message)
    // this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));//شروع گوش دادن به کانال
    // this.hubConnectionBuilder.on('SendMessageToUser', (result: any) => {//SendMessageToUser نام متدی که پیام را در بک اند ارسال کرده است
    //     this.message=result;
    // });
    //=======================================================
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('http://localhost:5170/Chat')
      .configureLogging(LogLevel.Information)
      .build(); //ایجاد ارتباط با هاب براساس نامی که در بک اند داده شده است مانند(Chat)
    this.hubConnectionBuilder
      .start()
      .then(() => {
        console.log('Connection started.......!');
       
      })
      .catch((err) => console.log('Error while connect with server')); //شروع گوش دادن به کانال

    this.hubConnectionBuilder.on('SendAsync', (user: any, message: any) => {
      //SendAsync نام متدی که پیام را در بک اند ارسال کرده است
      this.message.push(user + ' said ' + message);
    });
  
  }
   sendMessage(){
   
    this.hubConnectionBuilder
    .invoke('ReceiveAsync', this.myUser, this.myMessage)
    .then(() => {this.alertText="Your message is sent!";})
    .catch((err) => {
      alert(err);
    });
  }
}
