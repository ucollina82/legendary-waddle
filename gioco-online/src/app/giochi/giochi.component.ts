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

  currentUser: Users | any;
  userList: Users[] ;
  userMatches: Matches[] ;
  private storage = new StorageDataService();
  moveList: Move[];

  matchStatus = MatchStatusType;

  constructor(private router: Router) { }

  ngOnInit(): void {
    let storage = new StorageDataService();
    this.currentUser = Users.build(storage.session.get<Users>("CurrentUser") as Users);
    this.userList = (storage.local.get<Users[]>("Users") as Users[]).map(user => Users.build(user));
    this.userMatches =
    (storage.local.get<Matches[]>("Matches")?.filter((element) => element.status !== this.matchStatus.end) as Matches[] ?? []).map(match => Matches.build(match));
  }

  createMatch() {
    let matchId = Math.max(0,Math.max(...this.userMatches.map(match => match.id))) //recupera l'ultimo id
    let userListCurrentUser = this.userList.find((element) => element.name == this.currentUser.name && element.surname == this.currentUser.surname) as Users;
    userListCurrentUser.addUserMatch(userListCurrentUser);
    this.userMatches.push(new Matches(matchId + 1,userListCurrentUser,new Date(),MatchStatusType.onHold)); //aggiungi la nuova partita alla lista
    this.storage.local.set<Matches[]>("Matches",this.userMatches); // salva lista
    this.storage.local.set<Users[]>("Users",this.userList);
  }

  joinMatch(match: Matches) {
    match.status = MatchStatusType.onGoing;
    let userListCurrentUser = this.userList.find((element) => element.name == this.currentUser.name && element.surname == this.currentUser.surname) as Users;
    userListCurrentUser.addUserMatch(userListCurrentUser);
    match.player = userListCurrentUser;
    this.storage.local.set<Matches[]>("Matches",this.userMatches);
    this.storage.local.set<Users[]>("Users",this.userList);
    this.router.navigate(['/partita', match.id]);
  }

  seeMatch(match: Matches) {
    this.router.navigate(['/partita', match.id]);
  }

  seeMoveList(match: Matches ) {
    this.moveList = match.moves;
  }


}
