import { collection, getDoc, doc ,getDocs, orderBy, query, where } from 'firebase/firestore';
import moment from 'moment/moment';
import { firebaseDb } from '../config/firebase';


export async function getPost(id) {
  try {
    const postRef = doc(collection(firebaseDb, 'posts'), id);
    const postSnapshot = await getDoc(postRef);

    if (postSnapshot.exists()) {
      const post = postSnapshot.data();
      return post;
    } else {
      throw new Error('Post not found');
    }
  } catch (error) {
    console.error('Error getting post:', error);
    throw error;
  }
}

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

export function getPostTimeDiff(timestamp) {
  const milliseconds = moment(timestamp.seconds * 1000 + Math.round(timestamp.nanoseconds / 1e6));
  const date = moment(milliseconds);
  const currentDate = moment();
  const diff = currentDate.diff(date);
  const diffDuration = moment.duration(diff);
  const years = diffDuration.years();
  const months = diffDuration.months();
  const days = diffDuration.days();
  const hours = diffDuration.hours();
  const minutes = diffDuration.minutes();

  if (years >= 1) {
    return years + 'y';
  } else if (months >= 1) {
    return months + 'mo';
  } else if (days >= 1) {
    return days + 'd';
  } else if (hours >= 1) {
    return hours + 'h';
  } else {
    return minutes + 'm';
  }
}

       