import type { Task } from "@/lib/types";

const API_URL = process.env.NEXT_PUBLIC_TASKS_API_URL ?? "http://localhost:8080";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    cache: "no-store",
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!response.ok) {
    const body = await response.json().catch(() => null) as { error?: string; message?: string } | null;
    throw new Error(body?.error ?? body?.message ?? "Impossible de joindre l'API des tâches.");
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

function normalizeTask(task: Task & { is_done?: boolean }): Task {
  return { ...task, done: task.done ?? task.is_done ?? false };
}

export const tasksApi = {
  list: async () => (await request<(Task & { is_done?: boolean })[]>("/tasks")).map(normalizeTask),
  create: (payload: { title: string; description: string }) =>
    request<Task>("/tasks", { method: "POST", body: JSON.stringify(payload) }),
  update: async (id: number, payload: { title: string; description: string; is_done: boolean }) =>
    normalizeTask(await request<Task & { is_done?: boolean }>(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(payload) })),
  remove: (id: number) => request<void>(`/tasks/${id}`, { method: "DELETE" }),
};
