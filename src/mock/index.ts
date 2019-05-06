import * as Mock from 'mockjs';

Mock.mock('http://g.cn', () => (
  {
    'list|8': [{
      name: '@city',
      'number|1-100': 100
    }]
  }
));
