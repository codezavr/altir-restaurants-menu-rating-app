import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { rootReducer } from './rootReducer';
import { loadState, saveState } from './localStorage';

const preloadedState = loadState();

export const store = configureStore({
    reducer: rootReducer,
    preloadedState
});

store.subscribe(() => {
    saveState({
        restaurants: store.getState().restaurants
    });
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
