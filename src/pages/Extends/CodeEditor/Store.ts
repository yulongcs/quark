import { action, computed, observable, runInAction } from 'mobx';
import * as MonacoEditor from 'monaco-editor';
import { AppStore } from '../../../stores';
import { IHeaderProps, IMonacoEditorProps, IPreviewProps } from './types';

export default class Store {

  public app: AppStore;

  @observable public language: string;
  @observable public theme: MonacoEditor.editor.BuiltinTheme;

  @observable public code: string;

  constructor(app: AppStore) {
    this.app = app;

    this.theme = 'vs-dark';
    this.language = 'html';

    this.code = '<p>Hello, World!</p>';
  }

  @action public handleSelectChange = (id: 'theme' | 'language') => (value: string) => {
    runInAction(() => {
      this[id] = value;
    });
  }

  @action public handleCodeChange = (value: string) => {
    this.code = value;
  }

  @computed get headerProps(): IHeaderProps {
    const { handleSelectChange, theme, language } = this;
    return { handleSelectChange, theme, language };
  }

  @computed get monacoEditorProps(): IMonacoEditorProps {
    const { handleCodeChange, code, theme } = this;
    return { handleCodeChange, code, theme };
  }

  @computed get previewProps(): IPreviewProps {
    const { code } = this;
    return { code };
  }

}
