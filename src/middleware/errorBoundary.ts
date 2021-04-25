import { Action, Middleware, Dispatch } from 'redux';
import { addGlobalError } from '../reducers/globalErrors';

const errorBoundary: Middleware = () => (next: Dispatch) => (action: Action) => {
  try {
    return next(action);
  } catch (error) {
    return next(addGlobalError(error.message));
  }
};

export default errorBoundary;
