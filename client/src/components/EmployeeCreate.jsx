import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_EMPLOYEE } from '../graphql/Mutations';
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';

const initialEmployeeState = {
  firstName: '',
  lastName: '',
  age: '',
  dateOfBirth: '',
  dateOfJoining: '',
  title: '',
  department: '',
  employeeType: '',
};

const EmployeeCreate = () => {
  const [employee, setEmployee] = useState(initialEmployeeState);
  const [errors, setErrors] = useState({});
  const { refetch } = useEmployeeContext();
  const [createEmployee, { error }] = useMutation(CREATE_EMPLOYEE);
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!employee.firstName) newErrors.firstName = 'First name is required';
    if (!employee.lastName) newErrors.lastName = 'Last name is required';
    if (!employee.age || employee.age < 20 || employee.age > 70) {
      newErrors.age = 'Age must be between 20 and 70';
    }
    if (!employee.dateOfBirth)
      newErrors.dateOfBirth = 'Date of Birth is required';
    if (!employee.dateOfJoining)
      newErrors.dateOfJoining = 'Date of joining is required';
    if (!employee.title) newErrors.title = 'Title is required';
    if (!employee.department) newErrors.department = 'Department is required';
    if (!employee.employeeType)
      newErrors.employeeType = 'Employee type is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createEmployee({
        variables: {
          ...employee,
          age: parseInt(employee.age, 10),
        },
      });
      refetch();
      navigate('/get-employee');
      setEmployee(initialEmployeeState);
      setErrors({});
    } catch (error) {
      console.error('Error creating employee:', error);
    }
  };

  return (
    <Box sx={{ p: 5 }}>
      <Typography variant='h3' sx={{ fontWeight: 600, fontSize: '24px' }}>
        Hire New Candidate
      </Typography>
      <Box sx={{ mt: '15px' }}>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 0, lg: '30px' },
              flexWrap: { xs: 'wrap', lg: 'nowrap' },
            }}
          >
            <TextField
              name='firstName'
              type='text'
              label='First Name'
              variant='outlined'
              fullWidth
              value={employee.firstName}
              onChange={handleChange}
              sx={{ mb: '20px' }}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
            <TextField
              name='lastName'
              type='text'
              value={employee.lastName}
              onChange={handleChange}
              fullWidth
              label='Last Name'
              variant='outlined'
              sx={{ mb: '20px' }}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 0, lg: '30px' },
              flexWrap: { xs: 'wrap', lg: 'nowrap' },
            }}
          >
            <TextField
              name='age'
              type='number'
              value={employee.age}
              onChange={handleChange}
              fullWidth
              min='20'
              max='70'
              sx={{ mb: '20px' }}
              label='Age'
              variant='outlined'
              error={!!errors.age}
              helperText={errors.age}
            />

            <TextField
              type='date'
              name='dateOfBirth'
              label='Date Of Birth'
              variant='outlined'
              fullWidth
              value={employee.dateOfBirth}
              onChange={handleChange}
              sx={{ mb: '20px' }}
              error={!!errors.dateOfBirth}
              helperText={errors.dateOfBirth}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              type='date'
              name='dateOfJoining'
              label='Date Of Joining'
              variant='outlined'
              fullWidth
              value={employee.dateOfJoining}
              onChange={handleChange}
              placeholder='Date Of Joining'
              sx={{ mb: '20px' }}
              error={!!errors.dateOfJoining}
              helperText={errors.dateOfJoining}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>
          <TextField
            select
            label='Position'
            name='title'
            value={employee.title}
            onChange={handleChange}
            fullWidth
            sx={{ mb: '20px' }}
            error={!!errors.title}
            helperText={errors.title}
          >
            <MenuItem value={'Employee'}>Employee</MenuItem>
            <MenuItem value={'Manager'}>Manager</MenuItem>
            <MenuItem value={'Director'}>Director</MenuItem>
            <MenuItem value={'VP'}>VP</MenuItem>
          </TextField>
          <TextField
            select
            label='Department'
            name='department'
            value={employee.department}
            onChange={handleChange}
            fullWidth
            placeholder='Department'
            sx={{ mb: '20px' }}
            error={!!errors.department}
            helperText={errors.department}
          >
            <MenuItem value={'IT'}>IT</MenuItem>
            <MenuItem value={'Marketing'}>Marketing</MenuItem>
            <MenuItem value={'HR'}>HR</MenuItem>
            <MenuItem value={'Engineering'}>Engineering</MenuItem>
          </TextField>
          <TextField
            select
            label='Employee Type'
            name='employeeType'
            value={employee.employeeType}
            placeholder='Employee Type'
            onChange={handleChange}
            fullWidth
            sx={{ mb: '20px' }}
            error={!!errors.employeeType}
            helperText={errors.employeeType}
          >
            <MenuItem value={'FullTime'}>FullTime</MenuItem>
            <MenuItem value={'PartTime'}>PartTime</MenuItem>
            <MenuItem value={'Contract'}>Contract</MenuItem>
            <MenuItem value={'Seasonal'}>Seasonal</MenuItem>
          </TextField>
          <Button type='submit' variant='contained' sx={{ padding: '10px' }}>
            Create Employee
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
    </Box>
  );
};

export default EmployeeCreate;
