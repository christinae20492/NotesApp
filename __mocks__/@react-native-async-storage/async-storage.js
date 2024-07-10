const mockAsyncStorage = (() => {
    let storage = {};
  
    return {
      setItem: jest.fn((key, value) => {
        storage[key] = value;
        return Promise.resolve(value);
      }),
      getItem: jest.fn((key) => {
        return Promise.resolve(storage[key]);
      }),
      removeItem: jest.fn((key) => {
        delete storage[key];
        return Promise.resolve();
      }),
      clear: jest.fn(() => {
        storage = {};
        return Promise.resolve();
      }),
    };
  })();
  
  export default mockAsyncStorage;
  