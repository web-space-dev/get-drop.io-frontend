import {
  collection,
  doc,
  type DocumentData,
  limit,
  orderBy,
  type QueryConstraint,
  startAfter,
  Timestamp,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebaseServer/firebaseClient";
import { type QueryOptions } from "@/types";

export const getCollection = (collectionName: string) =>
  collection(db, collectionName);

export const getDocument = (collectionName: string, id: string) =>
  doc(db, collectionName, id);

export const convertTimestamps = <T>(data: DocumentData): T => {
  const convertValue = (value: unknown): unknown => {
    if (value instanceof Timestamp) {
      return value.toDate();
    }

    if (Array.isArray(value)) {
      return value.map((item) => convertValue(item));
    }

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, entry]) => [
          key,
          convertValue(entry),
        ]),
      );
    }

    return value;
  };

  return convertValue(data) as T;
};

export const buildQueryConstraints = (
  options: QueryOptions,
): QueryConstraint[] => {
  const constraints: QueryConstraint[] = [];

  if (options.where) {
    options.where.forEach((whereClause) => {
      constraints.push(
        where(whereClause.field, whereClause.operator, whereClause.value),
      );
    });
  }

  if (options.orderBy) {
    options.orderBy.forEach((orderClause) => {
      constraints.push(
        orderBy(orderClause.field, orderClause.direction || "asc"),
      );
    });
  }

  if (options.limit) {
    constraints.push(limit(options.limit));
  }

  if (options.startAfter) {
    constraints.push(startAfter(options.startAfter));
  }

  return constraints;
};
