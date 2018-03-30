import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TodoApiService } from './todo-api.service';

describe('TodoApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [TodoApiService]
    });
  });

  it('should be created', inject([TodoApiService], (service: TodoApiService) => {
    expect(service).toBeTruthy();
  }));
});
