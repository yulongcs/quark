import { History } from 'history';

export default class RouteStore {

  private history: History;

  constructor(history: History) {
    this.history = history;
  }

  public goPage = (url: string) => {
    this.history.push(url);
  }

  public goBack = () => {
    this.history.goBack();
  }

  public jumpExternalURL = (url: string) => {
    location.href = url;
  }
}
