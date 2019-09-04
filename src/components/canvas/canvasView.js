import template from './canvasTemplate.html.tpl';

const _ = require('lodash');
const $ = require('jquery');

export default class CanvasView {
  constructor(controller, model) {
    this.controller = controller;
    controller.setView(this);
    this.model = model;
    this.ctx = null;
  }

  render() {
    const tmpl = _.template(template);
    $('#canvas-container').html(tmpl());

    const $canvas = $('#canvas');
    this.ctx = $canvas[0].getContext('2d');
    this.ctxPreview = $('#preview')[0].getContext('2d');

    let mouseDown = false;
    $canvas.mousedown((event) => {
      mouseDown = true;
      this.controller.down(this.toMatrix(event.offsetX, event.offsetY));
    });

    $canvas.mouseup((event) => {
      mouseDown = false;
      this.controller.up(this.toMatrix(event.offsetX, event.offsetY));
    });

    $canvas.mousemove((event) => {
      const xy = this.toMatrix(event.offsetX, event.offsetY);
      if (mouseDown) {
        this.controller.move(xy);
      }
      $('#mouse-coordinates').html(`x:${xy.x} y:${xy.y}`);
    });

    const $sizeButtons = $('#size-container button');

    $sizeButtons.click((event) => {
      this.controller.setSize($(event.target).data('size'));
    });
  }

  toMatrix(x, y) {
    return {
      x: Math.min(this.model.size - 1, Math.max(0, Math.floor((x * this.model.size) / 640))),
      y: Math.min(this.model.size - 1, Math.max(0, Math.floor((y * this.model.size) / 640))),
    };
  }

  draw(frame) {
    this.drawToContext(frame, this.ctx, true);
    this.drawToContext(frame, this.ctxPreview, false);
  }

  setSize(size) {
    $('#size-container button').removeClass('active');
    $(`#size-container button[data-size=${size}]`).addClass('active');
  }

  drawToContext(frame, ctx, drawGrid) {
    ctx.fillStyle = 'white';
    const width = ctx.canvas.clientWidth;
    const height = ctx.canvas.clientHeight;
    ctx.fillRect(0, 0, width, height);

    if (drawGrid) {
      const rect = width / this.model.size;
      ctx.beginPath();
      for (let x = 0; x <= this.model.size; x += 1) {
        ctx.moveTo(x * rect, 0);
        ctx.lineTo(x * rect, height);

        ctx.moveTo(0, x * rect);
        ctx.lineTo(width, x * rect);
      }
      ctx.strokeStyle = 'silver';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    frame.draw(ctx);
  }
}
