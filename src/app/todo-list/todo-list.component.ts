import { Component, Input, OnInit } from '@angular/core';
import { TodoItem } from '../todo-item';
import { TodoApiService } from '../todo-api.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {

  @Input() showCompleted: boolean;
  todoItems: TodoItem[];
  orderedBy = { field: 'id', ascending: true };
  isBusy: boolean;

  constructor(private apiService: TodoApiService) {
    this.isBusy = false;
  }

  ngOnInit() {
    this.getTodoItems();
  }

  getTodoItems() {
    this.isBusy = true;
    this.apiService.getTodoItems().subscribe(
      data => {
        // set the list from the server
        this.todoItems = data;
        this.isBusy = false;
      }
    );
  }

  toggleComplete(todoItem: TodoItem) {
    this.isBusy = true;
    todoItem.isComplete = !todoItem.isComplete;
    this.apiService.updateTodoItem(todoItem).subscribe(
      data => {
        this.isBusy = false;
      }
    );
  }

  deleteTodoItem(todoItem: TodoItem) {
    this.isBusy = true;
    this.apiService.deleteTodoItem(todoItem).subscribe(
      data => {
        // remove the item from our collection instead of going back to the server
        setTimeout(() => {
          this.todoItems = this.todoItems.filter(item => item !== todoItem);
          this.isBusy = false;
        }, 250); // if desired, make deletes take long enough to see spinner
      }
    );
  }

  createTodoItem(description: string) {
    this.isBusy = true;
    this.apiService.createTodoItem(description).subscribe(
      data => {
        // add the item to our collection instead of going back to the server
        this.todoItems = this.todoItems.concat(data);
        this.isBusy = false;
      }
    );
  }

  orderBy(field: string) {
    if (field === this.orderedBy.field) {
      this.orderedBy.ascending = !this.orderedBy.ascending;
    } else {
      this.orderedBy = { field: field, ascending: true };
    }
    this.todoItems = this.todoItems.slice(0); // causes UI to update
  }
}
