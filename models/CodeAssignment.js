const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  assignmentName: String,
  questions: [
    {
      company: String,
      questionName: String,
      description: String,
      topic: String,
      marks: Number,
      arguements: String,
      inputs: String,
      executiontime: String,
      memory: String,
      function: String,
      results: [
        {
          studentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
          },
          code: [],
          marks: {
            type: Number,
          },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      testCases: [
        {
          input: String,
          output: String,
          marks: String,
        },
      ],
      selectedLevels: [String],
    },
  ],
  faculties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
    },
  ],
  visibility: {
    type: String,
    default: "true",
  },
});
const CodeAssignment = mongoose.models.CodeAssignment || mongoose.model('CodeAssignment', assignmentSchema);
export default CodeAssignment;
