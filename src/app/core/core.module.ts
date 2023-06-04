import { NgModule } from '@angular/core';
import { environment } from './../../environments/environment';
import { TimestampToStrDatePipe } from './../core/utils/timestamp-to-str-date.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailsComponent } from './components/details/details.component';
import { ListComponent } from './components/list/list.component';
import { TableComponent } from './components/table/table.component';

import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@NgModule({
  declarations: [
    TimestampToStrDatePipe,
    ListComponent,
    TableComponent,
    DetailsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
    CommonModule,
    FormsModule,
    NgxPaginationModule,
    AngularFireStorageModule,
  ],
  providers: [
  ],
  exports: [
    ListComponent,
    TableComponent,
    DetailsComponent,
    TimestampToStrDatePipe,
    FormsModule,
    NgxPaginationModule,
  ]
})
export class CoreModule { }
