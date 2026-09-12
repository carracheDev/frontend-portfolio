export type Task = {
  id: number;
  title: string;
  description?: string;
  done: boolean;
};

export type Author = {
  id: number;
  name: string;
  bio?: string;
};

export type Book = {
  id: number;
  title: string;
  isbn: string;
  year: number;
  is_available: boolean;
  authors: Author[];
};

export type PaginatedBooks = {
  data: Book[];
  meta: { current_page: number; last_page: number; total: number };
};
