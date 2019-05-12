import {
  Component, Input, ElementRef, AfterViewInit, ViewChild, OnInit
} from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CanvasService } from './canvas.service';
import { Resteurant, Tables } from '../model/resteurant';
import { Shape } from '../model/Shape';
import { TokenStorageService } from '../auth/token-storage.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

interface Window {
  webkitURL?: any;
  URL?: any;
}
declare var window: Window;
@Component({
  selector: 'app-canvas',
  templateUrl: 'canvas.component.html',
  styles: ['canvas { border: 1px solid #000; }']
})
export class CanvasComponent implements AfterViewInit, OnInit {
  form: any = {};

  constructor(private http: HttpClient, private canvasService: CanvasService, private tokenStorage: TokenStorageService,
    private router: Router) { }
  @ViewChild('canvas') public canvas: ElementRef;

  @Input() public width = 400;
  @Input() public height = 400;
  public fileUploads: Observable<Blob>;
  private shapes: Shape[] = [];
  private valid = false;
  private dragging = false;
  private sellection = null;
  private dragx;
  private dragy;
  private cx: CanvasRenderingContext2D;
  public url = '';
  private img = new Image();
  private canvasEl;
  private file;
  public errorMessage = '';
  isSignUpFailed = false;

  resteurant: Observable<Tables[]>;
  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }
  public onSelectFile(event: any) { // called each time file input changes

    const URL = window.webkitURL || window.URL;
    if (window.webkitURL !== undefined) {
  }
    const url = URL.createObjectURL(event.target.files[0]);
    this.file = event.target.files[0];
    this.img.src = url;
    this.img.onload = () => {
        this.width = this.img.width;
        this.height = this.img.height;
        this.canvasEl.width = this.img.width;
        this.canvasEl.height = this.img.height;
        this.cx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
        this.valid = false;
    };

  }

  public ngAfterViewInit() {
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.captureEvents(this.canvasEl);
  }

  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element

   canvasEl.addEventListener('mousedown', (e) => {
   const mx = e.clientX;
   const my = e.clientY;
   const l = this.shapes.length;
   for (let i = 0; i < l ; i++) {
    const top = canvasEl.getClientRects().item(0).top;
    const left = canvasEl.getClientRects().item(0).left;
     if ( this.shapes[i].getX() < mx - left && this.shapes[i].getX() + this.shapes[i].getW() > mx - left &&
     this.shapes[i].getY() < my - top && this.shapes[i].getY() + this.shapes[i].getH() > my - top ) {

      const mySel = this.shapes[i];
      this.dragx = mx - mySel.getX();
      this.dragy = my - mySel.getY();
      this.dragging = true;
      this.sellection = mySel;
      this.valid = false;
      return;
     }
   }
   if (this.sellection) {
     this.sellection = null;
     this.valid = false;
   }
   }, true);

        canvasEl.addEventListener('mousemove' , (e) => {
          if (this.dragging ) {
        this.sellection.setX(e.clientX - this.dragx);
        this.sellection.setY(e.clientY - this.dragy);
        this.valid = false;
          }
        }, true);

        canvasEl.addEventListener('mouseup', (e) => {
          this.dragging = false;
        }, true);
        /*
        const rect = canvasEl.getBoundingClientRect();

        // previous and current position with the offset
        const prevPos = {
          x: res[0].clientX - rect.left,
          y: res[0].clientY - rect.top
        };

        const currentPos = {
          x: res[1].clientX - rect.left,
          y: res[1].clientY - rect.top
        };

        // this method we'll implement soon to do the actual drawing*/
        const interval = 30;
        setInterval(() => { this.drawOnCanvas(); }, interval);

  }

  private drawOnCanvas() {

 if (!this.valid) {
   const l = this.shapes.length;
  this.cx.clearRect(0, 0, this.width, this.height);
  this.cx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
   for (let i = 0 ; i < l ; i++) {
   const shape = this.shapes[i];

   this.shapes[i].draw(this.cx);
   }
   if (this.sellection != null) {
     const mySel = this.sellection;
     this.cx.strokeRect(mySel.getX(), mySel.getY(), mySel.getW(), mySel.getH());
   }

   this.valid = true;
 }
  }
 add () {
  const shape = new Shape(10, 10, 50, 50, '#AAAAAA');
  this.shapes.push(shape);

   shape.draw(this.cx);
}
 onSubmit() {


  const url = 'http://localhost:8080/api/auth/saveresteurant';

  let tables = '';
  const l = this.shapes.length;
  for (let i = 0 ; i < l ; i++) {
    tables = tables + this.shapes[i].getX() + ',' + this.shapes[i].getY() + ';';
  }

    const formdataa: FormData = new FormData();
    formdataa.append('file', this.file);
    formdataa.append('resteurantname', this.form.resteurantname);
    formdataa.append('streetNumber', this.form.streetNumber);
    formdataa.append('houseNumber', this.form.houseNumber);
    formdataa.append('code', this.form.code);
    formdataa.append('cityName', this.form.cityName);
    formdataa.append('tables', tables);
  return this.http.post<string>(url, formdataa).subscribe(res => console.log(res), error => {
    console.log(error);
    this.isSignUpFailed = true;
    this.errorMessage = error.error.message;
  });
}
private load() {
  this.fileUploads = this.canvasService.getFiles('nazwaa5');

  this.resteurant = this.canvasService.getResteurant();

  this.resteurant.forEach(data => {
console.log(data);
 data.forEach(e => {
  const shape = new Shape(e.x, e.y, 50, 50, '#AAAAAA');
  this.shapes.push(shape);

   shape.draw(this.cx);
 }

  ); } );
  this.fileUploads.forEach(e => {
    const url = URL.createObjectURL(e);
    this.img.src = url;
    this.img.onload = () => {
        this.width = this.img.width;
        this.height = this.img.height;
        this.canvasEl.width = this.img.width;
        this.canvasEl.height = this.img.height;
        this.cx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
        this.valid = false;
    };
  } );


 }

}

