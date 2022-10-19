// import axios from "axios";
import { getDatabase, ref, onValue } from "firebase/database";

async function getUserAddInfo(uid) {
  const db = getDatabase();
  const dbRef = ref(db, `users/${uid}`);
  var snapshotValue = null;
  onValue(dbRef, (snapshot) => {
    snapshotValue = snapshot.val();
    console.log(snapshotValue);
  });
  return snapshotValue;
}

// async function getUserAddInfo(uid) {
//   var dbValue = null;
//   await axios
//     .get(
//       "https://its-giving-default-rtdb.asia-southeast1.firebasedatabase.app/users/" +
//         uid +
//         ".json"
//     )
//     .then((response) => {
//       console.log(response.data);
//       dbValue = response.data;
//     })
//     .catch((error) => {
//       console.log(error.message);
//     });
//   return dbValue;
// }
export default getUserAddInfo;
