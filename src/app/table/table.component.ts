import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../model/Order';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../services/user.service';
import { error } from '@angular/compiler/src/util';
import { CheckRequest } from '../model/CheckRequest';
import { Food } from '../model/Food';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../auth/token-storage.service';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public subbmit = false;
  form: any = {};
  public bussy = false;
  url1: string[] = this.router.url.split('/');
  resteurantname = this.url1[1];
  stolik = this.url1[2];
  public zamowione: Food[] = [];
  public food: Observable<Food[]>;
  public date: string;
  public enddate: string;
  public wrongdata = false;
  private order: Order;
  private koniec = '1';
  private checkrequest: CheckRequest;
  constructor(private router: Router, private userService: UserService, private tokenStorage: TokenStorageService) {
    const tmpdate = new Date();
    tmpdate.setHours(tmpdate.getHours());
    this.date = tmpdate.toISOString().slice(0, 16);
  }

  ngOnInit(): void {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
   this.food = this.userService.getFood();
  this.food.forEach(e => console.log(e));

  }
  onSubmit() {

    this.order = new Order(this.form.firstname, this.form.lastname,
      this.resteurantname, this.stolik, this.date, this.enddate, this.zamowione);

    if (this.userService.postOrder(this.order).subscribe(data => console.log(data))) {
      this.subbmit = true;
    } else {
      this.subbmit = false;
    }


  }
  add(f: Food) {
    this.food.forEach(e => {
      e.forEach( d => {
        if (d.id === f.id) {
          this.zamowione.push(d);
        }
      });
    });
console.log(this.zamowione);

  }
  deletefood(i: number) {
    console.log(i);
   this.zamowione.splice(i, 1);
  }
  endDate(event: string) {
    this.koniec = event;

  }
  isBussy(date: string) {
    this.date = date;
    const now = new Date();
    const newDate = new Date(this.date);
    this.wrongdata = false;
    if (now > newDate) {
      this.wrongdata = true;
      return;
    }
    newDate.setHours(newDate.getHours() + parseInt(this.koniec, 10) + 1);
    console.log(newDate);
    this.enddate = newDate.toISOString().slice(0, 16);
    this.checkrequest = new CheckRequest(this.resteurantname, this.stolik, date, this.enddate);
    console.log(this.checkrequest);
    this.userService.isBussy(this.checkrequest).subscribe(
      data => {
        console.log(data);
        this.bussy = false;

      },
      // tslint:disable-next-line:no-shadowed-variable
      error => {
        this.bussy = true;

        console.log(error);
      }
    );

  }


}
