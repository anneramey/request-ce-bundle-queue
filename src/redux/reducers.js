import errorsReducer from './modules/errors';
import { reducer as layout } from './modules/layout';
import { reducer as app } from './modules/app';
import submissionsReducer from './modules/submissions';

export default {
  errors: errorsReducer,
  app,
  layout,
  submissions: submissionsReducer,
};
