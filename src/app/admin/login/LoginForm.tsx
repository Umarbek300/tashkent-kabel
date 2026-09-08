"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null as { error?: string } | null);

  return (
    <form action={action} className="flex flex-col gap-3">
      <input
        name="password"
        type="password"
        className="field"
        placeholder="Parol"
        autoComplete="current-password"
        required
      />
      {state?.error && <p className="text-xs text-red-500">{state.error}</p>}
      <button type="submit" disabled={pending} className="btn-primary py-3 text-sm">
        {pending ? "Tekshirilmoqda…" : "Kirish"}
      </button>
    </form>
  );
}
