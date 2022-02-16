import { Injectable } from '@angular/core';
import { Matches, Users } from '../models';
import { BrowserStorage } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class StorageDataService {

  public isLoggedIn() {
    return this.session.exists("CurrentUser");
  }

  constructor() { 
   
  }

  getMatches() {
    return (this.local.get<Matches[]>("Matches") as Matches[] ?? []).map(match => Matches.build(match));
  }

  getUsers() {
    return (this.local.get<Users[]>("Users") as Users[] ?? []).map(user => Users.build(user));
  }

 

  local:BrowserStorage = new BrowserStorage(false) 
  session:BrowserStorage = new BrowserStorage(true) 

}



