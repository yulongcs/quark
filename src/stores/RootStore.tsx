import { observable, action } from 'mobx';

interface Indicator {
  text?: string;
  icon?: string;
  show: boolean;
}

export class RootStore {
  @observable indicator: Indicator;

  @observable authed: boolean;

  @action setAuthed = (authed: boolean) => {
    this.authed = authed;
  }

  @action updateIndicator = (indicator: Indicator) => {
    if (!indicator.show) {
      this.indicator = { text: '', icon: '', show: false };
      return;
    }
    this.indicator = { ...this.indicator, ...indicator };
  }

  constructor() {
    this.authed = true;
    this.indicator = { text: '', icon: '', show: false };
  }

  // @action loadTitle = () => {
  //   this.title = 'Welcome to home page !';
  // }

  // static init() {
  //   return new Store();
  // }
}

export default new RootStore();
