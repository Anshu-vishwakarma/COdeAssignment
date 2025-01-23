import dbConnect from "@/utils/dbConnect";
import CodeAssignment from "@/models/CodeAssignment";
import { verifyAdmin } from "@/utils/auth";

export default async function handler(req, res) {
  await dbConnect();

  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET": // Get a single assignment
      try {
        const assignment = await CodeAssignment.findById(id);
        if (!assignment) {
          return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json(assignment);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;

    case "PUT": // Update an assignment (admin only)
      try {
        await verifyAdmin(req); // Verify admin role
        const updatedAssignment = await CodeAssignment.findByIdAndUpdate(id, req.body, {
          new: true,
        });
        if (!updatedAssignment) {
          return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json(updatedAssignment);
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
      }
      break;

    case "DELETE": // Delete an assignment (admin only)
      try {
        await verifyAdmin(req); // Verify admin role
        const deletedAssignment = await CodeAssignment.findByIdAndDelete(id);
        if (!deletedAssignment) {
          return res.status(404).json({ error: "Assignment not found" });
        }
        res.status(200).json({ message: "Assignment deleted successfully" });
      } catch (error) {
        res.status(error.status || 500).json({ error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
