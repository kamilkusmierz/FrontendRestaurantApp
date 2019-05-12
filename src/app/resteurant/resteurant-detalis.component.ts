import { OnInit, Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges } from '@angular/core';
import { Resteurant, Tables } from '../model/resteurant';
import { Shape } from '../model/Shape';
import { CanvasService } from '../user/canvas.service';
import { Observable } from 'rxjs';
import { viewParentEl } from '@angular/core/src/view/util';
import { Router } from '@angular/router';
import { TokenStorageService } from '../auth/token-storage.service';
@Component({
  selector: 'app-resteurantdetails',
  templateUrl: './resteurant-details.component.html',
  styles: ['canvas { border: 1px solid #000; }']
})
export class ResteurantDetailsComponent implements AfterViewInit, OnInit {

  constructor(private canvasService: CanvasService, private router: Router,
     private canvasServices: CanvasService, private tokenStorage: TokenStorageService) { }
  @ViewChild('canvas') public canvas: ElementRef;


  @Input() public width = 400;
  @Input() public height = 400;
  private cx: CanvasRenderingContext2D;
  private canvasEl;
  private valid = false;
  private shapes: Shape[] = [];
  private img = new Image();
  private tables: Tables[];
  public fileUploads: Observable<Blob>;

  selectedResteurant: Resteurant;
  resteurant = new Observable<Resteurant[]>();
  ngOnInit() {
    if (!this.tokenStorage.getToken()) {
      this.router.navigateByUrl('/home');
    }
  }

  get selectedOrgMod() {
    return this.selectedResteurant;

  }

  set selectedOrgMod(value) {
    this.selectedResteurant = value;
    this.load();
  }

  public ngAfterViewInit() {
    this.resteurant = this.canvasServices.getResteurant();
    this.canvasEl = this.canvas.nativeElement;
    this.cx = this.canvasEl.getContext('2d');

    this.canvasEl.width = this.width;
    this.canvasEl.height = this.height;

    this.cx.lineWidth = 3;
    this.cx.lineCap = 'round';
    this.cx.strokeStyle = '#000';
    this.captureEvents(this.canvasEl);


  }
  private load() {
    this.fileUploads = this.canvasService.getFiles(this.selectedResteurant.name);
    this.tables = this.selectedResteurant.tables;
   console.log(this.tables);


    this.fileUploads.forEach(e => {
      const url = URL.createObjectURL(e);
      this.img.src = url;
      this.img.onload = () => {
        this.width = this.img.width;
        this.height = this.img.height;
        this.canvasEl.width = this.img.width;
        this.canvasEl.height = this.img.height;

        this.valid = false;
      };
    });
    this.shapes = [];
    this.tables.forEach(e => {
      const shape = new Shape(e.x, e.y, 50, 50, '#AAAAAA');
      this.shapes.push(shape);


    });
  }


  private captureEvents(canvasEl: HTMLCanvasElement) {
    // this will capture all mousedown events from the canvas element

    canvasEl.addEventListener('mousedown', (e) => {
      const mx = e.clientX;
      const my = e.clientY;
      const l = this.shapes.length;
      for (let i = 0; i < l; i++) {
        const top = canvasEl.getClientRects().item(0).top;
        const left = canvasEl.getClientRects().item(0).left;
        if (this.shapes[i].getX() < mx - left && this.shapes[i].getX() + this.shapes[i].getW() > mx - left &&
          this.shapes[i].getY() < my - top && this.shapes[i].getY() + this.shapes[i].getH() > my - top) {

          this.router.navigate([`/${this.selectedResteurant.name}/stolik${i + 1}`]);
          this.valid = false;
          return;
        }
      }

    }, true);

    const interval = 10;
    setInterval(() => { this.drawOnCanvas(); }, interval);

  }
  private drawOnCanvas() {

    if (!this.valid) {
      const l = this.shapes.length;
      this.cx.clearRect(0, 0, 200, 200);
      this.cx.drawImage(this.img, 0, 0, this.img.width, this.img.height);
      this.cx.globalAlpha = 0.3;
      for (let i = 0; i < l; i++) {
        const shape = this.shapes[i];

        this.shapes[i].draw(this.cx);
      }


      this.valid = true;
    }
  }

}
