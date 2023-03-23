import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic, rootReducer } from './modules';

const epicMiddleware = createEpicMiddleware();

export default function root() {

    const store = configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
        devTools: process.env.NODE_ENV !== 'production',
    })

    epicMiddleware.run(rootEpic);

    return store;
}
