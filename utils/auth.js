import User from "@/models/User";
import { getServerSession } from "next-auth";
import dbConnect from "./dbConnect";

export async function verifyAdmin(req) {
  await dbConnect();
  console.log(req, "req console");

  // Use getServerSession for server-side session retrieval
  const session = await getServerSession(req);
  console.log(session, "session console");

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await User.findOne({ email: session.user.email });

    if (!user || user.role !== "admin") {
      throw new Error("Forbidden: Admins only");
    }

    return user;
  } catch (err) {
    throw new Error("Unauthorized");
  }
}
