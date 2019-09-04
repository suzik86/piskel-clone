import template from './palletteTemplate.html.tpl';

const _ = require('lodash');
const $ = require('jquery');

export default class PalletteView {
  constructor(controller) {
    this.controller = controller;
    controller.setView(this);
    this.model = this.controller.sceneController.model;
  }

  render() {
    const items = [
      { name: 'Current color', color: '', id: 'current-color' },
      { name: 'Prev color', color: '', id: 'prev-color' },
      { name: 'Red', color: 'red', id: 'red' },
      { name: 'Blue', color: 'blue', id: 'blue' },
      { name: 'Green', color: 'green', id: 'green' },
    ];

    const tmpl = _.template(template);
    $('#pallette-list').html(tmpl({ list: items }));
    this.$palletteButtons = $('#pallette-list button');

    this.$palletteButtons.click(event => this.controller.chooseColor($(event.target).data('color')));
  }

  update() {
    this.$palletteButtons.removeClass('active');
    $(this).addClass('active');

    $('#current-color').data('color', this.model.color || '');
    $('#current-color').find('.badge').css('background-color', this.model.color || '');

    $('#prev-color').data('color', this.controller.prevColor || '');
    $('#prev-color').find('.badge').css('background-color', this.controller.prevColor || '');
  }
}
