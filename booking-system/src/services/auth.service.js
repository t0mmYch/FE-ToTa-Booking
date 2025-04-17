import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../config/firebase";

class AuthService {
  //Sign up with email and password
  async register(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //Update the user's profile with display name
      await updateProfile(userCredential.user, { displayName });
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  //Sign in with email and password
  async login(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Sign out
  async logout() {
    try {
      await signOut(auth);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Reset password
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw this.handleError(error);
    }
  }

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  }

  // Handle Firebase Auth errors
  handleError(error) {
    let message = "An error occurred. Please try again.";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already registered.";
        break;
      case "auth/invalid-email":
        message = "Invalid email address.";
        break;
      case "auth/operation-not-allowed":
        message = "Email/password accounts are not enabled.";
        break;
      case "auth/weak-password":
        message = "Password is too weak.";
        break;
      case "auth/user-disabled":
        message = "This account has been disabled.";
        break;
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password.";
        break;
      default:
        message = error.message;
    }

    return new Error(message);
  }
}

export const authService = new AuthService();
export default authService;
