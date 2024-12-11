import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const email = reqBody.email;

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Send verification email
        await sendEmail({
            email,
            emailType: "RESET",
            userId: user._id
        });

        return NextResponse.json({
            message: "Email sent successfully",
            success: true,
        })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}