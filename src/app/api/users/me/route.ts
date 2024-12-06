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

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}