import { observer } from 'mobx-react';
import * as React from 'react';
import MonacoEditor from 'react-monaco-editor';
import { IMonacoEditorProps } from '../types';

const options = {
  selectOnLineNumbers: true,
  tabSize: 2
};

const Editor: React.SFC<IMonacoEditorProps> = ({ code, theme, handleCodeChange }) => (
  <MonacoEditor
    width='100%'
    height='400'
    language='html'
    theme={theme}
    value={code}
    options={options}
    onChange={handleCodeChange}
  />
);

export default observer(Editor);
