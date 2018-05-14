import * as React from 'react';
/* echarts start */
// 引入主模块
import * as echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/bar';
// 引入提示框组件
import 'echarts/lib/component/tooltip';
// 引入标题组件
import 'echarts/lib/component/title';
/* echarts end */

class EchartsComponent extends React.Component<{}, {}> {

  chart: any;

  refInit = (e: any) => {
    if (!this.chart) {
      this.chart = echarts.init(e);
    }
  }

  chartRender = () => {
    if (this.chart) {
      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }
  }

  componentDidMount() {
    this.chartRender();
  }

  render() {
    return (
      <div style={{ width: '500px', height: '500px' }} ref={this.refInit} />
    );
  }
}

export default EchartsComponent;
