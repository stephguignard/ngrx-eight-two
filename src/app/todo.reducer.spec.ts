import { ToDoReducer, initialState } from './todo.reducer';

describe('Todo Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = ToDoReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
