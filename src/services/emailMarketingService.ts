import axios from 'axios';

const EMAIL_MARKETING_API_URL = process.env.EMAIL_MARKETING_API_URL;
const EMAIL_MARKETING_API_KEY = process.env.EMAIL_MARKETING_API_KEY;

interface Subscriber {
  email: string;
  name: string;
}

export async function addSubscriber(subscriber: Subscriber): Promise<void> {
  try {
    await axios.post(
      `${EMAIL_MARKETING_API_URL}/subscribers`,
      subscriber,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${EMAIL_MARKETING_API_KEY}`,
        },
      }
    );
  } catch (error) {
    console.error('Error adding subscriber:', error);
    throw new Error('Failed to add subscriber');
  }
}

export async function sendCampaign(campaignId: string, recipientIds: string[]): Promise<void> {
  try {
    await axios.post(
      `${EMAIL_MARKETING_API_URL}/campaigns/${campaignId}/send`,
      { recipientIds },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${EMAIL_MARKETING_API_KEY}`,
        },
      }
    );
  } catch (error) {
    console.error('Error sending campaign:', error);
    throw new Error('Failed to send campaign');
  }
}

