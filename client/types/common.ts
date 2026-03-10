interface Document {
  id: string;
  title: string;
  description?: string;
  content?: string
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { Document };
