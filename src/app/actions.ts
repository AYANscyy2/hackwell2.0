"use server";

import { auth, db } from "~/lib/firebase/firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string): boolean {
  return password.length >= 6; // Minimum 6 characters
}

const validRoles = ["allocator", "employee", "editor"];
function isValidRole(role: string): boolean {
  return validRoles.includes(role);
}

export async function signUp({
  email,
  password,
  name,
  userRole,
}: {
  email: string;
  password: string;
  name: string;
  userRole: string;
}) {
  try {
    if (!email || !password || !name || !userRole) {
      return { error: "Missing required fields", success: false };
    }

    email = email.trim().toLowerCase(); // Normalize email

    if (!isValidEmail(email)) {
      return { error: "Invalid email format", success: false };
    }

    if (!isValidPassword(password)) {
      return {
        error: "Password must be at least 6 characters long",
        success: false,
      };
    }

    if (!isValidRole(userRole)) {
      return { error: "Invalid user role", success: false };
    }

    const userDocRef = doc(db, "users", email);
    const existingUser = await getDoc(userDocRef);

    if (existingUser.exists()) {
      return { error: "User already exists", success: false };
    }

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    await setDoc(userDocRef, {
      uid: user.uid,
      email,
      name,
      userRole,
      createdAt: new Date().toISOString(),
    });

    return {
      success: true,
      message: "User registered successfully",
      userId: user.uid,
    };
  } catch (error: unknown) {
    console.error("Signup error:", error);
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
    };
  }
}

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    if (!email || !password) {
      return { error: "Missing email or password", success: false };
    }

    email = email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      return { error: "Invalid email format", success: false };
    }

    if (!isValidPassword(password)) {
      return { error: "Invalid password format", success: false };
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    return { success: true, message: "Login successful", userId: user.uid };
  } catch (error: unknown) {
    console.error("Login error:", error);
    return {
      error:
        error instanceof Error ? error.message : "Invalid email or password",
      success: false,
    };
  }
}

export async function logout() {
  try {
    await signOut(auth);
    return { success: true, message: "Logout successful" };
  } catch (error: unknown) {
    console.error("Logout error:", error);
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
    };
  }
}

export async function checkUserExists(email: string) {
  try {
    email = email.trim().toLowerCase();

    if (!isValidEmail(email)) {
      return { error: "Invalid email format", success: false };
    }

    const userDocRef = doc(db, "users", email);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      return { success: false, message: "User does not exist" };
    }

    return { success: true, message: "User exists" };
  } catch (error: unknown) {
    console.error("Error checking user:", error);
    return {
      error: error instanceof Error ? error.message : "Something went wrong",
      success: false,
    };
  }
}
