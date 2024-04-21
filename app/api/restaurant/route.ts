import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurant = await prisma.restaurant.findMany();

    const transRestaurant = restaurant.map((v) => ({
      ...v,
      img: v.image ? [v.image] : ["/img/featured-img-1.jpg"],
    }));

    return NextResponse.json(
      {
        message: "Ok",
        data: transRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Restaurant",
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
    const newRestaurant = await prisma.restaurant.create({
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
        message: "Restaurant created successfully",
        data: newRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Restaurant",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
