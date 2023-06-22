import { getDownloadURL, ref } from "firebase/storage";
import { firebaseStorage } from "../config/firebase";

export function b64ToBlob(base64Str) {
    const byteCharacters = atob(base64Str.split(',')[1]);
    const byteArrays = [];
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }
    return new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' });
}

export async function getProfilePhotoById(id) {
    try {
        const storageRef = ref(firebaseStorage, `profile-images/${id}`);
        const downloadUrl = await getDownloadURL(storageRef);
        return downloadUrl;
    } catch (error) {
        console.error('Error getting photo:', error);
    }
}