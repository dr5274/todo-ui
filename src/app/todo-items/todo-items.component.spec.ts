import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { TodoItemsComponent } from '../todo-items/todo-items.component';

import { CookieService } from 'ngx-cookie-service';
class MockCookieService {
  get(name: string): any {
    return 'true';
  }
  set() {
  }
}

describe('TodoItemsComponent', () => {
  let component: TodoItemsComponent;
  let fixture: ComponentFixture<TodoItemsComponent>;
  let txtNewTodo: HTMLInputElement;
  let btnNewTodo: HTMLButtonElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule],
      declarations: [TodoItemsComponent],
      providers: [{ provide: CookieService, useClass: MockCookieService },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoItemsComponent);
    component = fixture.componentInstance;
    txtNewTodo = fixture.debugElement.query(By.css('#txtNewTodo')).nativeElement;
    btnNewTodo = fixture.debugElement.query(By.css('#btnNewTodo')).nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set ShowCompleted from a cookie', () => {
    expect(component.showCompleted).toBeTruthy();
  });

  it('should disable AddNew when textbox empty', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      txtNewTodo.value = '';
      txtNewTodo.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btnNewTodo.disabled).toBe(true);
    });
  });

  it('should enable AddNew when textbox not empty', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      txtNewTodo.value = 'new todo';
      txtNewTodo.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(btnNewTodo.disabled).toBe(false);
    });
  });
});
