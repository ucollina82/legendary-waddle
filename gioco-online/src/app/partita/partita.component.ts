import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matches, MatchStatusType, Move, Users } from '../models';
import { StorageDataService } from '../services/storage-data.service';

@Component({
  selector: 'app-partita',
  templateUrl: './partita.component.html',
  styleUrls: ['./partita.component.scss']
})
export class PartitaComponent implements OnInit {

  currentUser: Users | any; 
  private storage = new StorageDataService();
  userMatches: Matches[];
  matchId: number;
  match: Matches;
  bottom = document.getElementById('effettuaMossa')
  enableMove = false;
  userList: Users[] ;
  moveList: Move[];
  matchStatus = MatchStatusType;
  playgroundMove: any;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
   
    
    let storage = new StorageDataService();
    this.currentUser = storage.session.get<Users>("CurrentUser");
    this.matchId = +this.router.snapshot.params['id']; //TO ASK: Perchè invece di Router si mette ActivatedRoute? Che differenza c'è tra di loro?
    this.userMatches = this.storage.getMatches();
    this.match = this.getMatch();
    this.userList = this.storage.getUsers();
    this.moveList = this.match.moves;
  }

  ngAfterViewInit() {
    this.update();
  }

  moveDate(rowData: Move) {
    let moveDate = new DatePipe('en-US');
    return moveDate.transform(rowData.date, 'dd/MM/yyyy hh:mm:ss');
  }

  move() {
    let move = new Move(this.currentUser,'pg1'); 
    this.match.addMove(move);
    this.storage.local.set<Matches[]>("Matches",this.userMatches); 
    // se la partita è completata > recuperarsi le informazioni aggiornate dei giocatori
    if(this.match.status == MatchStatusType.end) {
      // aggiornare punteggi dei giocatori di questo match. per aggiornare il punteggio incrementiamo il punteggio attuale del giocatore con il punteggio accumulato nella partita dal giocatore
      let maker = this.userList.find((element) => element.name == this.match.maker.name && element.surname == this.match.maker.surname) as Users;
      let player = this.userList.find((element) => element.name == this.match.player.name && element.surname == this.match.player.surname) as Users;
      maker.points += this.match.maker.points; // operatore d'incremento
      player.points += this.match.player.points; 
      this.storage.local.set<Users[]>("Users",this.userList); 
    }
 /*    this.playgroundMove = document.querySelector('.pg1');
    this.playgroundMove.className += ' selected';
    this.setPlayground(); */
    this.update();
  }

  update(){
   
    this.match = this.getMatch();
    this.moveList = this.match.moves;
    this.enableMove = this.match.currentPlayer.name == this.currentUser.name && this.match.currentPlayer.surname == this.currentUser.surname ? true : false
    this.getPlayground();
  }

  getMatch() {
    this.userMatches = this.storage.getMatches();
    return this.userMatches.find((element) => element.id == this.matchId) as Matches;
  }


  getPlayground() {
    if (this.match.moves.length > 0) { 
      let str = this.match.moves[0].type
      this.playgroundMove = document.querySelector("." + str);
      this.playgroundMove.className += ' selected';
    }
     
   
  }
  

  


}
