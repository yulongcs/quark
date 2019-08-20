import { chux } from '../../util';
import { INITIAL_STATE, reducer } from './reducer';

const { Provider, store } = chux({ initialState: INITIAL_STATE, reducer });

export { Provider, store };
