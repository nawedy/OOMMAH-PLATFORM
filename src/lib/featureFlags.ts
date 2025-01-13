import flagsmith from 'flagsmith';

export const initializeFeatureFlags = async () => {
  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_ENV_ID,
  });
};

export const getFeatureFlag = (flagName: string) => {
  return flagsmith.hasFeature(flagName);
};

export const getFeatureValue = (flagName: string) => {
  return flagsmith.getValue(flagName);
};

