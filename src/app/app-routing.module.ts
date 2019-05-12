import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { PmComponent } from './pm/pm.component';
import { AdminComponent } from './admin/admin.component';
import { CanvasComponent } from './user/canvas.component';
import { ResteurantDetailsComponent } from './resteurant/resteurant-detalis.component';
import { TableComponent } from './table/table.component';
import { AppGuard } from './app.guard';
import { ManageFoodComponent } from './food/manage-food.component';
import { CreateFoodComponent } from './food/create-food.component';
import { FoodListComponent } from './food/food.component';

const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent

    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'user',
        component: UserComponent
    },
    {
        path: 'pm',
        component: PmComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
    {
      path: 'admin/foodmanage',
      component: ManageFoodComponent,
      children: [{path: 'add' , component: CreateFoodComponent},
                 {path: 'food' , component: FoodListComponent}]
    },
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'admin/createResteurant',
        component: CanvasComponent
    },
    {
        path: ':rest',
        component: ResteurantDetailsComponent
    },
    {
        path: ':rest/:id',
        component: TableComponent,
        pathMatch: 'full' },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
