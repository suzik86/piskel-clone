import SceneModel from './sceneModel';

describe('SceneModel.prototype.reorderFrames', () => {
  it('Should be an instance of Function', () => {
    expect(SceneModel.prototype.reorderFrames).toBeInstanceOf(Function);
  });

  it('Should add frame', () => {
    const model = new SceneModel(8);
    model.addFrame();

    expect(model.frames.length).toEqual(1);
  });
});
