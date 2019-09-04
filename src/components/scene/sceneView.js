export default class SceneView {
  constructor(model, controller) {
    this.model = model;
    this.controller = controller;
    $('#load').click(() => this.controller.load());
    $('#save').click(() => this.controller.save());
    $('#export').click(() => this.controller.export());
  }
}
