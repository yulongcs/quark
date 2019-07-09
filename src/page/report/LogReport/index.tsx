import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView, PullToRefresh } from 'antd-mobile';
import { Spin } from '@vdfor/react-component';
import { ErrorPage } from '../../../components';
import {
  initAction, loadListAction, refreshAction, setPageStateAction
} from './action';
import { ListItem } from './views';
import { IListItemData } from './type';
import { IRootReducer } from '../../App/type';
import { PAGE_STATUS_ENUM, LOAD_ACTION_ENUM } from '../../../types';
import styles from './index.module.scss';

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1: any, row2: any) => row1 !== row2
});

export default () => {
  const listEle = useRef(null);
  const {
    pageInfo: { pageState, scrollTop }, listInfo: {
      data, loading, hasMore
    }
  } = useSelector((state: IRootReducer) => state.logReportPageReducer);
  const dispatch = useDispatch();

  const loadMoreList = () => dispatch(loadListAction(LOAD_ACTION_ENUM.LOADMORE));
  const refreshPage = () => dispatch(refreshAction());

  useEffect(() => {
    dispatch(initAction());
    if (listEle && listEle.current) {
      (listEle.current as any).getInnerViewNode().parentNode.scrollTop = scrollTop;
    }
    return () => {
      // eslint-disable-next-line
      dispatch(setPageStateAction({ scrollTop: (listEle.current && (listEle.current as any).getInnerViewNode().parentNode.scrollTop) || 0 }));
    };
  }, [dispatch, scrollTop]);

  return (
    <div className={styles.container}>
      {((pageState === PAGE_STATUS_ENUM.CONTENT || pageState === PAGE_STATUS_ENUM.REFRESH) && (
        <PullToRefresh
          direction="down"
          distanceToRefresh={25}
          getScrollContainer={undefined as any}
          indicator={{}}
          refreshing={pageState === PAGE_STATUS_ENUM.REFRESH}
          damping={60}
          onRefresh={refreshPage}
        >
          <ListView
            ref={listEle}
            initialListSize={data.length}
            className={styles.listBox}
            dataSource={dataSource.cloneWithRows(data)}
            renderRow={(rowData: IListItemData) => <ListItem {...rowData} />}
            renderFooter={() => (<div className={styles.listLoading}>{(!hasMore && 'No More') || (loading ? 'loading...' : '')}</div>)}
            useBodyScroll={false}
            onEndReachedThreshold={10}
            scrollRenderAheadDistance={500}
            pageSize={4}
            onEndReached={loadMoreList}
          />
        </PullToRefresh>
      )) || (pageState === PAGE_STATUS_ENUM.ERROR ? <ErrorPage /> : <Spin />)}
    </div>
  );
};
