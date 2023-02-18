import { openDB } from "idb";

const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Put method that accepts some content and adds it to the database
export const putDb = async (content) => {
  try {
    const jateDB = await openDB("jate", "1");
    const tx = jateDB.transaction("jate", "readwrite");
    const store = tx.objectStore("jate");
    const request = store.put({ id: 1, value: content });

    const result = await request;
    console.log("Data successfully saved to the database!", result);
  } catch (err) {
    console.error("Error opening jate database", err);
  }
};

// Get method that gets all content from database 
export const getDb = async () => {
  try {
    const jateDB = await openDB("jate", 1);
    const tx = jateDB.transaction("jate", "readonly");
    const store = tx.objectStore("jate");
    const request = store.getAll();
    
    const result = await request;
    console.log("result.value", result);
    return result;
  } catch (err) {
    console.error("Error opening jate database", err);
  }
};

initdb();
