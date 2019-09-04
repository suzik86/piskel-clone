export default class FramesListController {
  constructor(sceneController, model) {
    this.sceneController = sceneController;
    this.model = model;
  }

  setView(view) {
    this.view = view;
  }

  refresh() {
    this.view.refresh();
    this.sceneController.draw();
  }

  draw() {
    this.view.draw();
  }

  reorder(positions) {
    console.log(positions);
    this.model.reorderFrames(positions);
    this.refresh();
  }

  addFrame() {
    this.model.addFrame();
    this.refresh();
    this.setActiveFrame(this.model.frames.length - 1);
  }

  duplicateFrame(num) {
    this.model.duplicateFrame(num);
    this.refresh();
    this.setActiveFrame(this.model.frames.length - 1);
  }

  deleteFrame(num) {
    this.model.deleteFrame(num);
    if (!this.model.frames.length) {
      this.model.addFrame();
    }
    this.refresh();
    this.setActiveFrame(this.model.frames.length - 1);
  }

  setActiveFrame(num) {
    this.model.activeFrame = num;
    this.refresh();
  }
}
