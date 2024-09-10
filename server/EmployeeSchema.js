import { gql } from 'apollo-server-express';
const typeDefs = gql`
  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfBirth: String!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: String!
    retirementDate: String!
  }
  type DeleteEmployeeResponse {
    success: Boolean!
    message: String
  }
  type Query {
    employees(employeeType: String): [Employee]
    employee(id: ID!): Employee
    upcomingRetirements(employeeType: String): [Employee]
  }

  type Mutation {
    createEmployee(
      firstName: String!
      lastName: String!
      age: Int!
      dateOfBirth: String!
      dateOfJoining: String!
      title: String!
      department: String!
      employeeType: String!
    ): Employee

    updateEmployee(
      id: ID!
      title: String!
      department: String!
      employeeType: String!
      currentStatus: String!
    ): Employee

    deleteEmployee(id: ID!): DeleteEmployeeResponse!
  }
`;
export default typeDefs;
