import { Box, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_SINGLE_EMPLOYEE } from '../graphql/Queries';

const EmployeeDetails = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_SINGLE_EMPLOYEE, {
    variables: { id },
  });

  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
    currentStatus: '',
    retirementDate: '',
  });

  const [retirementTime, setRetirementTime] = useState('');

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
        retirementDate,
      } = data?.employee;

      setEmployeeData({
        firstName,
        lastName,
        age,
        dateOfJoining,
        title,
        department,
        employeeType,
        currentStatus,
        retirementDate,
      });

      const retirementDateObj = new Date(retirementDate);
      const currentDate = new Date(); 

      if (retirementDateObj < currentDate) {
        setRetirementTime('Retired');
      } else {
        let years = retirementDateObj.getFullYear() - currentDate.getFullYear();
        let months = retirementDateObj.getMonth() - currentDate.getMonth();
        let days = retirementDateObj.getDate() - currentDate.getDate();

        if (days < 0) {
          months--;
          days += new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
          ).getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }

        setRetirementTime(`${days} days, ${months} months, ${years} years`);
      }
    }
  }, [data]);

  return (
    <Box>
      <Typography
        variant='h1'
        sx={{
          fontSize: '32px',
          textAlign: 'center',
          margin: '20px 0',
        }}
      >
        User Profile
      </Typography>
      <Card sx={{ display: 'flex' }}>
        <Box
          sx={{
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              backgroundColor: 'lightskyblue',
            }}
          ></Box>
          <Typography variant='subtitle1'>
            {employeeData?.firstName} {employeeData?.lastName}
          </Typography>
        </Box>
        <CardContent
          sx={{
            gap: '20px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            borderLeft: '1px solid lightgray',
          }}
        >
          <Typography>{employeeData.department}</Typography>
          <Divider component={'div'} sx={{ width: '100%' }} />
          <Typography>{employeeData.title}</Typography>
          <Divider component={'div'} sx={{ width: '100%' }} />
          <Typography>{employeeData.dateOfJoining}</Typography>
          <Divider component={'div'} sx={{ width: '100%' }} />
          <Typography>{retirementTime}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDetails;
