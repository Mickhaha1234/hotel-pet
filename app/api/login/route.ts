import { compare } from "bcrypt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user || !user?.hashedPassword) {
    throw new Error("No user found");
  }

  const passwordMatch = await compare(password, user.hashedPassword);

  // if password does not match
  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }

  return NextResponse.json(user);
}
