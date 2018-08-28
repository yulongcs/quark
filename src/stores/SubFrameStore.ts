import { action, observable } from 'mobx';

export default class SubframeStore {
  public url: string;
  @observable public visible: boolean;

  constructor() {
    this.visible = false;
    this.url = '';
  }

  @action public update = (obj: { url: string; visible: boolean }) => {
    const { url, visible } = obj;
    this.url = url;
    this.visible = visible;
  }

}
