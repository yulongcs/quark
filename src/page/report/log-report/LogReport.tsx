import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ListView, PullToRefresh } from 'antd-mobile';
import { Spin } from '@vdfor/react-component';
import styled from 'styled-components/macro';
import { ErrorPage } from '../../../component';
import {
  initAction, loadListAction, refreshAction, setPageStateAction
} from './action';
import { ListItem } from './views';
import { IListItemData } from './type';
import { IRootReducer } from '../../app/type';
import { PAGE_STATUS_ENUM, LOAD_ACTION_ENUM } from '../../../type';
import { ROUTE_WITH_NOT_TAB_BAR_HEIGHT, ROUTE_BG_COLOR } from '../../../constant';

const WrapperView = styled.div`
  height: ${ROUTE_WITH_NOT_TAB_BAR_HEIGHT};
`;

const ListBoxView = styled(ListView)`
  height: ${ROUTE_WITH_NOT_TAB_BAR_HEIGHT};
  background: ${ROUTE_BG_COLOR};

  .am-list-body {
    background-color: ${ROUTE_BG_COLOR};
    border-top: none;
    border-bottom: none;

    ::before {
      height: 0 !important;
    }
    ::after {
      height: 0 !important;
    }
  }
`;

const ListBoxFooterView = styled.div`
  text-align: center;
`;

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
    <WrapperView>
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
          <ListBoxView
            ref={listEle}
            initialListSize={data.length}
            dataSource={dataSource.cloneWithRows(data)}
            renderRow={(rowData: IListItemData) => <ListItem {...rowData} />}
            renderFooter={() => (<ListBoxFooterView>{(!hasMore && 'No More') || (loading ? 'loading...' : '')}</ListBoxFooterView>)}
            useBodyScroll={false}
            onEndReachedThreshold={10}
            scrollRenderAheadDistance={500}
            pageSize={4}
            onEndReached={loadMoreList}
          />
        </PullToRefresh>
      )) || (pageState === PAGE_STATUS_ENUM.ERROR ? <ErrorPage /> : <Spin />)}
    </WrapperView>
  );
};
