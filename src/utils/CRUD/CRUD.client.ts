import {
  addDoc,
  deleteDoc as firestoreDeleteDoc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { type BaseFirestoreDocument, type QueryOptions } from "@/types";
import {
  buildQueryConstraints,
  convertTimestamps,
  getCollection,
  getDocument,
} from "./CRUD.helpers";

export const createDocument = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<T> => {
  const now = new Date();
  const docData = {
    ...data,
    createdAt: now,
    updatedAt: now,
  };

  const docRef = await addDoc(getCollection(collectionName), docData);

  return {
    id: docRef.id,
    ...data,
    createdAt: now,
    updatedAt: now,
  } as T;
};

export const getDocuments = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  options: QueryOptions = {},
): Promise<T[]> => {
  const constraints = buildQueryConstraints(options);
  const collectionRef = getCollection(collectionName);
  const builtQuery =
    constraints.length > 0
      ? query(collectionRef, ...constraints)
      : collectionRef;

  const querySnapshot = await getDocs(builtQuery);

  return querySnapshot.docs.map((doc) => {
    const data = convertTimestamps<T>(doc.data());
    return { id: doc.id, ...data } as T;
  });
};

export const getDocumentById = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  id: string,
): Promise<T | null> => {
  const docRef = getDocument(collectionName, id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return null;
  }

  const data = convertTimestamps<T>(docSnap.data());
  return { id: docSnap.id, ...data } as T;
};

export const updateDocument = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  id: string,
  updates: Partial<Omit<T, "id" | "createdAt">>,
): Promise<T> => {
  const docRef = getDocument(collectionName, id);

  const updateData = {
    ...updates,
    updatedAt: Timestamp.now(),
  };

  await updateDoc(docRef, updateData);

  const updated = await getDocumentById<T>(collectionName, id);
  if (!updated) {
    throw new Error(`Document with id ${id} not found after update`);
  }

  return updated;
};

export const deleteDocument = async (
  collectionName: string,
  id: string,
): Promise<void> => {
  const docRef = getDocument(collectionName, id);
  await firestoreDeleteDoc(docRef);
};
