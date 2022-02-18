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

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
   
    
    let storage = new StorageDataService();
    this.currentUser = storage.session.get<Users>("CurrentUser");
    this.matchId = +this.router.snapshot.params['id']; //TO ASK: Perchè invece di Router si mette ActivatedRoute? Che differenza c'è tra di loro?
    this.userMatches = this.storage.getMatches();
    this.match = this.getMatch();
    this.userList = this.storage.getUsers();
   
  }

  move() {
    let move = new Move(this.currentUser); 
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
    this.update();
  }

  update(){
    this.match = this.getMatch();
    this.enableMove = this.match.currentPlayer.name == this.currentUser.name && this.match.currentPlayer.surname == this.currentUser.surname ? true : false
  }

  getMatch() {
    this.userMatches = this.storage.getMatches();
    return this.userMatches.find((element) => element.id == this.matchId) as Matches;
  }
  

  


}
