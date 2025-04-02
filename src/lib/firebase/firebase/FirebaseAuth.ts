import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./FirebaseConfig";
// import { auth } from "./FirebaseConfig";

/**
 * Sign up a new user
 */
export async function signUp(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Log in an existing user
 */
export async function signIn(
  email: string,
  password: string,
): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { success: true, user: userCredential.user };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Log out the current user
 */
export async function logout(): Promise<{ success: boolean; error?: string }> {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error: unknown) {
    console.error("Logout error:", error);
    return { success: false, error: (error as Error).message };
  }
}
