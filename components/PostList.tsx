import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '@/store'
import { fetchPosts } from '@/store/postsSlice'

export function PostList() {
  const dispatch = useDispatch()
  const posts = useSelector((state: RootState) => state.posts.items)
  const status = useSelector((state: RootState) => state.posts.status)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [status, dispatch])

  // Render posts...
}

