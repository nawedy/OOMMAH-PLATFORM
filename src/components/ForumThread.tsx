import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Text, Button, Input } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchThreadPosts, addPost } from '../store/forumSlice';
import { RootState } from '../store';

export default function ForumThread({ threadId }) {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.forum.threads[threadId]?.posts || []);
  const [newPost, setNewPost] = useState('');

  React.useEffect(() => {
    dispatch(fetchThreadPosts(threadId));
  }, [dispatch, threadId]);

  const handleAddPost = () => {
    if (newPost.trim()) {
      dispatch(addPost({ threadId, content: newPost }));
      setNewPost('');
    }
  };

  const renderPost = ({ item }) => (
    <View style={styles.postItem}>
      <Text>{item.author.name}</Text>
      <Text>{item.content}</Text>
      <Text>{new Date(item.createdAt).toLocaleString()}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <Input
          value={newPost}
          onChangeText={setNewPost}
          placeholder="Write a post..."
        />
        <Button onPress={handleAddPost}>Post</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});

