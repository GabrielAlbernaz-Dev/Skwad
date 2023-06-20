import { collection, doc, getDoc, getDocs, orderBy, query, updateDoc, where } from 'firebase/firestore';
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

export async function updateProfileInfos(profileId, name = null, bio = null) {
  const profileRef = doc(firebaseDb, 'profileInfo', profileId);
  try {
    if(name && bio) {
      await updateDoc(profileRef, {
        name: name,
        bio: bio
      });
    } else if(name) {
      await updateDoc(profileRef, {
        name: name
      });
    } else {
      await updateDoc(profileRef, {
        bio: bio
      });
    }

    return true; 
  } catch (error) {
    console.error('Error updating profile info:', error);
    return false; 
  }
}
  
  