import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchGroups = createAsyncThunk(
  'groups/fetchGroups',
  async () => {
    const response = await fetch('/api/groups');
    if (!response.ok) {
      throw new Error('Failed to fetch groups');
    }
    return response.json();
  }
);

export const joinGroup = createAsyncThunk(
  'groups/joinGroup',
  async (groupId: string) => {
    const response = await fetch(`/api/groups/${groupId}/join`, { method: 'POST' });
    if (!response.ok) {
      throw new Error('Failed to join group');
    }
    return response.json();
  }
);

interface GroupsState {
  items: any[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: GroupsState = {
  items: [],
  status: 'idle',
  error: null,
};

const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        const index = state.items.findIndex(group => group.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      });
  },
});

export default groupsSlice.reducer;

