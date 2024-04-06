import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const hotels = await prisma.hotels.findMany();
    return NextResponse.json(
      {
        message: "Ok",
        data: hotels,
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
