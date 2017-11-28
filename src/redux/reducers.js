import errorsReducer from './modules/errors';
import { reducer as layout } from './modules/layout';
import { reducer as app } from './modules/app';
import { reducer as queue } from './modules/queue';
import { reducer as filterMenu } from './modules/filterMenu';
import { reducer as alerts } from './modules/alerts';
import { reducer as modalForm } from './modules/modalForm';
import { reducer as discussions } from './modules/discussions';
import { reducer as kinops } from '../lib/react-kinops-components';
import { reducer as workMenu } from './modules/workMenu';

export default {
  errors: errorsReducer,
  app,
  layout,
  queue,
  filterMenu,
  alerts,
  modalForm,
  discussions,
  kinops,
  workMenu,
};
