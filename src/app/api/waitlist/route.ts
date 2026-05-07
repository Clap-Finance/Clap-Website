
import { NextRequest, NextResponse } from "next/server";
import mongoClientPromise from "@/lib/mongodb";
import { WaitlistPayload } from "@/types/waitlist";

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_DEVICES = [
  "Desktop",
  "Mobile",
  "Tablet",
];

export async function POST(req: NextRequest) {
  try {
    const body: WaitlistPayload =
      await req.json();

    const {
      full_name,
      email,
      terms,
      device_type,
      country,
      referral_source,
      campaign_source,
      time_on_page,
    } = body;

    // ============================================
    // VALIDATION
    // ============================================

    if (
      !full_name ||
      full_name.trim().length < 2
    ) {
      return NextResponse.json(
        {
          success: false,
          type: "VALIDATION_ERROR",
          message:
            "Full name must be at least 2 characters",
        },
        { status: 400 }
      );
    }

    if (!email?.trim()) {
      return NextResponse.json(
        {
          success: false,
          type: "VALIDATION_ERROR",
          message: "Email is required",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json(
        {
          success: false,
          type: "VALIDATION_ERROR",
          message: "Invalid email address",
        },
        { status: 400 }
      );
    }

    if (!terms) {
      return NextResponse.json(
        {
          success: false,
          type: "TERMS_REQUIRED",
          message:
            "You must accept the terms",
        },
        { status: 400 }
      );
    }

    if (
      device_type &&
      !VALID_DEVICES.includes(device_type)
    ) {
      return NextResponse.json(
        {
          success: false,
          type: "VALIDATION_ERROR",
          message: "Invalid device type",
        },
        { status: 400 }
      );
    }

    // ============================================
    // DATABASE
    // ============================================

    const client = await mongoClientPromise;

    const db = client.db("clap_waitlist");

    const collection =
      db.collection("users");

    // ============================================
    // CHECK EXISTING EMAIL
    // ============================================

    const existingEmail =
      await collection.findOne({
        email: email.toLowerCase(),
      });

    if (existingEmail) {
      return NextResponse.json(
        {
          success: false,
          type: "EMAIL_EXISTS",
          message:
            "This email already exists on the waitlist",
        },
        { status: 409 }
      );
    }

    // ============================================
    // CREATE USER
    // ============================================

    const newEntry = {
      full_name: full_name.trim(),

      email: email.toLowerCase(),

      terms,

      device_type:
        device_type || "Desktop",

      country: country || "Unknown",

      referral_source:
        referral_source || "Direct",

      campaign_source:
        campaign_source || "Organic",

      time_on_page:
        typeof time_on_page === "number"
          ? time_on_page
          : 0,

      created_at: new Date(),
    };

    const result =
      await collection.insertOne(newEntry);

    // ============================================
    // SUCCESS
    // ============================================

    return NextResponse.json(
      {
        success: true,
        type: "SUCCESS",
        message:
          "Successfully joined the Clap waitlist",

        data: {
          id: result.insertedId,
          email: newEntry.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "WAITLIST API ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        type: "SERVER_ERROR",
        message:
          "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}
