import { addGlobalError } from '../reducers/globalErrors';

const errorBoundary = () => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    return next(addGlobalError(error.message));
  }
};

export default errorBoundary;
