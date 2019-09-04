import template from './framesList.html.tpl';

require('webpack-jquery-ui/sortable');

const _ = require('lodash');
const $ = require('jquery');

export default class FramesListView {
  constructor(controller) {
    this.controller = controller;
    controller.setView(this);
    this.model = this.controller.model;
  }

  render() {
    const tmpl = _.template(template);
    $('#frames-container').html(tmpl());

    const self = this;
    $('#add-frame').click(() => {
      self.controller.addFrame();
    });

    $('#frames').on('click', 'li', function setFrame() {
      $('#frames li').removeClass('active');
      $(this).addClass('active');
      self.controller.setActiveFrame($(this).data('id'));
    });

    $('#frames').on('click', 'li a.duplicate', function duplicate(e) {
      self.controller.duplicateFrame($(this).parent().data('id'));
      e.stopPropagation();
    });

    $('#frames').on('click', 'li a.delete', function deleteFrames(e) {
      self.controller.deleteFrame($(this).parent().data('id'));
      e.stopPropagation();
    });
  }

  refresh() {
    $('#frames').html(this.model.frames.map((item, i) => {
      const klass = i === this.model.activeFrame ? 'active' : '';
      return `<li class="${klass}" data-id="${i}"><canvas width="128" height="128" id="frame-${i}" data-id="${i}"></canvas><span>${i + 1}</span><a class="delete btn btn-red btn-sm" title="delete"><i class="fa fa-trash"></i></a><a class="duplicate btn btn-default btn-sm" title="Duplicate"><i class="fa fa-plus"></i></a></li>`;
    }).join(''));

    $('#frames').sortable({
      update: () => {
        const positions = $('#frames li').map((index, item) => $(item).data('id'));
        this.controller.reorder(positions);
      },
    });
    $('#frames').disableSelection();

    this.draw();
  }

  draw() {
    this.model.frames.forEach((miniFrame, index) => {
      const frameContext = $(`#frame-${index}`)[0].getContext('2d');
      miniFrame.draw(frameContext);
    });
  }
}
