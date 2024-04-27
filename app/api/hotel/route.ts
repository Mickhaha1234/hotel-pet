import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const hotels = await prisma.hotels.findMany({
      select: {
        hotelId: true,
        title: true,
        address: true,
        bedRooms: true,
        bathRooms: true,
        area: true,
        price: true,
        type: true,
        image: true,
        yearBuild: true,
        email: true,
      },
    });

    // Transform the data to match the desired structure
    const transformedHotels = hotels.map((hotel) => ({
      id: hotel.hotelId,
      title: hotel.title,
      email: hotel.email,
      address: hotel.address,
      rooms: hotel.bedRooms,
      type: hotel.type,
      bed: hotel.bedRooms,
      bath: hotel.bathRooms,
      area: hotel.area,
      yearBulid: hotel.yearBuild,
      price: hotel.price ? hotel.price.toLocaleString() : "N/A",
      favourite: false,
      popular: true,
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

export async function POST(req: NextRequest) {
  const {
    title,
    price,
    description,
    tagLine,
    tag,
    beds,
    bathRooms,
    garages,
    person,
    area,
    propertyId,
    type,
    bedRooms,
    parking,
    dimensions,
    yearBuild,
    image,
    videoLink,
    address,
    zipCode,
    Phone,
    fax,
    email,
    website,
    categoryId,
    features,
  } = await req.json();
  try {
    const newHotel = await prisma.hotels.create({
      data: {
        title: title,
        price: price,
        description: description,
        tagLine: tagLine,
        tag: tag,
        beds: beds,
        bathRooms: bathRooms,
        garages: garages,
        person: person,
        area: area,
        propertyId: propertyId,
        type: type,

        bedRooms: bedRooms,
        parking: parking,
        dimensions: dimensions,
        yearBuild: yearBuild,
        image: image,
        videoLink: videoLink,
        address: address,
        zipCode: zipCode,
        Phone: Phone,
        fax: fax,
        email: email,
        website: website,
        categoryId: categoryId,
        features: features,
      },
    });
    return NextResponse.json(
      {
        message: "Hotel created successfully",
        data: newHotel,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Hotel",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
