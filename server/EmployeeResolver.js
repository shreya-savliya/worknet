import Employee from './models/employee.js';

const resolvers = {
  Query: {
    employees: async (_, { employeeType }) => {
      const query = employeeType ? { employeeType } : {};
      return await Employee.find(query);
    },
    employee: async (_, { id }) => {
      return await Employee.findById(id);
    },
    upcomingRetirements: async () => {
      try {
        const currentDate = new Date();
        const sixMonthsLater = new Date();
        sixMonthsLater.setMonth(currentDate.getMonth() + 6);

        const upcomingRetirees = await Employee.find({
          retirementDate: {
            $gte: currentDate.toISOString().split('T')[0],
            $lte: sixMonthsLater.toISOString().split('T')[0],
          },
        });

        return upcomingRetirees;
      } catch (error) {
        console.log(error);
        throw new Error('Error fetching upcoming retirements');
      }
    },
  },

  Mutation: {
    createEmployee: async (_, args) => {
      const {
        firstName,
        lastName,
        age,
        dateOfBirth,
        dateOfJoining,
        title,
        department,
        employeeType,
      } = args;

      try {
        const birthDate = new Date(dateOfBirth);
        const joiningDate = new Date(dateOfJoining);
        const retirementYear = birthDate.getFullYear() + 65;
        const retirementDate = new Date(
          retirementYear,
          joiningDate.getMonth(),
          joiningDate.getDate()
        )
          .toISOString()
          .split('T')[0];
        const currentDate = new Date().toISOString().split('T')[0];
        const newEmployeeData = new Employee({
          firstName,
          lastName,
          age,
          dateOfBirth,
          dateOfJoining,
          title,
          department,
          employeeType,
          currentStatus: retirementDate > currentDate ? 1 : 0,
          retirementDate: retirementDate,
        });

        const savedEmployeeData = await newEmployeeData.save();
        return savedEmployeeData;
      } catch (error) {
        console.log(error);
        throw new Error('new employee is not created');
      }
    },

    updateEmployee: async (
      _,
      { id, title, department, employeeType, currentStatus }
    ) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, {
          title,
          department,
          employeeType,
          currentStatus,
        });

        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }

        return updatedEmployee;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to update employee');
      }
    },
    deleteEmployee: async (_, { id }) => {
      try {
        const deletedEmployee = await Employee.findById(id);

        if (!deletedEmployee) {
          return { success: false, message: 'Employee not found' };
        }

        if (deletedEmployee.currentStatus == '1') {
          return {
            success: false,
            message: "CAN'T DELETE EMPLOYEE – STATUS ACTIVE",
          };
        }
        await Employee.findByIdAndDelete(id);
        return { success: true, message: 'Employee deleted successfully' };
      } catch (error) {
        return { success: false, message: 'Failed to delete employee' };
      }
    },
  },
};

export default resolvers;
