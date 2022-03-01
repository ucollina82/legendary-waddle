import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Matches, Users } from '../models';
import { StorageDataService } from '../services/storage-data.service';

@Component({
  selector: 'app-giocatori',
  templateUrl: './giocatori.component.html',
  styleUrls: ['./giocatori.component.scss']
})
export class GiocatoriComponent implements OnInit {
  private storage = new StorageDataService();
  userList: Users[] ;
  userMatches: Matches[] ;
  

  constructor() { }

  ngOnInit(): void {
    this.userList = this.storage.getUsers();
    this.userMatches = this.storage.getMatches();
  }

  userPoints() {
    
  }

  playerDate(rowData: Matches) {
    let moveDate = new DatePipe('en-US');
    return moveDate.transform(rowData.date, 'dd/MM/yyyy hh:mm:ss');
  }


}
