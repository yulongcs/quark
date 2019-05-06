import Toast from './index';

it('[Toast] renders without crashing', () => {
  Toast.info('toast info');
  Toast.success('success info');
  Toast.fail('fail info');
});
