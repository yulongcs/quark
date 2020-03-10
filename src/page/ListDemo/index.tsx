import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createSelector } from 'reselect';
import { Tabs, ListView, PullToRefresh } from 'antd-mobile';
import { LoadActionEnum } from '@vdfor/util';
import { Spin } from '@vdfor/react-component';
import { IRootReducer, listDemoAction, LIST_DEMO_CONSTANT, IListDemoListDataItem, APP_CONSTANT } from '@/store';
import { MobileWrapper, ListWrapper } from '@/component';
import { requestAbort, pxTransform } from '@/util';
import styles from './index.scss';

const tabList = [
  { title: '全部', key: '0' },
  { title: '分类', key: '1' },
  { title: '错误', key: '2' },
  { title: '无数据', key: '3' },
];

const dataSource = new ListView.DataSource({
  rowHasChanged: (row1: any, row2: any) => row1.id !== row2.id,
});

const renderListRow = (item: IListDemoListDataItem) => (
  <div key={item.id} className={styles.listItem}>
    <div className={`v-styled-center ${styles.listItemImgWrap}`}>
      <img alt="avatar" className={styles.listItemImg} src={item.imgUrl} />
    </div>
    <div className={styles.listItemContent}>
      <div className={styles.listItemContentTitle}>{item.title}</div>
      <div className={`v-styled-line-clamp ${styles.listItemContentText}`}>{item.text}</div>
    </div>
  </div>
);

const renderListFooter = () => (
  <div className={styles.listLoadingWrap}>
    <Spin />
  </div>
);

const selectDisplay = createSelector(
  (state: IRootReducer) => state[APP_CONSTANT.ID].routeState,
  (state: IRootReducer) => state[LIST_DEMO_CONSTANT.ID],
  ({ uiStatus }, { listState }) => ({ listState, uiStatus }),
);

export default () => {
  const [currentTab, setCurrentTab] = useState('0');
  const {
    uiStatus,
    listState: { data, hasMore, status: listStatus, loadMoreLoading, refreshLoading },
  } = useSelector(selectDisplay);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listDemoAction.init());
  }, [dispatch]);

  const onTabChange = ({ key }: any) => {
    if (key === currentTab) {
      return;
    }
    requestAbort(LIST_DEMO_CONSTANT.LOAD_LIST_REQUEST_TASK_KEY);
    setCurrentTab(key);
    dispatch(listDemoAction.loadList(LoadActionEnum.RESET, (key === '2' && 'error') || (key === '3' ? 'empty' : '')));
  };

  const onEndReached = () => {
    // 触底加载更多
    if (!hasMore) {
      return;
    }
    dispatch(listDemoAction.loadList(LoadActionEnum.LOADMORE));
  };

  const onPullRefresh = async () => {
    // 下拉刷新 - 下拉刷新时整个页面处于不可操作状态
    await dispatch(listDemoAction.loadList(LoadActionEnum.REFRESH));
    // stopPullDownRefresh();
  };

  return (
    <MobileWrapper uiStatus={uiStatus}>
      <div className={styles.wrap}>
        <Tabs initialPage={currentTab} onChange={onTabChange} tabs={tabList} swipeable={false}>
          {tabList.map(tab => (
            <div key={tab.key}>
              {currentTab === tab.key && (
                <ListWrapper style={{ minHeight: `calc(100vh - ${pxTransform(90)})` }} uiStatus={listStatus}>
                  <ListView
                    useBodyScroll
                    dataSource={dataSource.cloneWithRows(data)}
                    onEndReached={onEndReached}
                    className={styles.list}
                    renderRow={renderListRow}
                    renderFooter={loadMoreLoading ? renderListFooter : undefined}
                    pullToRefresh={
                      <PullToRefresh
                        getScrollContainer={undefined as any}
                        refreshing={refreshLoading}
                        onRefresh={onPullRefresh}
                        direction="down"
                        distanceToRefresh={25}
                        indicator={undefined as any}
                        damping={100}
                      />
                    }
                  />
                </ListWrapper>
              )}
            </div>
          ))}
        </Tabs>
      </div>
    </MobileWrapper>
  );
};
