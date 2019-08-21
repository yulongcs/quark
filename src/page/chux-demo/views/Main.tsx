import React, { memo, useEffect } from 'react';
import { Button } from 'antd-mobile';
import { store } from '../store';
import { changeValueAction } from '../action';

export default memo(() => {
  const { value } = store.useContext();

  useEffect(() => {
    changeValueAction();
    return () => {
      store.cleanup();
    };
  }, []);

  return (
    <section>
      <p>{value}</p>
      <Button type="primary" onClick={changeValueAction}>Change Value</Button>
    </section>
  );
});
