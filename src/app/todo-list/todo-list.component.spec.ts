import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
// import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TodoListComponent } from './todo-list.component';
import { OrderByPipe } from '../order-by.pipe';

import { TodoItem } from '../todo-item';
import { TodoApiService } from '../todo-api.service';
class MockTodoApiService {
  getTodoItems(): Observable<TodoItem[]> {
    return of([
      { id: 1, description: 'Z', isComplete: false },
      { id: 2, description: 'Y', isComplete: false },
      { id: 3, description: 'X', isComplete: false },
    ]);
  }
}

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      // imports: [RouterTestingModule],
      declarations: [TodoListComponent, OrderByPipe],
      providers: [{ provide: TodoApiService, useClass: MockTodoApiService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 3 items in the list', () => {
    expect(component.todoItems.length).toBe(3);
  });
});
