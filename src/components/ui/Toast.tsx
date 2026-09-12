import { CheckCircle2, XCircle } from "lucide-react";

export function Toast({ message, type = "success" }: { message: string; type?: "success" | "error" }) {
  return <div className={`toast toast-${type}`} role="status" aria-live="polite">{type === "success" ? <CheckCircle2 size={16} /> : <XCircle size={16} />}<span>{message}</span></div>;
}
