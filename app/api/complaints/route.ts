import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    console.log("Complaint received:", body);

    // Basic validation
    if (!body || !body.type || !body.description) {
      return NextResponse.json(
        { error: "Complaint type and description are required" },
        { status: 400 }
      );
    }

    // Generate a unique tracking ID
    const trackingId = "RC" + Date.now();

    // Respond with success
    return NextResponse.json({
      message: "Complaint registered successfully",
      trackingId,
      data: body,
    });
  } catch (error) {
    console.error("Error in POST /api/complaints:", error);

    return NextResponse.json(
      {
        error: "Internal server error. Please try again later.",
      },
      { status: 500 }
    );
  }
}
