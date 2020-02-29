import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, ListView, PullToRefresh } from 'antd-mobile';
import { LoadActionEnum } from '@vdfor/util';
import { Spin } from '@vdfor/react-component';
import { IRootReducer } from '@/types';
import { MobileWrapper, ListWrapper } from '@/components';
import { requestAbort, pxTransform } from '@/utils';
import { PAGE_REDUCER_NAME, LOAD_LIST_REQUEST_TASK_KEY } from './constants';
import { initAction, loadListAction } from './actions';
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

const Index = () => {
  const [currentTab, setCurrentTab] = useState('0');

  const {
    uiState: { status: uiStatus },
    listState: {
      data,
      hasMore,
      status: listStatus,
      loadMoreLoading,
      refreshLoading,
    },
  } = useSelector((state: IRootReducer) => state[PAGE_REDUCER_NAME]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initAction());
  }, [dispatch]);

  const onTabChange = ({ key }: any) => {
    if (key === currentTab) {
      return;
    }
    requestAbort(LOAD_LIST_REQUEST_TASK_KEY);
    setCurrentTab(key);
    dispatch(
      loadListAction(
        LoadActionEnum.RESET,
        (key === '2' && 'error') || (key === '3' ? 'empty' : ''),
      ),
    );
  };

  const onEndReached = () => {
    // 触底加载更多
    if (!hasMore) {
      return;
    }
    dispatch(loadListAction(LoadActionEnum.LOADMORE));
  };

  const onPullRefresh = async () => {
    // 下拉刷新 - 下拉刷新时整个页面处于不可操作状态
    await dispatch(loadListAction(LoadActionEnum.REFRESH));
    // stopPullDownRefresh();
  };

  return (
    <MobileWrapper uiStatus={uiStatus}>
      <div className={styles.wrap}>
        <Tabs
          initialPage={currentTab}
          onChange={onTabChange}
          tabs={tabList}
          swipeable={false}
        >
          {tabList.map((tab) => (
            <div key={tab.key}>
              {currentTab === tab.key && (
                <ListWrapper
                  style={{ height: `calc(100vh - ${pxTransform(90)})` }}
                  uiStatus={listStatus}
                >
                  <ListView
                    useBodyScroll
                    dataSource={dataSource.cloneWithRows(data)}
                    onEndReached={onEndReached}
                    className={styles.list}
                    renderRow={(item) => (
                      <div key={item.id} className={styles.listItem}>
                        <div
                          className={`v-styled-center ${styles.listItemImgWrap}`}
                        >
                          <img
                            alt="avatar"
                            className={styles.listItemImg}
                            src={item.imgUrl}
                          />
                        </div>
                        <div className={styles.listItemContent}>
                          <div className={styles.listItemContentTitle}>
                            {item.title}
                          </div>
                          <div
                            className={`v-styled-line-clamp ${styles.listItemContentText}`}
                          >
                            {item.text}
                          </div>
                        </div>
                      </div>
                    )}
                    renderFooter={() => (loadMoreLoading ? (
                      <div className={styles.listLoadingWrap}>
                        <Spin />
                      </div>
                    ) : (
                      <></>
                    ))}
                    pullToRefresh={(
                      <PullToRefresh
                        getScrollContainer={undefined as any}
                        refreshing={refreshLoading}
                        onRefresh={onPullRefresh}
                        direction="down"
                        distanceToRefresh={25}
                        indicator={undefined as any}
                        damping={100}
                      />
                    )}
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

export default Index;
