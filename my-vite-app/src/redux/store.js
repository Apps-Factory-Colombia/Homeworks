import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import firestoreReducer from './firestoreSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        firestore: firestoreReducer,
    },
});

export default store; 