import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { firebaseDb } from '../config/firebase';

export async function getProfileInfoById(id) {
    const profileSnapshot = await getDocs(collection(firebaseDb, 'profileInfo'));
    const profileItem = profileSnapshot.docs.find(item => item.id === id);
    if (!profileItem ||profileItem.length === 0) {
      return [];
    }
    return profileItem.data();
}

export async function getProfileInfoByUserId(userId) {
    const profileSnapshot = await getDocs(collection(firebaseDb, 'profileInfo'));
    const profileItem = profileSnapshot.docs.find(item => item.data().userId === userId)
    if (!profileItem || profileItem.length == 0) {
      return { id: null, data: [] };
    }
    return { id: profileItem.id, data: profileItem.data()};
}
  
  