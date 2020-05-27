import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UserupdatedetailsComponent } from './userdashboard/userupdatedetails/userupdatedetails.component';
import { UserchangepasswordComponent } from './userdashboard/userchangepassword/userchangepassword.component';
import { SubmitbookrequestComponent } from './userdashboard/submitbookrequest/submitbookrequest.component';
import { ViewissuedbooksComponent } from './userdashboard/viewissuedbooks/viewissuedbooks.component';
import { UserdashComponent } from './userdashboard/userdash/userdash.component';
import { ViewbooksComponent } from './userdashboard/viewbooks/viewbooks.component';



const routes: Routes = [
  {path:"userdashboard/:username",component:UserdashboardComponent,children:[
    {path:'', redirectTo: 'dashboard', pathMatch: 'full'},
    {path:'dashboard',component:UserdashComponent},
    {path:'profile/changepassword',component:UserchangepasswordComponent},
    {path:'profile/updatedetails',component:UserupdatedetailsComponent},
    {path:'viewissuedbooks',component:ViewissuedbooksComponent},
    {path:'viewbooks',component:ViewbooksComponent},
    {path:'submitbookrequest',component:SubmitbookrequestComponent}
  ]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
