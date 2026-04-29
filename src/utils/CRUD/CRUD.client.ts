import { type BaseFirestoreDocument, type QueryOptions } from "@/types";
import { db } from "@/utils/firebaseServer/firebaseClient";
import {
  addDoc,
  collection,
  deleteDoc as firestoreDeleteDoc,
  getDoc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  buildQueryConstraints,
  convertTimestamps,
  getCollection,
  getDocument,
} from "./CRUD.helpers";

type DeleteDocumentOptions = {
  subcollections?: string[];
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}

export const createDocument = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<T> => {
  try {
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
  } catch (error) {
    throw new Error(
      `Failed to create document in ${collectionName}: ${getErrorMessage(error)}`,
    );
  }
};

export const getDocuments = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  options: QueryOptions = {},
): Promise<T[]> => {
  try {
    const constraints = buildQueryConstraints(options);
    const collectionRef = getCollection(collectionName);
    const builtQuery =
      constraints.length > 0
        ? query(collectionRef, ...constraints)
        : collectionRef;

    const querySnapshot = await getDocs(builtQuery);

    return querySnapshot.docs.map((doc) => {
      const data = convertTimestamps<T>(doc.data());
      return { ...data, id: doc.id } as T;
    });
  } catch (error) {
    throw new Error(
      `Failed to get documents from ${collectionName}: ${getErrorMessage(error)}`,
    );
  }
};

export const getDocumentsWhere = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  field: string,
  operator:
    | "=="
    | "!="
    | "<"
    | "<="
    | ">"
    | ">="
    | "array-contains"
    | "in"
    | "array-contains-any"
    | "not-in",
  value: unknown,
): Promise<T[]> => {
  return getDocuments<T>(collectionName, {
    where: [{ field, operator, value }],
  });
};

export const getDocumentById = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  id: string,
): Promise<T | null> => {
  try {
    const docRef = getDocument(collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    const data = convertTimestamps<T>(docSnap.data());
    return { ...data, id: docSnap.id } as T;
  } catch (error) {
    throw new Error(
      `Failed to get document ${id} from ${collectionName}: ${getErrorMessage(error)}`,
    );
  }
};

export const updateDocument = async <T extends BaseFirestoreDocument<Date>>(
  collectionName: string,
  id: string,
  updates: Partial<Omit<T, "id" | "createdAt">>,
): Promise<T> => {
  try {
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
  } catch (error) {
    throw new Error(
      `Failed to update document ${id} in ${collectionName}: ${getErrorMessage(error)}`,
    );
  }
};

async function deleteSubcollectionDocuments(
  parentCollection: string,
  parentId: string,
  subcollectionName: string,
): Promise<void> {
  try {
    const subcollectionRef = collection(
      db,
      parentCollection,
      parentId,
      subcollectionName,
    );
    const snapshot = await getDocs(subcollectionRef);

    if (snapshot.empty) {
      return;
    }

    await Promise.all(
      snapshot.docs.map((snapshotDoc) => firestoreDeleteDoc(snapshotDoc.ref)),
    );
  } catch (error) {
    throw new Error(
      `Failed to delete subcollection ${subcollectionName} for ${parentCollection}/${parentId}: ${getErrorMessage(error)}`,
    );
  }
}

export const deleteDocument = async (
  collectionName: string,
  id: string,
  options: DeleteDocumentOptions = {},
): Promise<void> => {
  try {
    if (options.subcollections?.length) {
      for (const subcollectionName of options.subcollections) {
        await deleteSubcollectionDocuments(
          collectionName,
          id,
          subcollectionName,
        );
      }
    }

    const docRef = getDocument(collectionName, id);
    await firestoreDeleteDoc(docRef);
  } catch (error) {
    throw new Error(
      `Failed to delete document ${id} from ${collectionName}: ${getErrorMessage(error)}`,
    );
  }
};

export const createSubcollectionDocument = async <
  T extends BaseFirestoreDocument<Date>,
>(
  parentCollection: string,
  parentId: string,
  subcollectionName: string,
  data: Omit<T, "id" | "createdAt" | "updatedAt">,
): Promise<T> => {
  try {
    const now = new Date();
    const docData = {
      ...data,
      createdAt: now,
      updatedAt: now,
    };

    const subcollectionRef = getSubcollection(
      parentCollection,
      parentId,
      subcollectionName,
    );
    const docRef = await addDoc(subcollectionRef, docData);

    return {
      id: docRef.id,
      ...data,
      createdAt: now,
      updatedAt: now,
    } as T;
  } catch (error) {
    throw new Error(
      `Failed to create document in subcollection ${parentCollection}/${parentId}/${subcollectionName}: ${getErrorMessage(error)}`,
    );
  }
};

const getSubcollection = (
  parentCollection: string,
  parentId: string,
  subcollection: string,
) => collection(db, parentCollection, parentId, subcollection);
