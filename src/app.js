import 'bootstrap';
import './palette.css';

import SceneModel from './components/scene/sceneModel';
import SceneView from './components/scene/sceneView';
import SceneController from './components/scene/sceneController';
import SettingsView from './components/settings/settingsView';
import SettingsController from './components/settings/settingsController';

const $ = require('jquery');

class AppController {
  constructor() {
    this.settings = {
      keybindings: {
        pen: {
          key: 'KeyP', alt: false, ctrl: false, name: 'Pen',
        },
        bucket: {
          key: 'KeyB', alt: false, ctrl: false, name: 'Bucket',
        },
        eraser: {
          key: 'KeyE', alt: false, ctrl: false, name: 'Eraser',
        },
        picker: {
          key: 'KeyC', alt: false, ctrl: false, name: 'Picker',
        },
      },
    };
  }

  load() {
    const loadModel = JSON.parse(localStorage.getItem('model'));
    this.sceneModel.load(loadModel);
    this.sceneController.refresh();
  }

  save() {
    localStorage.setItem('model', JSON.stringify(this.sceneModel));
  }

  export() {
    this.download('export.json', JSON.stringify(this.sceneModel));
  }

  download(filename, text) {
    const element = document.createElement('a');
    const data = encodeURIComponent(text);
    element.setAttribute('href', `data:javascript/json;charset=utf-8,${data}`);
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
  }

  start() {
    this.sceneModel = new SceneModel(0);
    const sceneView = new SceneView(this.sceneModel, this);
    this.sceneController = new SceneController(sceneView, this.sceneModel);
    this.sceneController.size = 32;

    this.settingsController = new SettingsController(this.settings);
    const settingsView = new SettingsView(this.settingsController);
    settingsView.render();


    let play = false;
    const self = this;
    $('#play').click(function playAnimation() {
      if (play) {
        self.sceneController.stop();
        $(this).text('Play');
      } else {
        self.sceneController.play($('#speed').val());
        $(this).text('Stop');
      }

      play = !play;
    });

    $('#speed').change(() => {
      if (play) {
        self.sceneController.stop();
        self.sceneController.play($('#speed').val());
      }
    });

    $('#fullscreen').click(() => {
      $('#preview')[0].requestFullscreen();
    });

    $(document).click(() => {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    });
  }
}

const app = new AppController();
app.start();
window.app = app;
