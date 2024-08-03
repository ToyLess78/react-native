import { configureStore } from '@reduxjs/toolkit';
import inspirationReducer from './inspirationSlice';

const store = configureStore({
    reducer: {
        inspirations: inspirationReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
