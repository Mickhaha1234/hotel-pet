import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const Cafe = await prisma.cafe.findMany();

    return NextResponse.json(
      {
        message: "Ok",
        data: Cafe,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Hotels",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const { price, description, image, email, website, parking, title, Phone } = await req.json();
  try {
    const newCafe = await prisma.cafe.create({
      data: {
        price: Number(price),
        description: description,
        image: image,
        email: email,
        website: website,
        parking: Number(parking),
        title: title,
        Phone: Phone,
      },
    });
    return NextResponse.json(
      {
        message: "Cafe created successfully",
        data: newCafe,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Cafe",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
