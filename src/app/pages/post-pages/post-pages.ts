import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Posts } from '../models/posts';
import { Postservice } from '../services/postservice';

@Component({
  selector: 'app-post-pages',
  imports: [ MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    RouterLink,
  ]
    ,
  templateUrl: './post-pages.html',
  styleUrl: './post-pages.scss'
})
export class PostPages implements OnInit {
  constructor() {}
 postForm!: FormGroup;

  posts: Posts[] = [];

  createPost!: Posts;

  loader: boolean = false;

  isSaving: boolean = false;

  authorSubscription!: Subscription;

  fb = inject(FormBuilder);

  postsService = inject(Postservice);

  router = inject(Router);

  ngOnInit(): void {
        this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(10)]],
      content: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', [Validators.required]],
      tag: [''],
    });
  }
  get getTitle() {
    return this.postForm.controls['title'];
  }
  get getContent() {
    return this.postForm.controls['content'];
  }
  get getCategory() {
    return this.postForm.controls['category'];
  }
  async onSubmit() {
    if (this.postForm.valid) {
      this.loader = true;
      console.log('Form Submitted!', this.postForm.value);
      this.createPost = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        category: this.postForm.value.category,
        tags: this.postForm.value.tag,
      };
      this.authorSubscription = await this.postsService
        .createPost(this.createPost)
        .subscribe({
          next: (res: any) => {
            this.posts.push(res);
            this.postForm.reset();
            this.loader = false;
            this.router.navigate(['/post-list']);
            //console.log('Post created successfully:', res);
          },
          error: (err: any) => {
            this.loader = false;
            //console.error('Error creating post:', err);
            if (err.status === 400) {
              console.error('Bad Request:', err.error);
            } else if (err.status === 500) {
              console.error('Server Error:', err.error);
            } else {
              console.error('Unexpected Error:', err);
            }
          },
          complete: () => {
            console.log('Author addition completed.');
            this.authorSubscription.unsubscribe();
            this.postForm.reset();
            this.loader = false;
          },
        });
    }
  }
}
