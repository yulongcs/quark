import { Form, Select } from 'antd';
import { observer } from 'mobx-react';
import * as React from 'react';
import { MONACO_LANGUAGES, MONACO_THEMES } from '../../../../common/constants';
import { IHeaderProps } from '../types';

const Header: React.SFC<IHeaderProps> = ({ handleSelectChange, theme, language }) => (
  <Form layout='inline' style={{ marginBottom: '16px' }}>
    <Form.Item label='语言' colon={false}>
      <Select
        placeholder='请选择语言'
        style={{ width: '120px' }}
        value={language}
        onChange={handleSelectChange('language')}
      >
        {MONACO_LANGUAGES.map(i => <Select.Option value={i.value} key={i.value}>{i.label}</Select.Option>)}
      </Select>
    </Form.Item>
    <Form.Item label='主题' colon={false}>
      <Select
        placeholder='请选择主题'
        style={{ width: '240px' }}
        value={theme}
        onChange={handleSelectChange('theme')}
      >
        {MONACO_THEMES.map(i => <Select.Option value={i.value} key={i.value}>{i.label}</Select.Option>)}
      </Select>
    </Form.Item>
  </Form>
);

export default observer(Header);
