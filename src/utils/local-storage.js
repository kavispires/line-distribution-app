class LocalStorage {
  constructor() {
    this.store = {};
    this.notLoaded = true;

    this.init();
  }

  init() {
    this.load();
    return this.get();
  }

  get(key) {
    if (this.notLoaded) {
      this.load();
    }

    if (key) {
      return this.store[key] || null;
    }
    return this.store;
  }

  load() {
    const localStorage = JSON.parse(
      window.localStorage.getItem('line-distribution')
    );
    if (localStorage) {
      this.store = localStorage;
      this.notLoaded = false;
    }
  }

  set(value) {
    if (this.notLoaded) {
      this.load();
    }

    const type = typeof value;
    if (type !== 'string' && type !== 'object') {
      console.error(
        'localStorage set value must be a string or a key-value object'
      );
      return;
    }

    // When value is a string, use as a property toggle
    if (typeof value === 'string') {
      this.store[value] = !this.store[value];
    } else {
      this.store = {
        ...this.store,
        ...value,
      };
    }

    this.save();
  }

  save() {
    if (this.notLoaded) {
      this.load();
    }

    window.localStorage.setItem(
      'line-distribution',
      JSON.stringify(this.store)
    );
    this.load();
  }
}

export default new LocalStorage();
