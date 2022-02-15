import { Injectable } from '@angular/core';
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

  local:BrowserStorage = new BrowserStorage(false) 
  session:BrowserStorage = new BrowserStorage(true) 

}



