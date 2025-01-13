module.exports = {
  ci: {
    collect: {
      staticDistDir: './.next',
      url: ['http://localhost:3000'],
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      preset: 'lighthouse:recommended',
    },
  },
};

