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
      const q = query(
        collection(firebaseDb, 'posts'),
        where('isComment', '==', false),
        orderBy('timestamp', 'desc')
      );
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

export async function getNotifications(userPostId,username) {
  try {
    const notifyLikesQuery = query(
      collection(firebaseDb, "notifyLikes"),
      where('userPostId', '==', userPostId),
      orderBy("timestamp", "desc")
    );
    const notifyLikesSnapshot = await getDocs(notifyLikesQuery);
    const notifyLikes = notifyLikesSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "like",
      ...doc.data(),
    }));

    const postsQuery = query(
      collection(firebaseDb, "posts"),
      orderBy("timestamp", "desc")
    );
    const postsSnapshot = await getDocs(postsQuery);
    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "post",
      ...doc.data(),
    }));
    const filteredPosts = posts.filter((post) =>
      post.post.includes(`@${username}`)
    );

    const commentsQuery = query(
      collection(firebaseDb, "posts"),
      where("isComment", "==", true),
      where("postParentUserId", "==", userPostId),
      orderBy("timestamp", "desc")
    );
    const commentsSnapshot = await getDocs(commentsQuery);
    const comments = commentsSnapshot.docs.map((doc) => ({
      id: doc.id,
      type: "comment",
      ...doc.data(),
    }));

    return {
      notifyLikes,
      posts: filteredPosts,
      comments:comments
    };
  } catch (error) {
    console.error('Erro to get notifications:', error);
    return {
      notifyLikes: [],
      posts: [],
    };
  }
}

export async function getComments(id) {
  try {
    const q = query(
      collection(firebaseDb, 'posts'),
      where('isComment', '==', true),
      where('postParent', '==', id),
      orderBy('timestamp', 'desc')
    );
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

export async function getPostsByUserId(userId) {
  try {
    const q = query(
      collection(firebaseDb, 'posts'), 
      where('userId', '==', userId), 
      where('isComment', '==', false), 
      orderBy('timestamp', 'desc')
    );
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

export async function getCommentsByUserId(userId) {
  try {
    const q = query(
      collection(firebaseDb, 'posts'), 
      where('userId', '==', userId), 
      where('isComment', '==', true), 
      orderBy('timestamp', 'desc')
    );
    const response = await getDocs(q);
    const comments = response.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return comments;
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

       