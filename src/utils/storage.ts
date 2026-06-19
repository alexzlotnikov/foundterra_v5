type StorageKind = 'localStorage' | 'sessionStorage';

const getStorage = (kind: StorageKind): Storage | null => {
  if (typeof window === 'undefined') return null;

  try {
    return window[kind] ?? null;
  } catch {
    return null;
  }
};

export const safeStorage = {
  getItem(kind: StorageKind, key: string): string | null {
    const storage = getStorage(kind);
    if (!storage) return null;

    try {
      return storage.getItem(key);
    } catch {
      return null;
    }
  },

  setItem(kind: StorageKind, key: string, value: string): boolean {
    const storage = getStorage(kind);
    if (!storage) return false;

    try {
      storage.setItem(key, value);
      return true;
    } catch {
      return false;
    }
  },
};

