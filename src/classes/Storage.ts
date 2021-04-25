interface IStorage {
  getItem: (key: string) => string | null;
  setItem: (key: string, value: string) => void;
  removeItem: (key: string) => void;
  clear: () => void;
}

class Storage {
  storage: IStorage;

  constructor(storage: IStorage) {
    this.storage = storage;
  }

  setItem(key: string, value: object) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string) {
    return JSON.parse(this.storage.getItem(key) as string);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }
}

export default Storage;
