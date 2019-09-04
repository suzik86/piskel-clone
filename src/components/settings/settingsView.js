import template from './settingsTemplate.html.tpl';

const _ = require('lodash');
const $ = require('jquery');

export default class SettingsView {
  constructor(controller) {
    this.controller = controller;
    controller.setView(this);
    this.settings = this.controller.settings;
  }

  render() {
    $('#settings-button').click(() => this.controller.show());
  }

  showDialog() {
    const tmpl = _.template(template);
    $('#settings-container').html(tmpl({ keys: this.settings.keybindings }));
    $('#settings-save').click(() => {
      const data = $('#settings-form').serializeArray();
      this.controller.save(data);
    });
    $('#settings-dialog').modal();
  }

  hideDialog() {
    $('#settings-dialog').modal('hide');
  }
}
