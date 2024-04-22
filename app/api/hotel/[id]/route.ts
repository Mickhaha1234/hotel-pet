import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string}}) {
  const id = params.id;
  try {
    const hotels = await prisma.hotels.findMany({
      where: {
        hotelId: Number(id),
      }
    });

    // Transform the data to match the desired structure
    const transformedHotels = hotels.map((hotel) => ({
      id: hotel.hotelId,
      title: hotel.title,
      address: hotel.address,
      rooms: hotel.bedRooms,
      type: hotel.type,
      bed: hotel.bedRooms,
      bath: hotel.bathRooms,
      area: hotel.area,
      videoLink: hotel.videoLink,
      price: hotel.price ? hotel.price.toLocaleString() : "N/A",
      favourite: false,
      popular: true,
      yearBuild: hotel.yearBuild,
      description: hotel.description,
      img: hotel.image ? [hotel.image] : ["/img/featured-img-1.jpg"],
    }));

    return NextResponse.json(
      {
        message: "Ok",
        data: transformedHotels,
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

