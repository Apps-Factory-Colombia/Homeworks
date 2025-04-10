import { createSlice } from '@reduxjs/toolkit';

export const stackSlice = createSlice({
    name: 'stack',
    initialState: [],
    reducers: {
        push: (state, action) => { state.push(action.payload); },
        pop: (state) => { state.pop(); }
    }
});

export const { push, pop } = stackSlice.actions;
export default stackSlice.reducer;
