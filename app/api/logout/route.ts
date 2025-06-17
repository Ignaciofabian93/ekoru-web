import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { message: "Sesión cerrada" },
    {
      status: 200,
      headers: {
        "Set-Cookie": "token=; Path=/; Max-Age=0; HttpOnly; Secure; SameSite=Strict",
      },
    }
  );
}
