import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const categoeries = await prisma.masterCategory.findMany();
    return NextResponse.json(
      {
        message: "Ok",
        data: categoeries,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Categoeries",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const { categoryName } = await req.json();
  try {
    const newCategory = await prisma.masterCategory.create({
      data: {
        categoryName,
      },
    });
    return NextResponse.json(
      {
        message: "Master category created successfully",
        data: newCategory,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Master category",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
