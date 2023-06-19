import { updateEmail, updatePassword } from 'firebase/auth';
import { firebaseAuth } from '../config/firebase';

export async function changeEmailAndPassword(id, newEmail, newPassword) {
  if (!id) {
    throw new Error('User ID is required');
  }

  if (!newEmail && !newPassword) {
    throw new Error('New email or password is required');
  }
  
  const user = firebaseAuth.currentUser;

  try {
    if (newEmail) {
      await updateEmail(user, newEmail);
    }

    if (newPassword) {
      await updatePassword(user, newPassword);
    }
    console.log('Email and password updated successfully');
  } catch (error) {
    console.error('Error updating email and password:', error);
    throw new Error('Failed to update email and password');
  }
}
