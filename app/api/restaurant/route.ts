import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const restaurant = await prisma.restaurant.findMany({
      select: {
        restaurantId: true,
        title: true,

       
        price: true,
    
        image: true,
      },
    });

    // const transformedCafe = Cafe.map((v) => ({
    //   ...v,
    //   img: v.image ? [v.image] : ["/img/featured-img-1.jpg"],
    // }));
    const transformedrestaurant = restaurant.map((restaurant) => ({
      id: restaurant.restaurantId,
      title: restaurant.title,
      
      
      price: restaurant.price ? restaurant.price.toLocaleString() : "N/A",
      favourite: false,
      popular: true,
      img: restaurant.image ? [restaurant.image] : ["/img/featured-img-1.jpg"],
    }));
    return NextResponse.json(
      {
        message: "Ok",
        data: transformedrestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Cafe",
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
    const newrestaurant = await prisma.restaurant.create({
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
        message: "restaurant created successfully",
        data: newrestaurant,
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
