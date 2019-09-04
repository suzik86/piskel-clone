import template from './template.html.tpl';

const _ = require('lodash');
const $ = require('jquery');

export default class ToolsView {
  constructor(controller) {
    this.controller = controller;
    this.model = this.controller.sceneController.model;
  }

  render() {
    const items = [
      { name: 'Pen', image: 'fas fa-pen', id: 'pen' },
      { name: 'Paint bucket', image: 'fas fa-fill-drip', id: 'bucket' },
      { name: 'Choose color', image: 'fas fa-eye-dropper', id: 'picker' },
      { name: 'Eraser', image: 'fas fa-eraser', id: 'eraser' },
    ];

    const tmpl = _.template(template);
    $('#tools-list').html(tmpl({ list: items }));

    this.$toolButtons = $('#tools-list button');

    this.$toolButtons.click(event => this.controller.chooseTool($(event.target).data('tool')));
    $(document).keypress(event => this.controller.key(event));
  }

  update() {
    this.$toolButtons.removeClass('active');
    $('#tools-list').find(`[data-tool="${this.model.tool}"]`).addClass('active');
  }
}
