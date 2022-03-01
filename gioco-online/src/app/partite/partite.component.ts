import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {
    this.goToMatch = this.goToMatch.bind(this); 
   }

  statusCell(rowData: Matches) {
    let statusPipe = new MatchStatusPipe();
    return statusPipe.transform(rowData.status)
  }

  winnerDescription(rowData: Matches) {
    if (rowData.winner != undefined)
    { return rowData.winner.name + ' ' + rowData.winner.surname }
    return ""
  }

  moveNumber(rowData: Matches){
    return rowData.moves.length;
  }

  ngOnInit(): void {
    let storage = new StorageDataService();
    this.currentUser = storage.session.get<Users>("CurrentUser");
    this.userMatches = this.storage.getMatches();
  }

  goToMatch(e:any) {
    this.router.navigate(['/partita', e.row.data.id ]);
  }

  matchDate(rowData: Matches) {
    let moveDate = new DatePipe('en-US');
    return moveDate.transform(rowData.date, 'dd/MM/yyyy hh:mm:ss');
  }

}
