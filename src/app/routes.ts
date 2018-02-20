import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberlistComponent } from './members/memberlist/memberlist.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guard/auth.guard';
import { MemberDetailComponent } from './members/MemberDetail/MemberDetail.component';
import { DetailResolver } from './_resolves/detail.resolver';

export const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [AuthGuard],
    children: [
      { path: 'members', component: MemberlistComponent },
      { path: 'members/:id', component: MemberDetailComponent, resolve:{user:DetailResolver} },
      { path: 'messages', component: MessagesComponent },
      { path: 'lists', component: ListsComponent }
    ]
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
