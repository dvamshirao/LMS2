import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { AdmindashboardComponent } from './admin/admindashboard/admindashboard.component';
import { UserdashboardComponent } from './user/userdashboard/userdashboard.component';
import { NotifydelaysComponent } from './admin/admindashboard/notifydelays/notifydelays.component';
import { IssueComponent } from './admin/admindashboard/issue/issue.component';
import { ReturnComponent } from './admin/admindashboard/return/return.component';
import { ProjectlistComponent } from './admin/admindashboard/projectlist/projectlist.component';
import { AddprojectsComponent } from './admin/admindashboard/addprojects/addprojects.component';
import { AddbooksComponent } from './admin/admindashboard/addbooks/addbooks.component';
import { BookslistComponent } from './admin/admindashboard/bookslist/bookslist.component';
import { AdduserComponent } from './admin/admindashboard/adduser/adduser.component';
import { ViewusersComponent } from './admin/admindashboard/viewusers/viewusers.component';
import { ChangepasswordComponent } from './admin/admindashboard/changepassword/changepassword.component';
import { UserupdatedetailsComponent } from './user/userdashboard/userupdatedetails/userupdatedetails.component';
import { UserchangepasswordComponent } from './user/userdashboard/userchangepassword/userchangepassword.component';
import { ViewissuedbooksComponent } from './user/userdashboard/viewissuedbooks/viewissuedbooks.component';
import { SubmitbookrequestComponent } from './user/userdashboard/submitbookrequest/submitbookrequest.component';
import { RouteGuard } from './route.guard';
import { ManagebooksComponent } from './admin/admindashboard/managebooks/managebooks.component';
import { ManageusersComponent } from './admin/admindashboard/manageusers/manageusers.component';
import { IssuedetailsComponent } from './admin/admindashboard/issuedetails/issuedetails.component';
import { AdmindashComponent } from './admin/admindashboard/admindash/admindash.component';
import { UserdashComponent } from './user/userdashboard/userdash/userdash.component';
import { ViewbooksComponent } from './user/userdashboard/viewbooks/viewbooks.component';
import { DisplaybookrequestsComponent } from './admin/admindashboard/displaybookrequests/displaybookrequests.component';
import { AppComponent } from './app.component';




const routes: Routes = [
  {path:'', redirectTo: 'vnrlms', pathMatch: 'full'},
  {path:'vnrlms',component:AppComponent},
  {path:'admindashboard',component:AdmindashboardComponent,children:[
    {path:'', redirectTo: '/admindashboard/dashboard', pathMatch: 'full'},
    {path:'dashboard',component:AdmindashComponent},
    {path:'notifydelays',component:NotifydelaysComponent},
    {path:'circulation/issue',component:IssueComponent},
    {path:'circulation/return',component:ReturnComponent},
    {path:'circulation/issuedetails',component:IssuedetailsComponent},
    {path:'projects/projectslist',component:ProjectlistComponent},
    {path:'projects/addproject',component:AddprojectsComponent},
    {path:'books/bookslist',component:BookslistComponent},
    {path:'books/addbooks',component:AddbooksComponent},
    {path:'books/managebooks',component:ManagebooksComponent},
    {path:'users/adduser',component:AdduserComponent},
    {path:'users/viewusers',component:ViewusersComponent},
    {path:'users/manageusers',component:ManageusersComponent},
    {path:'profile/changepassword',component:ChangepasswordComponent},
    {path:'displaybookrequests',component:DisplaybookrequestsComponent}
  ]},
  {path:'userdashboard/:username',component:UserdashboardComponent,children:[
    {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
    {path:'dashboard',component:UserdashComponent},
    {path:'profile/changepassword',component:UserchangepasswordComponent},
    {path:'profile/updatedetails',component:UserupdatedetailsComponent},
    {path:'viewissuedbooks',component:ViewissuedbooksComponent},
    {path:'viewbooks',component:ViewbooksComponent},
    {path:'submitbookrequest',component:SubmitbookrequestComponent}
  ]},
  //special route for any other route than mentioned
  //always should be at last 
  {path:'**',component:PagenotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
