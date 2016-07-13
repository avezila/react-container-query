import elementResizeDetectorMaker = require('element-resize-detector');
import {ElementResizeDetector} from 'element-resize-detector/type';
import invariant = require('invariant');

export default {
  componentDidMount() {
    if (!this.$erd) {
      this.$erd = elementResizeDetectorMaker({strategy: 'scroll'});
    }

    invariant(this.$container, 'container element must be defined, make sure you have defineContainer assign to ref of container element');

    this.$erd.listenTo(this.$container, (element: HTMLElement) => {
      if (this.componentDidResize) {
        this.componentDidResize(element);
      }
    });
  },

  componentWillUnmount() {
    this.$erd.uninstall(this.$container);
  },

  defineContainer(element: HTMLElement) {
    this.$container = element;
  },
};
