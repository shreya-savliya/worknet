import mongoose from 'mongoose';
const uri =
  'mongodb+srv://shreyasavaliya2801:Shreya0801@cluster0.ja95ybi.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error(err);
  });

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  dateOfBirth: String,
  dateOfJoining: String,
  title: String,
  department: String,
  employeeType: String,
  retirementDate: String,
  currentStatus: {
    type: String,
    default: '1',
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
