import { Component, OnInit } from '@angular/core';
import { Matches, MatchStatusType, Users } from '../models';
import { MatchStatusPipe } from '../pipes/match-status.pipe';
import { StorageDataService } from '../services/storage-data.service';


@Component({
  selector: 'app-partite',
  templateUrl: './partite.component.html',
  styleUrls: ['./partite.component.scss']
})

export class PartiteComponent implements OnInit {
  private storage = new StorageDataService();
  currentUser: Users | any; 
  userMatches: Matches[] ;

  constructor() { }

  statusCell(rowData: Matches) {
    let statusPipe = new MatchStatusPipe();
    return statusPipe.transform(rowData.status)
  }

  moveNumber(rowData: Matches){
    return rowData.moves.length;
  }


  ngOnInit(): void {
    let storage = new StorageDataService();
    this.currentUser = storage.session.get<Users>("CurrentUser");
    this.userMatches = this.storage.getMatches();
  }

}
