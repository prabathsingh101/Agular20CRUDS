import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Postservice {
 baseUrl: any = 'https://localhost:7178/api/Post';

  http: any = inject(HttpClient);

  constructor() {}

  getPosts() {
    return this.http.get(this.baseUrl);
  }

  getPostById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  createPost(post: any) {
    return this.http.post(this.baseUrl, post);
  }

  updatePost(id: number, post: any) {
    return this.http.put(`${this.baseUrl}/${id}`, post);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
