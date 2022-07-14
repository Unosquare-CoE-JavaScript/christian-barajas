export interface Book {
  id: string;
  title: string;
  description: string;
  price: number;
  publishDate?: Date;
  author: {
    id: string;
    fullName: string;
  };
}
