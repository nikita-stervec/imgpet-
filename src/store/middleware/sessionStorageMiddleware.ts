import { Middleware } from 'redux';
import { AnyAction } from '@reduxjs/toolkit';

const sessionStorageMiddleware: Middleware = (store) => (next) => (action: AnyAction) => {
  const result = next(action);

  if (action.type.startsWith('user/')) {
    const userState = store.getState().user;
    try {
      const serializedState = JSON.stringify(userState);
      sessionStorage.setItem("authState", serializedState);
    } catch (e) {
      console.error(e);
    }
  }

  return result;
};

export default sessionStorageMiddleware;
