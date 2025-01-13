import React from 'react';
import { getFeatureFlag } from '@/lib/featureFlags';

const NewFeature: React.FC = () => {
  const isEnabled = getFeatureFlag('new-feature');

  if (!isEnabled) {
    return null;
  }

  return (
    <div>
      <h2>New Feature</h2>
      <p>This is a new feature that can be toggled on/off using feature flags.</p>
    </div>
  );
};

export default NewFeature;

