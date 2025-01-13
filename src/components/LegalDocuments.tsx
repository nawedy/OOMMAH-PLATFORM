import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '@/components/ui/button';

export default function LegalDocuments() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.content}>
          1. Information We Collect
          
          We collect information you provide directly to us, such as when you create or modify your account, request on-demand services, contact customer support, or otherwise communicate with us...

          2. How We Use Your Information
          
          We may use the information we collect about you to:
          • Provide, maintain, and improve our Services
          • Process and complete transactions, and send you related information...

          3. Sharing of Information
          
          We may share the information we collect about you as described in this Privacy Policy or as described at the time of collection or sharing, including as follows...
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>Community Guidelines</Text>
        <Text style={styles.content}>
          1. Respect Other Users
          
          Treat others with respect. Do not engage in hate speech, bullying, harassment, or any form of abusive behavior...

          2. Post Appropriate Content
          
          Do not post content that is illegal, explicit, or violates others' intellectual property rights...

          3. Protect Your Privacy and Others'
          
          Do not share personal information about yourself or others without consent...

          4. No Spam or Commercial Solicitation
          
          Do not use our platform for unsolicited advertising or promotion...

          5. Report Violations
          
          If you see content that violates these guidelines, please report it...
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
});

