export default class PalletteController {
  constructor(sceneController) {
    this.sceneController = sceneController;
    this.prevColor = '';
  }

  chooseColor(color) {
    this.prevColor = this.sceneController.model.color;
    this.sceneController.model.color = color;
    this.view.update();
  }

  setView(view) {
    this.view = view;
  }

  refresh() {
    this.view.update();
  }
}
