import CanvasView from '../canvas/canvasView';
import CanvasController from '../canvas/canvasController';

import PalletteView from '../pallette/palletteView';
import PalletteController from '../pallette/palletteController';

import ToolsView from '../tools/toolsView';
import ToolsController from '../tools/toolsController';
import FramesListController from '../frames-list/framesListController';
import FramesListView from '../frames-list/framesListView';


export default class SceneController {
  constructor(view, model) {
    this.model = model;
    this.activeFrame = null;
    this.view = view;
    this.timer = null;

    this.canvasController = new CanvasController(this);
    this.canvasView = new CanvasView(this.canvasController, model);
    this.canvasView.render();

    this.palletteController = new PalletteController(this);
    const palletteView = new PalletteView(this.palletteController);
    palletteView.render();

    this.toolsController = new ToolsController(this);
    const toolsView = new ToolsView(this.toolsController);
    this.toolsController.setView(toolsView);
    toolsView.render();

    this.framesController = new FramesListController(this, model);
    const framesView = new FramesListView(this.framesController);
    this.framesController.setView(framesView);
    framesView.render();
    this.framesController.addFrame();

    this.color = 'red';
    this.tool = 'pen';
  }

  nextFrame() {
    this.model.next();
    this.draw();
    this.framesController.refresh();
  }

  play(speed) {
    const self = this;
    this.timer = setInterval(() => {
      self.nextFrame();
    }, 1000 / speed);
  }

  stop() {
    clearTimeout(this.timer);
  }

  onDraw() {
    this.framesController.draw();
  }

  draw() {
    this.canvasController.draw();
  }

  set color(color) {
    this.palletteController.chooseColor(color);
  }

  set tool(tool) {
    this.toolsController.chooseTool(tool);
  }

  set size(size) {
    this.canvasController.setSize(size);
  }

  refresh() {
    this.framesController.refresh();
    this.toolsController.refresh();
    this.palletteController.refresh();
    this.canvasController.refresh();
  }
}
