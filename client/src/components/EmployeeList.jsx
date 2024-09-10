import React from 'react';
import { useQuery } from '@apollo/client';
import EmployeeTable from './EmployeeTable';
import { GET_EMPLOYEES } from '../graphql/Queries';
import { Select, MenuItem, Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { employees,updateEmployees } = useEmployeeContext();
  const employeeTypeQueryParam = searchParams.get('employeeType') || 'All';

  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES, {
    variables: {
      employeeType:
        employeeTypeQueryParam !== 'All' ? employeeTypeQueryParam : null,
    },
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      updateEmployees(data.employees);
    },
  });

  const handleEmployeeTypeChange = (event) => {
    const { value: selectedType } = event.target;
    navigate(`/?employeeType=${selectedType}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box sx={{mt:'20px'}}>
      <Select
        value={employeeTypeQueryParam}
        onChange={handleEmployeeTypeChange}
        sx={{
          width: '100%',
          maxWidth: '70%',
          margin: '0 auto !important',
          display: 'flex',
        }}
        fullWidth
      >
        <MenuItem value='All'>All Employees</MenuItem>
        <MenuItem value='FullTime'>Full Time</MenuItem>
        <MenuItem value='PartTime'>Part Time</MenuItem>
        <MenuItem value='Contract'>Contract</MenuItem>
        <MenuItem value='Seasonal'>Seasonal</MenuItem>
      </Select>
      <EmployeeTable refetch={refetch}  employees={employees} />
    </Box>
  );
};

export default EmployeeList;
