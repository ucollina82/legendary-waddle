import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../models';
import { StorageDataService } from '../services/storage-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  modelusername = "";
  modelpassword = "";
  errmsg: string;
  private storage = new StorageDataService();

  sendLogin(form: NgForm) {

    if (!this.storage.local.exists("Users")) {
      this.storage.local.set<Users[]>("Users", []);
    }
    let userList = this.storage.local.get<Users[]>("Users") as Users[]; //recupero lista di utenti memorizzati nel Local Storage e l'assegno a questa variabile

    if (this.checkIfUserExist(userList)) {
      this.addNewUser(userList);
    }

    this.storage.session.set<Users>("CurrentUser", new Users(0,this.modelusername, this.modelpassword));
    this.router.navigate(['/giochi']);

  }

  private checkIfUserExist(userList: Users[]): boolean {

    return !userList.some((element) => element.name == this.modelusername && element.surname == this.modelpassword);
  }

  private addNewUser(userList: Users[]) {
    let userId = Math.max(0,Math.max(...userList.map(user => user.id)))
    let newUserList = userList.concat([new Users(userId + 1,this.modelusername, this.modelpassword)]);
    this.storage.local.set<Users[]>("Users", newUserList);
  }


  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}

