export const mockFirebase = {
  database: () => {
    console.log('database()');
    return 1;
  },
  auth: () => {
    return {
      setPersistence: val => {
        console.log(val);
        return val;
      },
      signInWithPopup: val => {
        console.log(val);
        return val;
      },
    };
  },
};

export const mockGoogleAuthProvider = {
  value: 'mock',
};
