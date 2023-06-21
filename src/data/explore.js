import { collection, getDoc, doc ,getDocs, orderBy, query, where } from 'firebase/firestore';
import moment from 'moment/moment';
import { firebaseDb } from '../config/firebase';
import { getPosts } from './posts';

export async function getExploreTrending() {
    try {
      const posts = await getPosts();
      const hashtags = extractHashtagsFromPosts(posts);
      const hashtagCounts = countHashtagOccurrences(hashtags);
      const topHashtags = getTopHashtags(hashtagCounts, 5);
      const hashtagsResponse = topHashtags.map(hashtag =>{
          return  {
            id:generateUUID(),
            href:`/posts?q=${hashtag.replace('#', '')}`,
            counts:hashtagCounts[hashtag],
            title:hashtag.toLocaleUpperCase()
          }
      });
      return hashtagsResponse;
    } catch (error) {
      console.error('Erro to get posts:', error);
      throw error;
    }
}

export async function getExploreReccomendations() {
  try {
    const posts = await getPosts();
    const hashtags = extractHashtagsFromPosts(posts);
    const hashtagCounts = countHashtagOccurrences(hashtags);
    const randomHashtags = getRandomPosts(hashtags, 5);
    const hashtagsResponse = randomHashtags.map(hashtag =>{
      return  {
        id:generateUUID(),
        href:`/posts?q=${hashtag.replace('#', '')}`,
        counts:hashtagCounts[hashtag],
        title:hashtag.toLocaleUpperCase()
      }
    });
    return hashtagsResponse;
  } catch (error) {
    console.error('Erro ao obter recomendações:', error);
    throw error;
  }
}

function extractHashtagsFromPosts(posts) {
  const hashtags = [];

  for (const post of posts) {
    const caption = post.post;
    const regex = /#(\w+)/g;
    const matchedHashtags = caption.match(regex);

    if (matchedHashtags) {
      hashtags.push(...matchedHashtags);
    }
  }

  return hashtags;
}
  
function countHashtagOccurrences(hashtags) {
  const hashtagCounts = {};

  for (const hashtag of hashtags) {
    if (hashtagCounts[hashtag]) {
      hashtagCounts[hashtag]++;
    } else {
      hashtagCounts[hashtag] = 1;
    }
  }

  return hashtagCounts;
}

function getTopHashtags(hashtagCounts, limit) {
  const sortedHashtags = Object.keys(hashtagCounts).sort(
    (a, b) => hashtagCounts[b] - hashtagCounts[a]
  );

  const uniqueHashtags = [...new Set(sortedHashtags)];

  return uniqueHashtags.slice(0, limit);
}

function getRandomPosts(posts, limit) {
  const uniquePosts = [...new Set(posts.map(post => post.toLowerCase()))];
  const randomPosts = [];
  const totalPosts = uniquePosts.length;

  if (totalPosts <= limit) {
    return uniquePosts;
  }

  while (randomPosts.length < limit) {
    const randomIndex = Math.floor(Math.random() * totalPosts);
    const randomPost = uniquePosts[randomIndex];

    if (!randomPosts.includes(randomPost)) {
      randomPosts.push(randomPost);
    }
  }

  return randomPosts.map(post => posts.find(p => p.toLowerCase() === post));
}

function generateUUID() {
  let d = new Date().getTime();
  if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
    d += performance.now();
  }
  let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (d + Math.random()*16)%16 | 0;
    d = Math.floor(d/16);
    return (c=='x' ? r : (r&0x3|0x8)).toString(16);
  });
  return uuid;
}