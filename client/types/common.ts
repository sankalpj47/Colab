interface Document {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Document };
