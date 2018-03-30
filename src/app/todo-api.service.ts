import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';

import { TodoItem } from './todo-item';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoApiService {

  apiTodo: string;

  constructor(private http: HttpClient) {
    this.apiTodo = environment.apiTodo;
  }

  getTodoItems(): Observable<TodoItem[]> {
    const url = `${this.apiTodo}`;
    return this.http.get<TodoItem[]>(url);
  }

  updateTodoItem(todoItem: TodoItem): Observable<any> {
    const url = `${this.apiTodo}/${todoItem.id}`;
    return this.http.put(url, todoItem, httpOptions);
  }

  createTodoItem(description: string): Observable<any> {
    const todoItem = { description: description };
    const url = `${this.apiTodo}`;
    return this.http.post(url, todoItem);
  }

  deleteTodoItem(todoItem: TodoItem) {
    const url = `${this.apiTodo}/${todoItem.id}`;
    return this.http.delete(url);
  }
}
