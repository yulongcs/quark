import { RawDraftContentState } from 'draft-js';
import { action, observable } from 'mobx';
import { AppStore } from '../../../stores';

export default class Store {

  public app: AppStore;

  @observable public content: RawDraftContentState;

  constructor(app: AppStore) {
    this.app = app;

  }

  @action public handleRawChange = (raw: RawDraftContentState) => {
    console.table(raw);
    // debugger;
    // console.log(JSON.stringify(raw));
  }

  @action public loadData = () => {
    this.content = {
      blocks: [{ 'key': '1vtai', 'text': '777888777777777', 'type': 'unstyled', 'depth': 0, 'inlineStyleRanges': [{ 'offset': 0, 'length': 15, 'style': 'FONTFAMILY-ARAIAL' }, { 'offset': 0, 'length': 15, 'style': 'BOLD' }, { 'offset': 0, 'length': 15, 'style': 'ITALIC' }, { 'offset': 0, 'length': 15, 'style': 'COLOR-003BA5' }], 'entityRanges': [], 'data': {} }],
      entityMap: {}
    } as any;
  }

  @action public init = () => {
    this.loadData();
  }

}
