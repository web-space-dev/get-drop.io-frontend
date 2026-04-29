export interface BaseFirestoreDocument<TTimestamp = Date> {
  id: string;
  createdAt: TTimestamp;
  updatedAt: TTimestamp;
}
