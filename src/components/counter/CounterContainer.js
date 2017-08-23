import { connect } from 'react-redux';
import { actions } from '../../redux/modules/counter';
import { Counter } from './Counter';

export const stateMapper = state => ({
  counter: state.counter,
});

export const dispatchMapper = {
  inc: actions.incrementCounter,
  dec: actions.decrementCounter,
  double: actions.doubleCounter,
};

export const CounterContainer = connect(stateMapper, dispatchMapper)(Counter);
