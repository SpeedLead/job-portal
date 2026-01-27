import { compileThankyouEmailTemplate, sendMail } from "@/lib/mail";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Un-Authorized", { status: 401 });
    }

    const { email, fullName } = await req.json();

    const response = await sendMail({
      to: email,
      name: fullName,
      subject: "Thank you for applying",
      body: compileThankyouEmailTemplate(fullName),
    });

    if (response?.messageId) {
      return NextResponse.json("Mail Delivered", { status: 200 });
    } else {
      return new NextResponse("Mail not send", { status: 500 });
    }
  } catch (error) {
    console.log(`[THANKYOU_POST] : ${error}`);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
