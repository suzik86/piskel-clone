import Layer from './layer';


export default class Frame {
  constructor(size) {
    this.layers = [];
    this.size = size;
    this.addlayer();
  }

  static load(size, frameData) {
    const frame = new Frame(size);
    frame.layers = frameData.layers.map(layerData => Layer.load(size, layerData));
    return frame;
  }

  draw(ctx) {
    this.layers.forEach(item => item.draw(ctx));
  }

  clear() {
    this.layers = [];
  }

  clone() {
    const newFrame = new Frame(this.size);
    newFrame.layers = [];

    this.layers.forEach((layer) => {
      newFrame.layers.push(layer.clone());
    });

    return newFrame;
  }

  addlayer() {
    const layer = new Layer(this.size);
    this.layers.push(layer);

    return layer;
  }

  setSize(size) {
    this.size = size;
    this.layers.forEach(layer => layer.setSize(size));
  }
}
