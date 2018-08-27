import { action, computed, observable, runInAction } from 'mobx';
import * as MonacoEditor from 'monaco-editor';
import { AppStore } from '../../../stores';
import { IHeaderProps, IMonacoEditorProps, IPreviewProps } from './types';

export default class Store {

  public app: AppStore;

  @observable public isEditing: boolean;

  @observable public language: string;
  @observable public theme: MonacoEditor.editor.BuiltinTheme;

  @observable public code: string;

  constructor(app: AppStore) {
    this.app = app;

    this.isEditing = false;

    this.theme = 'vs-dark';
    this.language = 'html';

    this.code = '';
  }

  @action public handleSelectChange = (id: 'theme' | 'language') => (value: string) => {
    runInAction(() => {
      this[id] = value;
    });
  }

  @action public handleCodeChange = (value: string) => {
    this.code = value;
  }

  @action public toggleEditing = (status: boolean) => {
    runInAction(() => {
      this.isEditing = status;
    });
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
    const { code, isEditing, toggleEditing, handleCodeChange } = this;
    return {
      code,
      isEditing,
      toggleEditing,
      setCodeValue: handleCodeChange
    };
  }

}
