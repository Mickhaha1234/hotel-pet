import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const features = await prisma.masterFeature.findMany();
    return NextResponse.json(
      {
        message: "Ok",
        data: features,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch Features",
        error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest) {
  const { featureName } = await req.json();
  try {
    const newFeature = await prisma.masterFeature.create({
      data: {
        featureName: featureName,
      },
    });
    return NextResponse.json(
      {
        message: "Master feature created successfully",
        data: newFeature,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to Create a Master feature",
        error,
      },
      {
        status: 500,
      }
    );
  }
}
