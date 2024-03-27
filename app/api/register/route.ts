import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, email, password } = body;

  if (!firstName || !lastName || !email || !password) {
    return new NextResponse("Missing Fields", { status: 400 });
  }

  const exist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (exist) {
    return new NextResponse("Email already exists", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // insert User to mongoDB
  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
