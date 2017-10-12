import errorsReducer from './modules/errors';
import { reducer as layout } from './modules/layout';
import { reducer as app } from './modules/app';
import { reducer as queue } from './modules/queue';
import { reducer as filterMenu } from './modules/filterMenu';
import { reducer as alerts } from './modules/alerts';
import { reducer as modalForm } from './modules/modalForm';

export default {
  errors: errorsReducer,
  app,
  layout,
  queue,
  filterMenu,
  alerts,
  modalForm
};
