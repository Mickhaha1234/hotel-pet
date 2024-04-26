import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string}}) {
  const id = params.id;
  try {
    const cafe = await prisma.cafe.findMany({
      where: {
        cafeId: Number(id),
      }
    });

    // Transform the data to match the desired structure
    const transformedCafe = cafe.map((cafe) => ({
      id: cafe.cafeId,
      title: cafe.title,
      
      price: cafe.price ? cafe.price.toLocaleString() : "N/A",
      favourite: false,
      popular: true,
  
      description: cafe.description,
      img: cafe.image ? [cafe.image] : ["/img/featured-img-1.jpg"],
    }));

    return NextResponse.json(
      {
        message: "Ok",
        data: transformedCafe,
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

