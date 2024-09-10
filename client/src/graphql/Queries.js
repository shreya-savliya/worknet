import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  query GetEmployees($employeeType: String) {
    employees(employeeType: $employeeType) {
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
      retirementDate
    }
  }
`;

export const GET_SINGLE_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
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
      retirementDate
    }
  }
`;

export const EDIT_EMPLOYEE = gql`
  query GetEmployee($id: ID!) {
    employee(id: $id) {
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

export const GET_UPCOMING_RETIREMENTS = gql`
  query GetUpcomingRetirements {
    upcomingRetirements {
      id
      firstName
      lastName
      dateOfBirth
      dateOfJoining
      title
      department
      employeeType
      retirementDate
    }
  }
`;
