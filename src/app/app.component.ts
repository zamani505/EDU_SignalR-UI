import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SignalR';
  private hubConnectionBuilder!: HubConnection;
  message:any[]=[];

  constructor(){}
  ngOnInit(){
    
    // this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://localhost:5170/message').configureLogging(LogLevel.Information).build();
    // this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
    // this.hubConnectionBuilder.on('SendMessageToUser', (result: any) => {
    //  debugger;
    //     this.message=result;
    // });
    this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://localhost:5170/Chat').configureLogging(LogLevel.Information).build();
    this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
    this.hubConnectionBuilder.on('ReceiveMessage', (result: any) => {
      debugger;
         this.message=result;
     });
  }
}
