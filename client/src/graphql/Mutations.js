import { gql } from '@apollo/client';

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee(
    $firstName: String!
    $lastName: String!
    $age: Int!
    $dateOfBirth: String!
    $dateOfJoining: String!
    $title: String!
    $department: String!
    $employeeType: String!
  ) {
    createEmployee(
      firstName: $firstName
      lastName: $lastName
      age: $age
      dateOfBirth: $dateOfBirth
      dateOfJoining: $dateOfJoining
      title: $title
      department: $department
      employeeType: $employeeType
    ) {
      id
      firstName
      lastName
      age
      dateOfBirth
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;
export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID!
    $title: String!
    $department: String!
    $employeeType: String!
    $currentStatus: String!
  ) {
    updateEmployee(
      id: $id
      title: $title
      department: $department
      employeeType: $employeeType
      currentStatus: $currentStatus
    ) {
      id
      title
      department
      employeeType
      currentStatus
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id){
      success
      message
    }
  }
`;
