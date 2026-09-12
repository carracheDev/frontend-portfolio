import type { Book, PaginatedBooks } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_LIBRARY_API_URL ?? "http://localhost:8000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? window.localStorage.getItem("library_admin_token") : null;
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}), ...options?.headers },
  });
  if (!response.ok) throw new Error("Impossible de joindre l'API bibliothèque.");
  return response.json();
}

export const libraryApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Email ou mot de passe incorrect.");
    const result = await response.json() as { token: string };
    window.localStorage.setItem("library_admin_token", result.token);
    return result;
  },
  logout: () => window.localStorage.removeItem("library_admin_token"),
  books: (params: { search?: string; availability?: string; page?: number } = {}) => {
    const query = new URLSearchParams();
    if (params.search) query.set("search", params.search);
    if (params.availability) query.set("availability", params.availability);
    if (params.page) query.set("page", String(params.page));
    return request<PaginatedBooks>(`/books${query.size ? `?${query}` : ""}`);
  },
  book: (id: number) => request<{ data: Book }>(`/books/${id}`),
  create: (payload: { title: string; isbn: string; year: number; author_ids: number[] }) =>
    request<{ data: Book }>("/books", { method: "POST", body: JSON.stringify(payload) }),
  remove: (id: number) => request<void>(`/books/${id}`, { method: "DELETE" }),
};
