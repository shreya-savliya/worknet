import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_UPCOMING_RETIREMENTS } from '../graphql/Queries';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  OutlinedInput,
  Select,
  MenuItem,
} from '@mui/material';

const RetireEmployee = () => {
  const { data, refetch } = useQuery(GET_UPCOMING_RETIREMENTS);
  const [retirementData, setRetirementData] = useState([]);
  const [employeeType, setEmployeeType] = React.useState('');
  const [filteredEmployee, setFilterEmployee] = useState([]);
  useEffect(() => {
    if (data && data.upcomingRetirements) {
      setRetirementData(data.upcomingRetirements);
      setFilterEmployee(data.upcomingRetirements);
    }
  }, [data]);

  useEffect(() => {
    if (employeeType !== '') {
      const filteredEmployees = retirementData.filter((employee) => {
        return employee.employeeType === employeeType;
      });
      setFilterEmployee(filteredEmployees);
    } else {
      setFilterEmployee(data?.upcomingRetirements);
    }
  }, [employeeType]);

  useEffect(() => {
    refetch();
    setFilterEmployee(data?.upcomingRetirements);
  }, []);
  console.log(employeeType, 'employee Type');

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant='h3' sx={{ fontWeight: 600, fontSize: '24px' }}>
        Upcoming Retirements
      </Typography>
      <Select
        value={employeeType}
        onChange={(e) => setEmployeeType(e.target.value)}
      >
        <MenuItem value={''} >All</MenuItem>
        <MenuItem value={'FullTime'}>FullTime</MenuItem>
        <MenuItem value={'PartTime'}>PartTime</MenuItem>
        <MenuItem value={'Contract'}>Contract</MenuItem>
        <MenuItem value={'Seasonal'}>Seasonal</MenuItem>
      </Select>
      {filteredEmployee?.length > 0 ? (
        <TableContainer
          component={Paper}
          sx={{
            marginTop: '20px !important',
          }}
        >
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell> First Name</TableCell>
                <TableCell align='right'>Last Name</TableCell>
                <TableCell align='right'> Date Of Birth</TableCell>
                <TableCell align='right'> Date Of Joining</TableCell>
                <TableCell align='right'>Title</TableCell>
                <TableCell align='right'>Department</TableCell>
                <TableCell align='right'>Employee Type</TableCell>
                <TableCell align='right'>Retirement Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredEmployee?.map((employee) => (
                <TableRow
                  key={employee.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component='th' scope='employee'>
                    {employee.firstName}
                  </TableCell>
                  <TableCell align='right'>{employee.lastName}</TableCell>
                  <TableCell align='right'>{employee.dateOfBirth}</TableCell>
                  <TableCell align='right'>{employee.dateOfJoining}</TableCell>
                  <TableCell align='right'>{employee.title}</TableCell>
                  <TableCell align='right'>{employee.department}</TableCell>
                  <TableCell align='right'>{employee.employeeType}</TableCell>
                  <TableCell align='right'>{employee.retirementDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant='body1'>No upcoming retirements.</Typography>
      )}
    </Box>
  );
};

export default RetireEmployee;
