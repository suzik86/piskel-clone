export default class ToolsController {
  constructor(sceneController) {
    this.sceneController = sceneController;
  }

  setView(view) {
    this.view = view;
  }

  chooseTool(tool) {
    this.sceneController.model.tool = tool;
    this.view.update();
  }

  refresh() {
    this.view.update();
  }

  key(event) {
    const k = window.app.settings.keybindings;
    const { code } = event;
    if (k.pen.key === code && k.pen.alt === event.altKey && k.pen.ctrl === event.ctrlKey) {
      this.chooseTool('pen');
    }
    if (k.bucket.key === code && k.bucket.alt === event.altKey && k.bucket.ctrl === event.ctrlKey) {
      this.chooseTool('bucket');
    }
    if (k.pen.picker === code && k.picker.alt === event.altKey && k.picker.ctrl === event.ctrlKey) {
      this.chooseTool('picker');
    }
    if (k.eraser.key === code && k.eraser.alt === event.altKey && k.eraser.ctrl === event.ctrlKey) {
      this.chooseTool('eraser');
    }
  }
}
