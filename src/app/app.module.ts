import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TodoItemsComponent } from './todo-items/todo-items.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoApiService } from './todo-api.service';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { OrderByPipe } from './todo-list/order-by.pipe';

const appRoutes: Routes = [
  { path: '', redirectTo: '/todos', pathMatch: 'full' },
  { path: 'todos', component: TodoItemsComponent },
  // { path: 'todo/:id', component: TaskDetailComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TodoItemsComponent,
    TodoListComponent,
    LoadingSpinnerComponent,
    OrderByPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
  ],
  providers: [TodoApiService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
