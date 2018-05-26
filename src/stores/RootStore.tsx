import { action, observable } from 'mobx';

interface Indicator {
  text?: string;
  icon?: string;
  show: boolean;
}

export class RootStore {
  @observable public indicator: Indicator = { text: '全局指示提示', icon: '', show: false };

  @observable public authed: boolean = true;

  @action public setAuthed = (authed: boolean) => {
    this.authed = authed;
  }

  @action public updateIndicator = (indicator: Indicator) => {
    if (!indicator.show) {
      this.indicator = { text: '', icon: '', show: false };
      return;
    }
    this.indicator = { ...this.indicator, ...indicator };
  }

}

export default new RootStore();
