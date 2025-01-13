import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Input, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { searchPosts } from '../store/postsSlice';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AdvancedSearch() {
  const dispatch = useDispatch();
  const [keywords, setKeywords] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [location, setLocation] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [sortBy, setSortBy] = useState('recent');
  const [category, setCategory] = useState('all');

  const handleSearch = () => {
    dispatch(searchPosts({
      keywords,
      hashtags: hashtags.split(',').map(tag => tag.trim()),
      location,
      dateRange: { start: startDate, end: endDate },
      sortBy,
      category
    }));
  };

  return (
    <View style={styles.container}>
      <Input
        value={keywords}
        onChangeText={setKeywords}
        placeholder="Enter keywords"
      />
      <Input
        value={hashtags}
        onChangeText={setHashtags}
        placeholder="Enter hashtags (comma-separated)"
      />
      <Input
        value={location}
        onChangeText={setLocation}
        placeholder="Enter location"
      />
      <View style={styles.dateContainer}>
        <Text>Start Date:</Text>
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setStartDate(selectedDate || startDate)}
        />
      </View>
      <View style={styles.dateContainer}>
        <Text>End Date:</Text>
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => setEndDate(selectedDate || endDate)}
        />
      </View>
      <Select onValueChange={setSortBy} defaultValue={sortBy}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="popular">Most Popular</SelectItem>
          <SelectItem value="relevant">Most Relevant</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={setCategory} defaultValue={category}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="technology">Technology</SelectItem>
          <SelectItem value="lifestyle">Lifestyle</SelectItem>
          <SelectItem value="travel">Travel</SelectItem>
          <SelectItem value="food">Food</SelectItem>
        </SelectContent>
      </Select>
      <Button onPress={handleSearch}>Search</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

