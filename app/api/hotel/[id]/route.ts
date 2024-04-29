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
      tagLine: hotel.tagLine,
      location:hotel.location,
      tag: hotel.tag,
      beds: hotel.beds,
      garages: hotel.garages,
      propertyId: hotel.propertyId,
      bedRooms: hotel.bedRooms,
      parking: hotel.parking,
      dimensions: hotel.dimensions,
      zipCode:hotel.zipCode,
      Phone:hotel.Phone,
      fax:hotel.fax,
      email:hotel.email,
      website:hotel.website,
      features:hotel.features,
      person: hotel.person,
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




export async function PUT(req: NextRequest, { params }: { params: { id: string}}) {
  const id = params.id;

 const updateData  = await req.json();

 try {
    const updatedHotel = await prisma.hotels.update({
      where: { hotelId: Number(id)  },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "Hotel updated successfully",
        data: updatedHotel,
      },
      { status: 200 }
    );
 } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update Hotel",
        error,
      },
      {
        status: 500,
      }
    );
 }
}
export async function DELETE(req: NextRequest, { params }: { params: { id: string}}) {
  const id = params.id;
 
  try {
     // Delete the hotel by its ID
     const deletedHotel = await prisma.hotels.delete({
       where: { hotelId: Number(id) },
     });
 
     // Return a response indicating the hotel was deleted successfully
     return NextResponse.json(
       {
         message: "Hotel deleted successfully",
         data: deletedHotel,
       },
       { status: 200 }
     );
  } catch (error) {
     // Handle any errors that occur during the deletion process
     return NextResponse.json(
       {
         message: "Failed to delete Hotel",
         error,
       },
       {
         status: 500,
       }
     );
  }
 }
