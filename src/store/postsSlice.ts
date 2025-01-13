import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { Post } from '@prisma/client'

interface PostsState {
  items: Post[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: PostsState = {
  items: [],
  status: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await fetch('/api/posts')
  if (!response.ok) {
    throw new Error('Failed to fetch posts')
  }
  return response.json()
})

export const addPost = createAsyncThunk('posts/addPost', async (postData: Partial<Post>) => {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  })
  if (!response.ok) {
    throw new Error('Failed to add post')
  }
  return response.json()
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to fetch posts'
      })
      .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
        state.items.push(action.payload)
      })
  },
})

export default postsSlice.reducer

