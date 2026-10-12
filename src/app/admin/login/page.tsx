"use client";

import { useActionState } from "react";
import { loginAction } from "../actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState = { error: "" };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form
        action={formAction}
        className="w-full max-w-sm rounded-lg border border-gold/30 bg-card p-8 shadow-sm"
      >
        <p className="text-center font-display text-sm uppercase tracking-[0.3em] text-gold-deep">
          Panel
        </p>
        <h1 className="mt-3 text-center font-display text-2xl text-wood">
          Acceso administrador
        </h1>

        <div className="mt-8">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            name="password"
            type="password"
            autoFocus
            required
            className="mt-1"
          />
        </div>

        {state.error && (
          <p className="mt-3 text-sm text-destructive">{state.error}</p>
        )}

        <Button
          type="submit"
          disabled={pending}
          className="mt-6 w-full bg-gold-deep text-pearl hover:bg-wood"
        >
          {pending ? "Ingresando..." : "Ingresar"}
        </Button>
      </form>
    </main>
  );
}
