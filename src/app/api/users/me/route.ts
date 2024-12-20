import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/config/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/userModel";

connect();

export async function GET(request: NextRequest) {
    try {
        const { id } = await getDataFromToken(request);

        const user = await User.findById(id).select("-password");

        return NextResponse.json({
            message: "User fetched successfully",
            success: true,
            data: user
        })

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

}