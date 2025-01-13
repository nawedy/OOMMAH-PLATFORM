import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/button';

export default function UserGuide() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Guide</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Getting Started</Text>
        <Text>1. Create an account</Text>
        <Text>2. Set up your profile</Text>
        <Text>3. Explore the platform</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Using the Chat Feature</Text>
        <Text>1. Start a new conversation</Text>
        <Text>2. Send messages, images, and files</Text>
        <Text>3. Create group chats</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Marketplace</Text>
        <Text>1. List a product for sale</Text>
        <Text>2. Browse and purchase items</Text>
        <Text>3. Manage your orders</Text>
      </View>

      <Text style={styles.title}>FAQs</Text>

      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>How do I reset my password?</AccordionTrigger>
          <AccordionContent>
            To reset your password, go to the login page and click on "Forgot Password". Follow the instructions sent to your email to create a new password.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger>How can I report inappropriate content?</AccordionTrigger>
          <AccordionContent>
            You can report inappropriate content by clicking the "Report" button next to the content. Our moderation team will review the report and take appropriate action.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
          <AccordionTrigger>What payment methods are accepted in the marketplace?</AccordionTrigger>
          <AccordionContent>
            We accept various payment methods including credit/debit cards, PayPal, and bank transfers. The available options will be displayed during the checkout process.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

