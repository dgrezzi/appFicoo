export default {
  // ...
  android: {
    googleServicesFile: process.env.google_services,
    // ...
  },
  ios: {
    googleServicesFile: process.env.GoogleServiceInfo,
    // ...
  },
  expo: {
    extra: {
      eas: {
        projectId: '897b33c3-c906-4cad-9f27-a960cae1d2db',
      },
    },
  },
};
