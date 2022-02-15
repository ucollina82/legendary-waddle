import { Component, OnInit } from '@angular/core';
import { Matches, MatchStatusType, Move, Users } from '../models';
import { Router } from '@angular/router';
import { StorageDataService } from '../services/storage-data.service';

@Component({
  selector: 'app-giochi',
  templateUrl: './giochi.component.html',
  styleUrls: ['./giochi.component.scss']
})
export class GiochiComponent implements OnInit {

  user: Users | any;
  userList: Users[] | any = [];
  userMatches: Matches[] ;
  private storage = new StorageDataService();
  moveList: Move[];

  matchStatus = MatchStatusType;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let storage = new StorageDataService();
    this.user = storage.session.get<Users>("CurrentUser");
    this.userList = storage.local.get<Users[]>("Users");
    this.userMatches =
    (storage.local.get<Matches[]>("Matches")?.filter((element) => element.status !== this.matchStatus.end) as Matches[] ?? []).map(match => Matches.build(match));
  }

  createMatch() {
    let matchId = Math.max(0,Math.max(...this.userMatches.map(match => match.id))) //recupera l'ultimo id
    this.userMatches.push(new Matches(matchId + 1,this.user,new Date(),MatchStatusType.onHold)); //aggiungi la nuova partita alla lista
    this.storage.local.set<Matches[]>("Matches",this.userMatches); // salva lista
  }

  joinMatch(match: Matches) {
    match.status = MatchStatusType.onGoing;
    match.player = this.user;
    this.storage.local.set<Matches[]>("Matches",this.userMatches);
    this.router.navigate(['/partita', match.id]);
  }

  seeMatch(match: Matches) {
    this.router.navigate(['/partita', match.id]);
  }

  seeMoveList(match: Matches ) {
    this.moveList = match.moves;
  }


}
