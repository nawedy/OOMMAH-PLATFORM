import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GroupChatState {
  groups: { [id: string]: string[] };
}

const initialState: GroupChatState = {
  groups: {},
};

const groupChatSlice = createSlice({
  name: 'groupChat',
  initialState,
  reducers: {
    createGroup: (state, action: PayloadAction<string>) => {
      const groupId = Date.now().toString();
      state.groups[groupId] = [];
    },
    addUserToGroup: (state, action: PayloadAction<{ groupId: string; userId: string }>) => {
      const { groupId, userId } = action.payload;
      if (state.groups[groupId]) {
        state.groups[groupId].push(userId);
      }
    },
    removeUserFromGroup: (state, action: PayloadAction<{ groupId: string; userId: string }>) => {
      const { groupId, userId } = action.payload;
      if (state.groups[groupId]) {
        state.groups[groupId] = state.groups[groupId].filter(id => id !== userId);
      }
    },
  },
});

export const { createGroup, addUserToGroup, removeUserFromGroup } = groupChatSlice.actions;
export default groupChatSlice.reducer;

