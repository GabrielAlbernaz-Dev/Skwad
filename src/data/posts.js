import { collection, getDoc, doc ,getDocs, orderBy, query, where } from 'firebase/firestore';
import { firebaseDb } from '../config/firebase';

export async function getPosts() {
    try {
      const q = query(collection(firebaseDb, 'posts'), orderBy('timestamp', 'desc'));
      const response = await getDocs(q);
      const posts = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      return posts;
    } catch (error) {
      console.error('Erro to get posts:', error);
      return [];
    }
}

export async function getPostByUserId(userId) {
  try {
    const q = query(collection(firebaseDb, 'posts'), where('userId', '==', userId), orderBy('timestamp', 'desc'));
    const response = await getDocs(q);
    const posts = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    console.log(posts)
    return posts;
  } catch (error) {
    console.error('Erro to get posts:', error);
    return [];
  }
}

export async function getLikedPostsByUser(id) {
  try {
    const likedPostsQuery = query(collection(firebaseDb, 'likes'), where('userId', '==', id));
    const likedPostsResponse = await getDocs(likedPostsQuery);
    
    const likedPosts = [];

    for (const docSnapshot  of likedPostsResponse.docs) {
      const postId = docSnapshot .data().postId;
      
      const postRef = doc(firebaseDb, 'posts', postId);
      const postDoc = await getDoc(postRef);

      if (postDoc.exists()) {
        const post = {
          id: postDoc.id,
          ...postDoc.data()
        };
        likedPosts.push(post);
      }
    }
    likedPosts.sort((a, b) => b.timestamp - a.timestamp);
    return likedPosts;
  } catch (error) {
    console.error('Error fetching liked posts:', error);
    return [];
  }
}

       