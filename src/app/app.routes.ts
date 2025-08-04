import { Routes } from '@angular/router';
import { HomePages } from './pages/home-pages/home-pages';
import { UserPages } from './pages/user-pages/user-pages';
import { SettingsPages } from './pages/settings-pages/settings-pages';
import { PostPages } from './pages/post-pages/post-pages';
import { PostlistPages } from './pages/postlist-pages/postlist-pages';

export const routes: Routes = [
   {
    path: 'home',
    component: HomePages,
  },
  {
    path: 'users',
    component: UserPages,
  },
  {
    path: 'settings',
    component: SettingsPages,
  },
  {
    path: 'post',
    component: PostPages,
  },
  {
    path: 'post-list',
    component: PostlistPages,
  },
];
