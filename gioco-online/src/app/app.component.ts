import { Component } from '@angular/core';
import { StorageDataService } from './services/storage-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'gioco-online';



  constructor(readonly storage: StorageDataService) {

  }

  ngOnInit(): void {
   
  }
  
}
