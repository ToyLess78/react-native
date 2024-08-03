import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Inspiration } from '../types';
import { addInspiration, getInspirations, initDb } from './dbUtils';


interface InspirationState {
    inspirations: Inspiration[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: InspirationState = {
    inspirations: [],
    status: 'idle',
    error: null,
};

export const fetchInspirations = createAsyncThunk('inspirations/fetchInspirations', async () => {
    await initDb();
    return await getInspirations();
});

export const createInspiration = createAsyncThunk(
    'inspirations/createInspiration',
    async (inspiration: Inspiration) => {
        await addInspiration(inspiration);
        return inspiration;
    }
);

const inspirationSlice = createSlice({
    name: 'inspirations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInspirations.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchInspirations.fulfilled, (state, action: PayloadAction<Inspiration[]>) => {
                state.status = 'succeeded';
                state.inspirations = action.payload;
            })
            .addCase(fetchInspirations.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch inspirations';
            })
            .addCase(createInspiration.fulfilled, (state, action: PayloadAction<Inspiration>) => {
                state.inspirations.push(action.payload);
            });
    },
});

export default inspirationSlice.reducer;
