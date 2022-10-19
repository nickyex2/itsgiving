import { getDatabase, ref, set, update } from "firebase/database";

// set user additional info
async function makeUserAddInfo(uid, userAddInfo) {
  const db = getDatabase();
  const dbRef = ref(db, `users/${uid}`);
  try {
    await set(dbRef, userAddInfo);
  } catch (error) {
    console.log(error);
  }
}

// update user additional info
async function updateUserAddInfo(uid, userAddInfo) {
  const db = getDatabase();
  const dbRef = ref(db, `users/${uid}`);
  try {
    await update(dbRef, userAddInfo);
  } catch (error) {
    console.log(error);
  }
}

export { makeUserAddInfo, updateUserAddInfo };
