import dbConnect from "@/utils/dbConnect"; // MongoDB connection utility
import CodeAssignment from "@/models/CodeAssignment";
import { verifyAdmin } from "@/utils/auth"; // Middleware for admin authorization

export async function GET(req, res) {
  await dbConnect();

  try {
    const assignments = await CodeAssignment.find();
    return new Response(JSON.stringify(assignments), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  await dbConnect();

  try {
   await verifyAdmin(req);
    // Read the stream and parse it as JSON
    const body = await req.text(); // Read the body as a string
    const parsedBody = JSON.parse(body); // Parse the string into an object


    // You can still use the same logic to save the assignment
    const assignment = new CodeAssignment(parsedBody);
    await assignment.save();

    return new Response(JSON.stringify(assignment), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: error.status || 500 }
    );
  }
}
