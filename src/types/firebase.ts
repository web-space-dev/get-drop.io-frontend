import {
  type DocumentData,
  type QueryDocumentSnapshot,
  type WhereFilterOp,
} from "firebase/firestore";

export interface QueryOptions {
  where?: Array<{
    field: string;
    operator: WhereFilterOp;
    value: unknown;
  }>;
  orderBy?: Array<{
    field: string;
    direction?: "asc" | "desc";
  }>;
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
}
