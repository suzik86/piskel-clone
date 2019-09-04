
export default class CanvasController {
  constructor(sceneController) {
    this.sceneController = sceneController;
    this.model = sceneController.model;
  }

  setView(view) {
    this.view = view;
  }

  move(xy) {
    if (this.model.tool === 'pen') {
      const layer = this.model.getActiveLayer();
      layer.setColor(xy.x, xy.y, this.model.color);
    }
    if (this.model.tool === 'eraser') {
      const layer = this.model.getActiveLayer();
      layer.setColor(xy.x, xy.y, null);
    }
    this.draw();
  }

  draw() {
    this.view.draw(this.model.getActiveFrame());
    this.sceneController.onDraw();
  }

  down(xy) {
    const layer = this.model.getActiveLayer();

    if (this.model.tool === 'pen') {
      layer.setColor(xy.x, xy.y, this.model.color);
    }
    if (this.model.tool === 'eraser') {
      layer.setColor(xy.x, xy.y, null);
    }
    if (this.model.tool === 'picker') {
      this.sceneController.color = layer.getColor(xy.x, xy.y);
    }
    if (this.model.tool === 'bucket') {
      const newColor = this.model.color;
      this.fill(xy.x, xy.y, newColor);
    }

    this.draw();
  }

  up(xy) {
    console.log(xy);
  }

  setSize(size) {
    this.model.currentSize = size;
    this.sceneController.refresh();
    this.view.setSize(size);
  }

  refresh() {
    this.sceneController.draw();
    this.view.setSize(this.model.size);
  }

  fill(x, y, fillColor) {
    const layer = this.model.getActiveLayer();
    const targetColor = layer.getColor(x, y);

    if (targetColor !== fillColor) {
      const pixelsToCheck = [x, y];
      while (pixelsToCheck.length > 0) {
        const newy = pixelsToCheck.pop();
        const newx = pixelsToCheck.pop();

        const currentColor = layer.getColor(newx, newy);
        if (currentColor === targetColor) {
          layer.setColor(newx, newy, fillColor);

          if (newx < this.model.size - 1) {
            pixelsToCheck.push(newx + 1, newy);
          }

          if (newx > 0) {
            pixelsToCheck.push(newx - 1, newy);
          }

          if (newy < this.model.size - 1) {
            pixelsToCheck.push(newx, newy + 1);
          }

          if (newy > 0) {
            pixelsToCheck.push(newx, newy - 1);
          }
        }
      }
    }
  }
}
