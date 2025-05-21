const getStorage = (storage: Storage) => {
  return {
    // 设置缓存并设置过期时间
    setItem: (key: string, value: string, ttl?: number) => {
      storage.setItem(key, JSON.stringify({ data: value, ttl: ttl ? ttl + Date.now() : -1 }));
    },
    // 获取缓存
    getItem: (key: string) => {
      try {
        const { data, ttl } = JSON.parse(storage.getItem(key) || '{}');
        if (ttl < 0 || Date.now() < ttl) {
          return data;
        }
        return null;
      } catch (error) {
        return null;
      }
    },
    removeItem: (key: string) => {
      storage.removeItem(key);
    },
    clear: () => {
      storage.clear();
    },
  };
};

export const localStorage = getStorage(window.localStorage);
export const sessionStorage = getStorage(window.sessionStorage);
