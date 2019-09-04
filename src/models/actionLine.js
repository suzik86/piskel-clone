import Action from './action';

export default class ActionLine extends Action {
  constructor(coordFrom, coordTo, color) {
    super(color);
    this.coordFrom = coordFrom;
    this.coordTo = coordTo;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.moveTo(this.coordFrom.x, this.coordFrom.y);
    ctx.lineTo(this.coordTo.x, this.coordTo.y);
    ctx.stroke();
  }
}
