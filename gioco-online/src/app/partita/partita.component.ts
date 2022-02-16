import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Matches, Move, Users } from '../models';
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

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    let storage = new StorageDataService();
    this.currentUser = storage.session.get<Users>("CurrentUser");
    this.matchId = +this.router.snapshot.params['id']; //TO ASK: Perchè invece di Router si mette ActivatedRoute? Che differenza c'è tra di loro?
    this.userMatches = this.storage.getMatches();
    this.match = this.getMatch();
   
  }

  move() {
    let move = new Move(this.currentUser); 
    this.match.addMove(move);
    this.storage.local.set<Matches[]>("Matches",this.userMatches); 
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
