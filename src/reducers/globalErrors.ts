const GLOBAL_ERROR_MAX_COUNT = 5;
const GLOBAL_ERROR_ADD = 'GLOBAL_ERROR_ADD';
const GLOBAL_ERROR_DELETE = 'GLOBAL_ERROR_DELETE';

const initialState = new Set<string>();

type ActionType =
  | { type: typeof GLOBAL_ERROR_ADD; payload: string }
  | { type: typeof GLOBAL_ERROR_DELETE; payload: string };

export const addGlobalError = (message: string) => ({ type: GLOBAL_ERROR_ADD, payload: message });

export const deleteGlobalError = (message: string) => ({
  type: GLOBAL_ERROR_DELETE,
  payload: message,
});

export default function globalErrors(state = initialState, { type, payload }: ActionType) {
  if (type === GLOBAL_ERROR_ADD) {
    const { size } = state;

    if (size < GLOBAL_ERROR_MAX_COUNT && state.add(payload).size !== size) return new Set(state);
  }

  if (type === GLOBAL_ERROR_DELETE) {
    if (state.delete(payload)) return new Set(state);
  }

  return state;
}
