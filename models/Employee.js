const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    position: { type: String, required: true },
    salary: {
      type: Number,
      required: true,
      min: [0, "The salary cannot be negative"],
    },
    date_of_joining: { type: Date }, 
    department: { type: String },    
  },
  { timestamps: true }
);

// Transform output so `_id` becomes `employee_id`
employeeSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.employee_id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;