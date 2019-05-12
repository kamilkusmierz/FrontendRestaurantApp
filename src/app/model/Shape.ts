export class Shape {

  constructor(private x: number, private y: number, private w: number, private h: number, private fill: string) {
    this.x = x || 0;
    this.y = y || 0;
    this.w = w || 1;
    this.h = h || 1;
    this.fill = fill || '#AAAAAA';
  }
getX(): number {
  return this.x;
}
getY(): number {
  return this.y;
}
getW(): number {
return this.w;
}
getH(): number {
  return this.h;
}
setX(x: number) {
  this.x = x;
}
setY(y: number) {
  this.y = y;
}
  draw(ctx) {
    ctx.fillStyle = this.fill;
    ctx.fillRect(this.x, this.y, this.w, this.h);

  }
}
