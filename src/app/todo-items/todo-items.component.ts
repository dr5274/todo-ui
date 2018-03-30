import { Component, OnInit, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { TodoItem } from '../todo-item';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit, AfterViewInit {

  @ViewChild(TodoListComponent) todoList: TodoListComponent;
  showCompleted: boolean;
  newTodo: string;

  isBusy(): boolean { return false; }

  constructor(private cookieService: CookieService) {
    this.newTodo = '';
  }

  ngOnInit() {
    // read from cookie
    this.showCompleted = this.cookieService.get('showCompleted') === 'true';
  }
  ngAfterViewInit() {
    // repurpose the isBusy getter to read from the child component
    setTimeout(() => this.isBusy = () => this.todoList.isBusy, 0);
  }

  toggleShowCompleted() {
    // toggle the setting and save to cookie
    this.showCompleted = !this.showCompleted;
    this.cookieService.set('showCompleted', this.showCompleted.toString(), 365);
  }

  createTodoItem() {
    // only create if non-empty
    if (this.newTodo !== '') {
      this.todoList.createTodoItem(this.newTodo);
      this.newTodo = '';
    }
  }
}
