import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Button, Text, Input } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMessages, sendMessage } from '../store/chatSlice';
import { RootState } from '../store';
import { Audio } from 'expo-av';
import * as VideoThumbnails from 'expo-video-thumbnails';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen({ route }) {
  const { chatId } = route.params;
  const dispatch = useDispatch();
  const messages = useSelector((state: RootState) => state.chat.messages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  useEffect(() => {
    dispatch(fetchMessages(chatId));
  }, [dispatch, chatId]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      dispatch(sendMessage({ chatId, content: newMessage }));
      setNewMessage('');
    }
  };

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') return;

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const newRecording = new Audio.Recording();
      await newRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await newRecording.startAsync();
      setRecording(newRecording);
      setIsRecording(true);
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;

    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      if (uri) {
        dispatch(sendMessage({ chatId, content: uri, type: 'audio' }));
      }
    } catch (error) {
      console.error('Failed to stop recording', error);
    }

    setRecording(null);
    setIsRecording(false);
  };

  const handleFileUpload = async () => {
    // Implement file upload logic here
  };

  const startVideoCall = () => {
    // Implement video call logic here
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({ item }) => <Text>{item.content}</Text>}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <Input
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
        />
        <Button onPress={handleSendMessage}>Send</Button>
        <Button onPress={isRecording ? stopRecording : startRecording}>
          <Ionicons name={isRecording ? 'stop' : 'mic'} size={24} color="white" />
        </Button>
        <Button onPress={handleFileUpload}>
          <Ionicons name="attach" size={24} color="white" />
        </Button>
        <Button onPress={startVideoCall}>
          <Ionicons name="videocam" size={24} color="white" />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
});

