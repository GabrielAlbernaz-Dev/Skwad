import { collection, doc, getDoc,serverTimestamp, getDocs, orderBy, query, where, addDoc, deleteDoc } from 'firebase/firestore';
import { firebaseDb } from '../config/firebase';

export async function getFollowingProfiles(id) {
    try {
      const followsQuery = query(
        collection(firebaseDb, 'follows'),
        where('followerId', '==', id)
      );
      const followsSnapshot = await getDocs(followsQuery);

      const profilesPromises = followsSnapshot.docs.map(async (doc) => {
        const profileQuery = query(collection(firebaseDb, 'profileInfo'), where('userId', '==', doc.data().followedId));
        const profileSnapshot = await getDocs(profileQuery);
        const profileData = profileSnapshot.docs[0].data();
        const profileId = profileSnapshot.docs[0].id;
        return { id: profileId, ...profileData };
      });

      const profiles = await Promise.all(profilesPromises);
      return profiles;
    } catch (error) {
      console.error('Error getting following profiles:', error);
      return [];
    }
}

export async function getPopularProfiles(limit) {
  try {
    const profilesQuery = collection(firebaseDb, 'profileInfo');
    const profilesSnapshot = await getDocs(profilesQuery);

    const profilesPromises = profilesSnapshot.docs.map(async (doc) => {
      const profileData = doc.data();
      const profileId = doc.id;
      const followerCount = await countFollowersById(profileId);
      return { id: profileId, followerCount, ...profileData };
    });

    const profiles = await Promise.all(profilesPromises);
    profiles.sort((a, b) => b.followerCount - a.followerCount);
    const limitedProfiles = profiles.slice(0, limit);
    return limitedProfiles;
  } catch (error) {
    console.error('Error getting popular profiles:', error);
    return [];
  }
}


export async function countFollowersById(id) {
    try {
      const followsQuery = query(
        collection(firebaseDb, 'follows'),
        where('followedId', '==', id)
      );
      const followsSnapshot = await getDocs(followsQuery);
      const count = followsSnapshot.size;
      return count;
    } catch (error) {
      console.error('Error counting followers:', error);
      return 0;
    }
}

export async function countFollowsById(id) {
    try {
      const followsQuery = query(
        collection(firebaseDb, 'follows'),
        where('followerId', '==', id)
      );
      const followsSnapshot = await getDocs(followsQuery);
      const count = followsSnapshot.size;
      return count;
    } catch (error) {
      console.error('Error counting follows:', error);
      return 0;
    }
}

export async function isFollowingProfile(followedId, followerId) {
    try {
      const followsQuery = query(
        collection(firebaseDb, 'follows'),
        where('followedId', '==', followedId),
        where('followerId', '==', followerId)
      );
      const followsSnapshot = await getDocs(followsQuery);
  
      if (!followsSnapshot.empty) {
        return true;
      }
      return false;

    } catch (error) {
        return false;
    }
}

export async function followProfileById(id, followedId, followerId) {
    try {  
        const followsQuery = query(
            collection(firebaseDb, 'follows'),
            where('followedId', '==', followedId),
            where('followerId', '==', followerId)
        );
        const followsSnapshot = await getDocs(followsQuery);
    
       if(!followsSnapshot.empty) {
         return true;
       }

      const profileDocRef = doc(firebaseDb, 'profileInfo', id);
      const profileDoc = await getDoc(profileDocRef);
  
      if (profileDoc.exists()) {
        if (followerId) {
          const followsRef = collection(firebaseDb, 'follows');
          return await addDoc(followsRef, {
            followedId: followedId,
            followerId: followerId,
            timestamp: serverTimestamp()
          });
        } else {
          throw new Error('User is not logged in.');
        }
      } else {
        throw new Error('Profile does not exist.');
      }
    } catch (error) {
      return false;
    }
}

export async function unfollowProfileById(followedId, followerId) {
    try {
      const followsQuery = query(
        collection(firebaseDb, 'follows'),
        where('followedId', '==', followedId),
        where('followerId', '==', followerId)
      );
      const followsSnapshot = await getDocs(followsQuery);
  
      if (followsSnapshot.empty) {
        return false;
      }
  
      followsSnapshot.forEach(async (followDoc) => {
        await deleteDoc(doc(firebaseDb, 'follows', followDoc.id));
      });
  
      return true;
    } catch (error) {
      console.error('Error unfollowing user:', error);
      return false;
    }
}
  
  
  
