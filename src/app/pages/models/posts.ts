export interface Posts {
  id?: number;
  title: string;
  content: string;
  category: string;
  tags?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

