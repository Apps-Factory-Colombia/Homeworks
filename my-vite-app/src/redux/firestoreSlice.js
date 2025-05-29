import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

// Async thunks para las operaciones de Firestore

// CREATE - Agregar un nuevo documento
export const addDocument = createAsyncThunk(
    'firestore/addDocument',
    async ({ collectionName, data }, { rejectWithValue }) => {
        try {
            const docRef = await addDoc(collection(db, collectionName), {
                ...data,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            });
            return {
                id: docRef.id,
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// READ - Obtener todos los documentos de una colección
export const getDocuments = createAsyncThunk(
    'firestore/getDocuments',
    async (collectionName, { rejectWithValue }) => {
        try {
            const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const documents = [];
            querySnapshot.forEach((doc) => {
                documents.push({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
                    updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null
                });
            });
            return documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// UPDATE - Actualizar un documento existente
export const updateDocument = createAsyncThunk(
    'firestore/updateDocument',
    async ({ collectionName, docId, data }, { rejectWithValue }) => {
        try {
            const docRef = doc(db, collectionName, docId);
            await updateDoc(docRef, {
                ...data,
                updatedAt: serverTimestamp()
            });
            return {
                id: docId,
                ...data,
                updatedAt: new Date().toISOString()
            };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// DELETE - Eliminar un documento
export const deleteDocument = createAsyncThunk(
    'firestore/deleteDocument',
    async ({ collectionName, docId }, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(db, collectionName, docId));
            return docId;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Slice de Firestore
const firestoreSlice = createSlice({
    name: 'firestore',
    initialState: {
        documents: [],
        isLoading: false,
        error: null,
        lastOperation: null
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearDocuments: (state) => {
            state.documents = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // Add Document
            .addCase(addDocument.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.lastOperation = 'adding';
            })
            .addCase(addDocument.fulfilled, (state, action) => {
                state.isLoading = false;
                state.documents.unshift(action.payload);
                state.error = null;
                state.lastOperation = 'added';
            })
            .addCase(addDocument.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.lastOperation = 'error';
            })
            // Get Documents
            .addCase(getDocuments.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.lastOperation = 'loading';
            })
            .addCase(getDocuments.fulfilled, (state, action) => {
                state.isLoading = false;
                state.documents = action.payload;
                state.error = null;
                state.lastOperation = 'loaded';
            })
            .addCase(getDocuments.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.lastOperation = 'error';
            })
            // Update Document
            .addCase(updateDocument.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.lastOperation = 'updating';
            })
            .addCase(updateDocument.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.documents.findIndex(doc => doc.id === action.payload.id);
                if (index !== -1) {
                    state.documents[index] = { ...state.documents[index], ...action.payload };
                }
                state.error = null;
                state.lastOperation = 'updated';
            })
            .addCase(updateDocument.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.lastOperation = 'error';
            })
            // Delete Document
            .addCase(deleteDocument.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.lastOperation = 'deleting';
            })
            .addCase(deleteDocument.fulfilled, (state, action) => {
                state.isLoading = false;
                state.documents = state.documents.filter(doc => doc.id !== action.payload);
                state.error = null;
                state.lastOperation = 'deleted';
            })
            .addCase(deleteDocument.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.lastOperation = 'error';
            });
    }
});

export const { clearError, clearDocuments } = firestoreSlice.actions;
export default firestoreSlice.reducer; 