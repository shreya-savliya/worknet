import React, { useEffect, useState } from 'react';
import EmployeeTable from './EmployeeTable';
import { Box, Button, TextField } from '@mui/material';
import { useEmployeeContext } from '../context/EmployeeContext';
import SearchIcon from '@mui/icons-material/Search';
import Search from '@mui/icons-material/Search';
import { colors } from '../styles/colors';

const EmployeeDirectory = () => {
  const { error, employees } = useEmployeeContext();
  const [employeeData, setEmployeeData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (employees) setEmployeeData(employees);
  }, [employees]);

  useEffect(() => {
    const filteredEmployee = employees?.filter((employee) => {
      return (
        employee?.firstName
          ?.toLowerCase()
          ?.includes(searchTerm?.toLowerCase()) ||
        employee?.lastName?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    });
    setEmployeeData(filteredEmployee);
    if (!searchTerm) setEmployeeData(employees);
  }, [searchTerm]);

  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          mt: '20px',
        }}
      >
        <TextField
          type='text'
          placeholder='Search employees...'
          value={searchTerm}
          fullWidth
          sx={{
            backgroundColor: colors.basics.white,
            borderRadius: '8px !important',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'transparent !important',
              },
              '&:hover fieldset': {
                borderColor: 'transparent !important',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'transparent !important',
              },
            },
          }}
          InputProps={{
            startAdornment: <Search sx={{ marginRight: '7px' }} />,
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <EmployeeTable employees={employeeData} />
    </Box>
  );
};

export default EmployeeDirectory;
