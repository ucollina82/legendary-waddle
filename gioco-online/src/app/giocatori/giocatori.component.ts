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
  userList: Users[] | any = [];
  userMatches: Matches[] ;
  

  constructor() { }

  ngOnInit(): void {
    this.userList = this.storage.getUsers();
    this.userMatches = this.storage.getMatches();
    
    
  }

  userPoints() {
    
  }


}
