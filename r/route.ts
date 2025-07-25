import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/lib/connectDb";
import Url from "@/app/models/urlSchema";

export async function GET(req: NextRequest) {
  // Get first query param key
  const urlId = req.nextUrl.searchParams.keys().next().value;

  if (!urlId) {
    return NextResponse.json({ status: 400, msg: "Missing URL ID" });
  }

  try {
    await dbConnect();
    const url = await Url.findOne({ urlId });

    if (url) {
      await Url.updateOne({ urlId }, { $inc: { clicks: 1 } });
      return NextResponse.redirect(url.origUrl);
    } else {
      return NextResponse.json({ status: 404, msg: `${urlId} does not exist` });
    }
  } catch (err) {
    return NextResponse.json({ status: 500, error: err });
  }
}
