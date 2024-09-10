import { useMutation, useQuery } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EDIT_EMPLOYEE } from '../graphql/Queries';
import { UPDATE_EMPLOYEE } from '../graphql/Mutations';

const UpdateEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data, refetch } = useQuery(EDIT_EMPLOYEE, {
    variables: { id },
  });

  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE);

  const [updateEmployeeData, setUpdateEmployeeData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
    currentStatus: '',
  });
  useEffect(() => {
    if (data) {
      const {
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
      } = data?.employee;
      setUpdateEmployeeData({
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log([name], value, '[name]: value');
    setUpdateEmployeeData({
      ...updateEmployeeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateEmployee({
        variables: {
          id,
          title: updateEmployeeData.title,
          department: updateEmployeeData.department,
          employeeType: updateEmployeeData.employeeType,
          currentStatus: updateEmployeeData.currentStatus,
        },
      });
      navigate('/get-employee');
      refetch();
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '80%',
        margin: '0 auto',
        display: 'flex',
        boxShadow:
          '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)',
        padding: '24px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          name='firstName'
          type='text'
          fullWidth
          value={updateEmployeeData.firstName}
          onChange={handleChange}
          placeholder='First Name'
          sx={{ mb: '20px' }}
          disabled
        />
        <TextField
          name='lastName'
          type='text'
          value={updateEmployeeData.lastName}
          onChange={handleChange}
          fullWidth
          placeholder='Last Name'
          sx={{ mb: '20px' }}
          disabled
        />
        <TextField
          name='age'
          type='number'
          value={updateEmployeeData.age}
          onChange={handleChange}
          disabled
          fullWidth
          min='20'
          max='70'
          sx={{ mb: '20px' }}
          placeholder='Age'
        />
        <TextField
          type='date'
          name='dateOfJoining'
          fullWidth
          value={updateEmployeeData.dateOfJoining}
          onChange={handleChange}
          placeholder='Date Of Joining'
          disabled
          sx={{ mb: '20px' }}
        />
        <Select
          name='title'
          value={updateEmployeeData.title}
          onChange={handleChange}
          fullWidth
          label='Title'
          sx={{ mb: '20px' }}
        >
          <MenuItem value={'Employee'}>Employee</MenuItem>
          <MenuItem value={'Manager'}>Manager</MenuItem>
          <MenuItem value={'Director'}>Director</MenuItem>
          <MenuItem value={'VP'}>VP</MenuItem>
        </Select>
        <Select
          name='department'
          value={updateEmployeeData.department}
          onChange={handleChange}
          fullWidth
          sx={{ mb: '20px' }}
          placeholder='Department'
        >
          <MenuItem value={'IT'}>IT</MenuItem>
          <MenuItem value={'Marketing'}>Marketing</MenuItem>
          <MenuItem value={'HR'}>HR</MenuItem>
          <MenuItem value={'Engineering'}>Engineering</MenuItem>
        </Select>
        <Select
          name='employeeType'
          value={updateEmployeeData.employeeType}
          placeholder='Employee Type'
          onChange={handleChange}
          fullWidth
          sx={{ mb: '20px' }}
        >
          <MenuItem value={'FullTime'}>FullTime</MenuItem>
          <MenuItem value={'PartTime'}>PartTime</MenuItem>
          <MenuItem value={'Contract'}>Contract</MenuItem>
          <MenuItem value={'Seasonal'}>Seasonal</MenuItem>
        </Select>
        <FormControl
          sx={{
            display: 'flex !important',
            mb: '10px',
          }}
        >
          <FormLabel id='demo-row-radio-buttons-group-label'>
            Current Status
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby='demo-row-radio-buttons-group-label'
            name='currentStatus'
            value={updateEmployeeData.currentStatus}
            onChange={handleChange}
          >
            <FormControlLabel value='1' control={<Radio />} label='Working' />
            <FormControlLabel value='0' control={<Radio />} label='Retired' />
          </RadioGroup>
        </FormControl>
        <Button type='submit' variant='contained' sx={{ padding: '10px' }}>
          Update Employee
        </Button>
        {error && (
          <Typography
            variant='body1'
            sx={{
              mt: '8px',
              fontSize: '14px',
              color: 'red',
            }}
          >
            Error creating employee: {error.message}
          </Typography>
        )}
      </form>
    </Box>
  );
};

export default UpdateEmployee;
