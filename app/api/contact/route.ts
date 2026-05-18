import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asTrimmedString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      {
        ok: false,
        tone: "error",
        message: "Die Anfrage konnte nicht gelesen werden.",
      },
      { status: 400 },
    );
  }

  const name = asTrimmedString(payload.name);
  const email = asTrimmedString(payload.email);
  const message = asTrimmedString(payload.message);

  if (!name || !email || !message) {
    return NextResponse.json(
      {
        ok: false,
        tone: "error",
        message: "Bitte fülle alle Felder aus.",
      },
      { status: 400 },
    );
  }

  if (!emailPattern.test(email)) {
    return NextResponse.json(
      {
        ok: false,
        tone: "error",
        message: "Bitte gib eine gültige E-Mail-Adresse ein.",
      },
      { status: 400 },
    );
  }

  // Backend hook: connect this point to a mail provider or CRM before production sends messages.
  return NextResponse.json(
    {
      ok: false,
      tone: "error",
      message:
        "Das Kontakt-Backend ist vorbereitet, aber noch nicht mit einem Versanddienst verbunden.",
    },
    { status: 503 },
  );
}
