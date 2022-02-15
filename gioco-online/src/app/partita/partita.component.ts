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

  user: Users | any; 
  private storage = new StorageDataService();
  userMatches: Matches[];
  matchId: number;
  match: Matches;
  bottom = document.getElementById('effettuaMossa')
  enableMove: boolean;

  constructor(private router: ActivatedRoute) { }

  ngOnInit(): void {
    let storage = new StorageDataService();
    this.user = storage.session.get<Users>("CurrentUser");
    this.matchId = +this.router.snapshot.params['id']; //DA CHIEDERE: Perchè invece di Router si mette ActivatedRoute? Che differenza c'è tra di loro?
    this.userMatches = this.storage.local.get<Matches[]>("Matches") as Matches[];
    this.match = this.userMatches.find((element) => element.id == this.matchId) as Matches;
  }

  move() {
    //Aggiungi mossa in MoveLists();
    let move = new Move(this.user);
    this.match.addMove(move);
    this.storage.local.set<Matches[]>("Matches",this.userMatches);
  }

  update(){
    this.userMatches = this.storage.local.get<Matches[]>("Matches") as Matches[];
    this.match = this.userMatches.find((element) => element.id == this.matchId) as Matches;
    if (this.match.currentPlayer == this.user) {
      this.enableMove = true;
    }
  }


  


}
