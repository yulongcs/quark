import * as MonacoEditor from 'monaco-editor';

export interface IHeaderProps {
  handleSelectChange: (id: 'theme' | 'language') => (value: string) => void;
  theme: MonacoEditor.editor.BuiltinTheme;
  language: string;
}

export interface IMonacoEditorProps {
  theme: MonacoEditor.editor.BuiltinTheme;
  code: string;
  handleCodeChange: (value: string) => void;
}

export interface IPreviewProps {
  code: string;
  isEditing: boolean;
  toggleEditing:  (status: boolean) => void;
  setCodeValue: (value: string) => void;
}
