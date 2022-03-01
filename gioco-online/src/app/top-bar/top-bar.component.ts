import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Users } from '../models';
import { StorageDataService } from '../services/storage-data.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToPartite() {
    this.router.navigate(['/partite']);
  }

  goToGiocatori() {
    this.router.navigate(['/giocatori']);
  }

  goToGiochi() {
    this.router.navigate(['/giochi']);
  }

  logOut(){
    let storage = new StorageDataService();
    storage.session.remove("CurrentUser");
    this.router.navigate(['/login']);
  }
}
