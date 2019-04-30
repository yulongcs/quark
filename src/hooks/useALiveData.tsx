import { useContext, useEffect } from 'react';
import { SET_ALIVE_DATA } from '../components/AliveComponent/constant';
import AliveContext from '../components/AliveComponent/context';
import { IAliveDataValue } from '../components/AliveComponent/reducer';

interface IProps {
  id: string;
  value: IAliveDataValue;
}

export default ({ id, value }: IProps) => {
  const { state, dispatch } = useContext(AliveContext);

  useEffect(() => () => {
    dispatch({ // set aliveData when componentWIllUnmount
      type: SET_ALIVE_DATA,
      aliveData: {
        key: id,
        value
      }
    });
  }, [value, dispatch, id]);

  return state[id];
};
