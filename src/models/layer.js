export default class Layer {
  constructor(size, scene) {
    this.size = size;
    this.clear();
    this.scene = scene;
  }

  static load(size, layerData) {
    const layer = new Layer(size);
    layer.matrix = layerData.matrix.map(row => row.slice());
    return layer;
  }

  draw(ctx) {
    const { width } = ctx.canvas;
    const { height } = ctx.canvas;
    const recWidth = Math.ceil(width / this.size);
    const recHeight = Math.ceil(height / this.size);

    for (let x = 0; x < this.size; x += 1) {
      for (let y = 0; y < this.size; y += 1) {
        const color = this.matrix[x][y];
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(Math.floor(x * recWidth), Math.floor(y * recHeight), recWidth, recHeight);
        }
      }
    }
  }

  clone() {
    const layer = new Layer(this.size, this.scene);
    layer.matrix = this.matrix.map(row => row.slice());
    return layer;
  }

  setColor(x, y, color) {
    const row = this.matrix[x];
    row[y] = color;
  }

  getColor(x, y) {
    return this.matrix[x][y];
  }

  clear() {
    this.matrix = Array(this.size).fill().map(() => Array(this.size).fill());
  }

  setSize(size) {
    this.size = size;
    this.clear();
  }

  /* addAction(action) {
    this.actions.push(action);
  } */
}
