import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView } from 'antd-mobile';
import { Spin } from '@vdfor/react-component';
import { initAction, loadListAction } from './action';
import { ListItem } from './views';
import { IListData } from './type';
import { IRootReducer } from '../App/type';
import { PAGE_STATUS_ENUM, LOAD_ACTION_ENUM } from '../../types';
import styles from './index.module.scss';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1: any, row2: any) => row1 !== row2
});

export default () => {
  const { pageInfo: { pageState }, listInfo: { data } } = useSelector((state: IRootReducer) => state.listPageReducer);
  const dispatch = useDispatch();

  const loadMoreList = () => dispatch(loadListAction(LOAD_ACTION_ENUM.LOADMORE));

  useEffect(() => {
    dispatch(initAction());
  }, [dispatch]);

  return pageState === PAGE_STATUS_ENUM.CONTENT ? (
    <ListView
      className={styles.listBox}
      dataSource={dataSource.cloneWithRows(data)}
      renderRow={(rowData: IListData) => <ListItem {...rowData} />}
      useBodyScroll
      onEndReachedThreshold={10}
      pageSize={4}
      onEndReached={loadMoreList}
    />
  ) : <Spin style={{ height: '100vh' }} />;
};
