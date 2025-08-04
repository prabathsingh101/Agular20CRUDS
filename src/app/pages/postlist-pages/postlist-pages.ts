import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Postservice } from '../services/postservice';
import { catchError, finalize, throwError } from 'rxjs';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Posts } from '../models/posts';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-postlist-pages',
  imports: [
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatInputModule
  ],
  templateUrl: './postlist-pages.html',
  styleUrl: './postlist-pages.scss',
})
export class PostlistPages implements OnInit {
  displayedColumns: string[] = ['postId', 'title', 'category', 'tags','action'];
  dataSource: any;

  postsList: Posts[] = [];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  searchText: string = '';

  loading = false;

  svc = inject(Postservice);

  filterchange(data: Event) {
    const value = (data.target as HTMLInputElement).value;
    this.dataSource.filter = value;
  }
  ngOnInit(): void {
    this.getAll();
  }
  getAll() {
    this.loading = true;
    this.svc
      .getPosts()
      .pipe(
        catchError((err) => {
          console.log('Error loading users', err);
          alert('Error loading users.');
          return throwError(err);
        }),
        finalize(() => (this.loading = false))
      )
      .subscribe((res: any) => {
        this.postsList = res;
        // console.log('Posts List:', this.postsList);
        if (this.postsList.length > 0) {
          this.dataSource = new MatTableDataSource<Posts>(this.postsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.dataSource = new MatTableDataSource<Posts>(this.postsList);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      });
  }
  edit(id: number) {
    // this.svc.updatePost(id,).subscribe({
    //   next: (res: any) => {
    //     console.log('Edit Post:', res);
    //     this.router.navigate(['/post'], { queryParams: { id: id } });
    //   },
    //   error: (err:any) => {
    //     console.error('Error editing post:', err);
    //   }
    // });
  }

  delete(id: number) {
    this.svc.deletePost(id).subscribe({
      next: (res: any) => {
        console.log('Post deleted successfully:', res);
        this.getAll(); // Refresh the list after deletion
      },
      error: (err:any) => {
        console.error('Error deleting post:', err);
        alert('Error deleting post.');
      }
    });
  }
}
