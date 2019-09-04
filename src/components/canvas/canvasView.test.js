import CanvasView from './canvasView';

describe('CanvasView.prototype.render', () => {
  it('Should be an instance of Function', () => {
    expect(CanvasView.prototype.render).toBeInstanceOf(Function);
  });
});

describe('CanvasView.prototype.toMatrix', () => {
  it('Сoordinates must be converted to matrix', () => {
    expect(CanvasView.prototype.toMatrix).toBeInstanceOf(Function);
  });
});
