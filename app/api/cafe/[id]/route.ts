// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req: NextRequest, { params }: { params: { id: string}}) {
//   const id = params.id;
//   try {
//     const cafe = await prisma.cafe.findMany({
//       where: {
//         cafeId: Number(id),
//       }
//     });

//     // Transform the data to match the desired structure
//     const transformedCafe = cafe.map((cafe) => ({
//       id: cafe.cafeId,
//       title: cafe.title,
      
//       price: cafe.price ? cafe.price.toLocaleString() : "N/A",
//       favourite: false,
//       popular: true,
  
//       description: cafe.description,
//       img: cafe.image ? [cafe.image] : ["/img/featured-img-1.jpg"],
//     }));

//     return NextResponse.json(
//       {
//         message: "Ok",
//         data: transformedCafe,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       {
//         message: "Failed to fetch Hotels",
//         error,
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
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
      location: cafe.location,
    
     
      
      
      Phone:cafe.Phone,
    
      email:cafe.email,
      website:cafe.website,
     
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




export async function PUT(req: NextRequest, { params }: { params: { id: string}}) {
  const id = params.id;

 const updateData: any = await req.json();

 try {
    const updatedcafe = await prisma.cafe.update({
      where: { cafeId: Number(id)  },
      data: updateData,
    });

    return NextResponse.json(
      {
        message: "cafe updated successfully",
        data: updatedcafe,
      },
      { status: 200 }
    );
 } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update cafe",
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
     const deletedcafe = await prisma.cafe.delete({
       where: { cafeId: Number(id) },
     });
 
     // Return a response indicating the hotel was deleted successfully
     return NextResponse.json(
       {
         message: "Cafe deleted successfully",
         data: deletedcafe,
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

