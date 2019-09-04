import Frame from '../../models/frame';

export default class SceneModel {
  constructor(size) {
    this.frames = [];
    this.color = '';
    this.tool = '';
    this.activeFrame = null;
    this.activeLayer = null;
    this.size = size;
  }

  load(loadModel) {
    this.size = loadModel.size;
    this.tool = loadModel.tool;
    this.color = loadModel.color;
    this.frames = loadModel.frames.map(frame => Frame.load(this.size, frame));
    this.activeFrame = 0;
    this.activeLayer = 0;
  }

  getActiveFrame() {
    return this.frames[this.activeFrame];
  }

  getActiveLayer() {
    const frame = this.frames[this.activeFrame];
    const layer = frame.layers[this.activeLayer];

    return layer;
  }

  reorderFrames(positions) {
    this.frames = this.frames.map((item, index) => this.frames[positions[index]]);
  }

  addFrame() {
    const frame = new Frame(this.size);
    this.frames.push(frame);
    this.activeLayer = 0;
    this.activeFrame = this.frames.length - 1;
    return frame;
  }

  deleteFrame(num) {
    this.frames.splice(num, 1);
    this.activeFrame = Math.min(this.activeFrame, this.frames.length - 1);
  }

  duplicateFrame(num) {
    const newFrame = this.frames[num].clone();
    this.frames.push(newFrame);
    this.activeFrame = this.frames.length - 1;
    return newFrame;
  }

  set currentColor(color) {
    this.color = color;
  }

  set currentTool(tool) {
    this.tool = tool;
  }

  set currentSize(size) {
    this.size = size;
    this.frames.forEach(frame => frame.setSize(size));
  }

  next() {
    this.activeFrame += 1;
    this.activeFrame = this.activeFrame % this.frames.length;
    return this.frames[this.activeFrame];
  }
}
