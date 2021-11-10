import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export class Scrolling extends Vue {
  scrollToElementAndFocusIt(refElement: Vue | Element | Vue[] | Element[]): void {
    if (refElement && refElement instanceof HTMLElement) {
      refElement.scrollIntoView();
      refElement.focus();
    }
  }
}
