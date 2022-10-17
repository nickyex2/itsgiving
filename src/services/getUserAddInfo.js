import { getDatabase, ref, onValue } from "firebase/database";

async function getUserAddInfo(uid) {
  const db = getDatabase();
  console.log(uid);
  const dbRef = ref(db, `users/${uid}`);
  console.log(dbRef);
  var snapshotValue = null;
  onValue(dbRef, (snapshot) => {
    snapshotValue = snapshot.val();
  });
  return snapshotValue;
}

export default getUserAddInfo;
