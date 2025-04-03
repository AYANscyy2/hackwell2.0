"use server";

import { auth, db } from "~/lib/firebase/firebase/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";

// import { db } from "~/lib/firebase/firebase/FirebaseConfig";
// import {} from "firebase/firestore";

type Priority = "low" | "medium" | "high";
type Status = "unassigned" | "assigned" | "in-progress" | "completed";

interface RequiredSkill {
  id: string;
  name: string;
  minimumLevel: number;
}

interface TaskData {
  title: string;
  description: string;
  priority: Priority;
  estimatedHours: number;
  project: string;
  status: Status;
  deadline: string;
  requiredSkills: RequiredSkill[];
}

export async function createTask(taskData: TaskData) {
  try {
    if (!taskData.title || !taskData.description || !taskData.project) {
      return {
        success: false,
        error: "Missing required fields",
      };
    }

    const deadlineDate = new Date(taskData.deadline);
    const currentDate = new Date();

    if (isNaN(deadlineDate.getTime())) {
      return {
        success: false,
        error: "Invalid deadline date",
      };
    }

    if (deadlineDate < currentDate) {
      return {
        success: false,
        error: "Deadline cannot be in the past",
      };
    }

    const estimatedHours =
      typeof taskData.estimatedHours === "string"
        ? parseFloat(taskData.estimatedHours)
        : taskData.estimatedHours;

    if (isNaN(estimatedHours) || estimatedHours <= 0) {
      return {
        success: false,
        error: "Estimated hours must be a positive number",
      };
    }

    if (!taskData.requiredSkills || taskData.requiredSkills.length === 0) {
      return {
        success: false,
        error: "At least one required skill must be specified",
      };
    }

    const taskDocData = {
      ...taskData,
      estimatedHours: estimatedHours,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      assignedTo: null,
      comments: [],
      completionPercentage: 0,
    };

    const tasksCollection = collection(db, "tasks");
    const taskDocRef: DocumentReference = await addDoc(
      tasksCollection,
      taskDocData,
    );

    return {
      success: true,
      message: "Task created successfully",
      taskId: taskDocRef.id,
    };
  } catch (error: unknown) {
    console.error("Error creating task:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create task",
    };
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPassword(password: string): boolean {
  return password.length >= 6;
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

    email = email.trim().toLowerCase();

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
