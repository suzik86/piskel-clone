export default class SettingsController {
  constructor(settings) {
    this.settings = settings;
  }

  setView(view) {
    this.view = view;
  }

  show() {
    this.view.showDialog();
  }

  save(formData) {
    // eslint-disable-next-line
    for (const id in formData) {
      this.settings.keybindings[formData[id].name].key = formData[id].value;
    }

    this.view.hideDialog();
  }
}
