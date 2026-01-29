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

    const title = typeof body.title === "string" ? body.title.trim() : "";

    if (!title) {
      return new NextResponse("Title is missing", { status: 400 });
    }

    if (title.length > 200) {
      return new NextResponse("Title must be 200 characters or less", { status: 400 });
    }

    const job = await db.job.create({
      data: {
        userId,
        title,
      },
    });

    return NextResponse.json(job);
  } catch (error) {
    console.log(`[JOB_POST] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
