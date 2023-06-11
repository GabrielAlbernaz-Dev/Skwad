import { collection, doc, getDoc, getDocs, orderBy, query, where } from 'firebase/firestore';
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