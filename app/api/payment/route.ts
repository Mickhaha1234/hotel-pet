import prisma from "@/lib/prisma";
import moment from "moment";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const booking = await prisma.booking.findMany();

    return NextResponse.json(
      {
        message: "Ok",
        data: booking,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch booking",
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
    hotelId,
    price,
    email,
    people,
    startDate,
    endDate,
    address,
    name,
    Phone,
  } = await req.json();
  try {
    const newpeople = await prisma.booking.create({
      data: {
        hotelId: Number(hotelId),
        price: Number(price),
        address: address,
        email: email,
        name: name,
        Phone: Phone,
        startDate: moment(startDate).toISOString(),
        endDate: moment(endDate).toISOString(),
        people: people,
      },
    });
    return NextResponse.json(
      {
        message: "payment created successfully",
        data: newpeople,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a payment",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
