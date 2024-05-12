


import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { id: string}}) {
  const id = params.id;
  try {
    const restaurant = await prisma.restaurant.findMany({
      where: {
        restaurantId: Number(id),
      }
    });

    // Transform the data to match the desired structure
    const transformedRestaurant = restaurant.map((restaurant) => ({
      id: restaurant.restaurantId,
      title: restaurant.title,
      location: restaurant.location,
      address: restaurant.address,
      videoLink: restaurant.videoLink,
    
     
      
      
      Phone:restaurant.Phone,
    
      email:restaurant.email,
      website:restaurant.website,
     
      price: restaurant.price ? restaurant.price.toLocaleString() : "N/A",
      favourite: false,
      popular: true,
     
      description: restaurant.description,
      img: restaurant.image ? [restaurant.image] : ["/img/featured-img-1.jpg"],
    }));

    return NextResponse.json(
      {
        message: "Ok",
        data: transformedRestaurant,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch restaurant",
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

 const updateData: any = await req.json();

 try {
    const updatedrestaurant = await prisma.restaurant.update({
      where: { restaurantId: Number(id)  },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "restaurant updated successfully",
        data: updatedrestaurant,
      },
      { status: 200 }
    );
 } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update restaurant",
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
     const deletedrestaurant = await prisma.restaurant.delete({
       where: { restaurantId: Number(id) },
     });
 
     // Return a response indicating the hotel was deleted successfully
     return NextResponse.json(
       {
         message: "Restaurant deleted successfully",
         data: deletedrestaurant,
       },
       { status: 200 }
     );
  } catch (error) {
     // Handle any errors that occur during the deletion process
     return NextResponse.json(
       {
         message: "Failed to delete Restaurant",
         error,
       },
       {
         status: 500,
       }
     );
  }
 }
