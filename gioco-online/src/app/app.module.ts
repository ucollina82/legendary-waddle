import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { GiochiComponent } from './giochi/giochi.component';
import { FormsModule } from '@angular/forms';
import { StorageDataService } from './services/storage-data.service';
import { BrowserStorageService } from './services/browser-storage.service';
import { PartitaComponent } from './partita/partita.component';
import { MatchStatusPipe } from './pipes/match-status.pipe';
import { PartiteComponent } from './partite/partite.component';
import { DxDataGridModule } from 'devextreme-angular';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopBarComponent,
    GiochiComponent,
    PartitaComponent,
    MatchStatusPipe,
    PartiteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    DxDataGridModule,
  ],
  providers: [
    StorageDataService,
    BrowserStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
