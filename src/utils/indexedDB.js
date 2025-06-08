const DB_NAME = 'webTemplateDB';
const DB_VERSION = 1;
const STORE_NAME = 'templateData';

let db;

// Open the database
const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve(db);
    };

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};

// Save data to IndexedDB
export const saveData = async (id, data) => {
  if (!db) {
    db = await openDB();
  }
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.put({ id, data }); // Store data with a specific ID

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = (event) => {
      console.error('Error saving data:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};

// Load data from IndexedDB
export const loadData = async (id) => {
  if (!db) {
    db = await openDB();
  }
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(id); // Retrieve data by ID

    request.onsuccess = () => {
      resolve(request.result ? request.result.data : null);
    };

    request.onerror = (event) => {
      console.error('Error loading data:', event.target.errorCode);
      reject(event.target.errorCode);
    };
  });
};

// Initialize DB connection on first import
openDB().catch(e => console.error("Failed to open IndexedDB on init:", e)); 