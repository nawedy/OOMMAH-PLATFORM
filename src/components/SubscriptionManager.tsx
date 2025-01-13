import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from '@/components/ui/button';
import { useSelector, useDispatch } from 'react-redux';
import { upgradeToPremium, cancelPremium } from '../store/subscriptionSlice';
import { RootState } from '../store';

export default function SubscriptionManager() {
  const dispatch = useDispatch();
  const isPremium = useSelector((state: RootState) => state.subscription.isPremium);

  const handleUpgrade = () => {
    dispatch(upgradeToPremium());
  };

  const handleCancel = () => {
    dispatch(cancelPremium());
  };

  return (
    <View style={styles.container}>
      {isPremium ? (
        <>
          <Text>You are a premium member!</Text>
          <Button onPress={handleCancel}>Cancel Premium</Button>
        </>
      ) : (
        <>
          <Text>Upgrade to Premium for exclusive features!</Text>
          <Button onPress={handleUpgrade}>Upgrade to Premium</Button>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
});

