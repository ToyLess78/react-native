import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Inspiration } from '../types';
import { addInspiration, getInspirations, updateInspiration, deleteInspiration, initDb } from './dbUtils';

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

export const modifyInspiration = createAsyncThunk(
    'inspirations/modifyInspiration',
    async (inspiration: Inspiration) => {
        await updateInspiration(inspiration.id!, inspiration);
        return inspiration;
    }
);

export const removeInspiration = createAsyncThunk(
    'inspirations/removeInspiration',
    async (id: number) => {
        await deleteInspiration(id);
        return id;
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
            })
            .addCase(modifyInspiration.fulfilled, (state, action: PayloadAction<Inspiration>) => {
                const index = state.inspirations.findIndex(insp => insp.id === action.payload.id);
                if (index !== -1) {
                    state.inspirations[index] = action.payload;
                }
            })
            .addCase(removeInspiration.fulfilled, (state, action: PayloadAction<number>) => {
                state.inspirations = state.inspirations.filter(insp => insp.id !== action.payload);
            });
    },
});

export default inspirationSlice.reducer;