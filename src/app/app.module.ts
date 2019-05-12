import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user/user.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { PmComponent } from './pm/pm.component';

import { httpInterceptorProviders } from './auth/auth-interceptor';
import { CanvasComponent } from './user/canvas.component';
import { ResteurantDetailsComponent } from './resteurant/resteurant-detalis.component';
import { TableComponent } from './table/table.component';
import { CreateFoodComponent } from './food/create-food.component';
import { ManageFoodComponent } from './food/manage-food.component';
import { FoodListComponent } from './food/food.component';
import { FoodDetailsComponent } from './food/food-detal.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    PmComponent,
    CanvasComponent,
    ResteurantDetailsComponent,
    TableComponent,
    CreateFoodComponent,
    ManageFoodComponent,
    FoodListComponent,
    FoodDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
