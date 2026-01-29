import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    const body = await req.json();

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";

    if (!name) {
      return new NextResponse("Name is missing", { status: 400 });
    }

    if (name.length > 200) {
      return new NextResponse("Name must be 200 characters or less", { status: 400 });
    }

    const company = await db.company.create({
      data: {
        userId,
        name,
      },
    });

    return NextResponse.json(company);
  } catch (error) {
    console.log(`[COMPANY_POST] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
