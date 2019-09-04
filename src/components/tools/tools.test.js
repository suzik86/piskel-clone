import ToolsController from './toolsController';
import ToolsView from './toolsView';

// jest.mock('./toolsController');

const $ = require('jquery');
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.resolve(__dirname, '../../index.html'), 'utf8');


describe('ToolsView.prototype.render', () => {
  const c = new ToolsController();
  c.sceneController = { model: { tool: null } };
  const tools = new ToolsView(c);
  c.setView(tools);

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    tools.render();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('Should be an instance of Function', () => {
    expect(ToolsView.prototype.render).toBeInstanceOf(Function);
  });

  it('Should be render correctly', () => {
    expect(document.getElementById('tools-list')).toBeTruthy();
    expect(document.getElementById('tool-button-pen')).toBeTruthy();
    expect(document.getElementById('tool-button-bucket')).toBeTruthy();
    expect(document.getElementById('tool-button-picker')).toBeTruthy();
    expect(document.getElementById('tool-button-eraser')).toBeTruthy();
  });

  it('Should be called event listener', () => {
    $('#tool-button-pen').click();
    expect(c.sceneController.model.tool).toEqual('pen');
  });

  it('Should update class', () => {
    tools.update();
    expect($('#tool-button-pen').hasClass('active')).toBeTruthy();
  });

  it('Should refresh', () => {
    c.sceneController.model.tool = 'bucket';
    c.refresh();
    expect($('#tool-button-bucket').hasClass('active')).toBeTruthy();
  });
});
