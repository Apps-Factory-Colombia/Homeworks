import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import firestoreReducer from './firestoreSlice';
import realtimeReducer from './realtimeSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        firestore: firestoreReducer,
        realtime: realtimeReducer,
    },
});

export default store; 