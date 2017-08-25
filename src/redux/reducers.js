import errorsReducer from './modules/errors';
import { reducer as layoutReducer } from './modules/layout';
import submissionsReducer from './modules/submissions';

export default {
  errors: errorsReducer,
  layout: layoutReducer,
  submissions: submissionsReducer,
};
