import { TestBed } from '@angular/core/testing';

import { ProjectmemberService } from './projectmember.service';

describe('ProjectmemberService', () => {
  let service: ProjectmemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectmemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
