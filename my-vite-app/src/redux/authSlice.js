import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase/config';

// Async thunks para las operaciones de autenticación

// Login con email y contraseña
export const loginWithEmail = createAsyncThunk(
    'auth/loginWithEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Registro con email y contraseña
export const registerWithEmail = createAsyncThunk(
    'auth/registerWithEmail',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Login con Google
export const loginWithGoogle = createAsyncThunk(
    'auth/loginWithGoogle',
    async (_, { rejectWithValue }) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            return {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Logout
export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            await signOut(auth);
            return null;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
        isAuthenticated: false
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.isLoading = false;
        }
    },
    extraReducers: (builder) => {
        builder
            // Login con email
            .addCase(loginWithEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginWithEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginWithEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // Registro con email
            .addCase(registerWithEmail.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerWithEmail.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(registerWithEmail.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // Login con Google
            .addCase(loginWithGoogle.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
                state.error = null;
            })
            .addCase(loginWithGoogle.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.isAuthenticated = false;
            })
            // Logout
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
                state.error = null;
            })
            .addCase(logout.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { clearError, setUser } = authSlice.actions;
export default authSlice.reducer; 