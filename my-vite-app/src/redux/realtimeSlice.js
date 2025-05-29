import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    ref,
    push,
    onValue,
    off,
    serverTimestamp,
    query,
    orderByChild,
    limitToLast
} from 'firebase/database';
import { realtimeDb } from '../firebase/config';

// Async thunks para las operaciones de Realtime Database

// Enviar un nuevo mensaje
export const sendMessage = createAsyncThunk(
    'realtime/sendMessage',
    async ({ message, userName, userEmail }, { rejectWithValue }) => {
        try {
            const messagesRef = ref(realtimeDb, 'messages');
            const newMessage = {
                text: message,
                userName: userName || 'Usuario Anónimo',
                userEmail: userEmail || 'no-email',
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            };

            await push(messagesRef, newMessage);
            return newMessage;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Configurar listener para mensajes en tiempo real
export const setupRealtimeListener = createAsyncThunk(
    'realtime/setupListener',
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const messagesRef = ref(realtimeDb, 'messages');
            const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(50));

            const unsubscribe = onValue(messagesQuery, (snapshot) => {
                const messages = [];
                snapshot.forEach((childSnapshot) => {
                    const messageData = childSnapshot.val();
                    messages.push({
                        id: childSnapshot.key,
                        ...messageData,
                        timestamp: messageData.timestamp || messageData.createdAt
                    });
                });

                // Ordenar por timestamp para mostrar más recientes al final
                messages.sort((a, b) => {
                    const timeA = new Date(a.timestamp || a.createdAt).getTime();
                    const timeB = new Date(b.timestamp || b.createdAt).getTime();
                    return timeA - timeB;
                });

                dispatch(setMessages(messages));
            }, (error) => {
                dispatch(setError(error.message));
            });

            return unsubscribe;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Desconectar listener
export const disconnectListener = createAsyncThunk(
    'realtime/disconnect',
    async (_, { getState }) => {
        const { realtime } = getState();
        if (realtime.unsubscribe) {
            const messagesRef = ref(realtimeDb, 'messages');
            off(messagesRef);
        }
        return null;
    }
);

// Slice de Realtime Database
const realtimeSlice = createSlice({
    name: 'realtime',
    initialState: {
        messages: [],
        isLoading: false,
        isSending: false,
        isConnected: false,
        error: null,
        unsubscribe: null,
        lastMessageSent: null
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload;
            state.isLoading = false;
        },
        setError: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
            state.isSending = false;
        },
        clearError: (state) => {
            state.error = null;
        },
        setConnected: (state, action) => {
            state.isConnected = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Send Message
            .addCase(sendMessage.pending, (state) => {
                state.isSending = true;
                state.error = null;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.isSending = false;
                state.lastMessageSent = action.payload;
                state.error = null;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.isSending = false;
                state.error = action.payload;
            })
            // Setup Listener
            .addCase(setupRealtimeListener.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(setupRealtimeListener.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isConnected = true;
                state.unsubscribe = action.payload;
                state.error = null;
            })
            .addCase(setupRealtimeListener.rejected, (state, action) => {
                state.isLoading = false;
                state.isConnected = false;
                state.error = action.payload;
            })
            // Disconnect
            .addCase(disconnectListener.fulfilled, (state) => {
                state.isConnected = false;
                state.unsubscribe = null;
                state.messages = [];
            });
    }
});

export const { setMessages, setError, clearError, setConnected, clearMessages } = realtimeSlice.actions;
export default realtimeSlice.reducer; 