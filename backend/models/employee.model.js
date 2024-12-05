import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    course: { type: String, required: true, trim: true },
    role: { type: String, required: true, enum: ["Manager", "Developer", "Designer"] },
    employeeId: { type: String, unique: true }, // Add employeeId
  }, { timestamps: true });
  
  // Middleware to auto-generate a unique employeeId
  employeeSchema.pre("save", function (next) {
    if (!this.employeeId) {
      this.employeeId = `EMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    }
    next();
  });
  

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
