import { History } from 'history';

export default class RouteStore {
  history: History;

  constructor(history: History) {
    this.history = history;
  }

  goPage = (url: string) => {
    this.history.push(url);
  }

  jumpExternalURL = (url: string) => {
    location.href = url;
  }
};
