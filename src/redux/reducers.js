import errorsReducer from './modules/errors';
import { reducer as layout } from './modules/layout';
import { reducer as app } from './modules/app';
import { reducer as queue } from './modules/queue';
import submissionsReducer from './modules/submissions';

export default {
  errors: errorsReducer,
  app,
  layout,
  queue,
  submissions: submissionsReducer,
};
