import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { UserResolver } from './user/user.resolver';
import { CardDetailsComponent } from './user/card-details/card-details.component';
import { ApiService } from './services/api.service';

const routes: Routes = [
    {
        path: 'user/:id',
        component: UserComponent,
        resolve: {
            user: UserResolver,
        }
    },
    {
        path: '**',
        redirectTo: 'user/1'
    }
];

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CardDetailsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    RouterModule.forRoot(
      routes, {
          enableTracing: false
      })
  ],
  providers: [ApiService, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
