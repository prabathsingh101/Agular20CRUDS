import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostlistPages } from './postlist-pages';

describe('PostlistPages', () => {
  let component: PostlistPages;
  let fixture: ComponentFixture<PostlistPages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostlistPages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostlistPages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
