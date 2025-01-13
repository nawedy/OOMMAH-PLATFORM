import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPersonalizedRecommendations } from '../services/recommendationService';

export const fetchPersonalizedRecommendations = createAsyncThunk(
  'recommendations/fetchPersonalized',
  async (_, { rejectWithValue }) => {
    try {
      const recommendations = await getPersonalizedRecommendations();
      return recommendations;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPersonalizedRecommendations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalizedRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPersonalizedRecommendations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default recommendationsSlice.reducer;

