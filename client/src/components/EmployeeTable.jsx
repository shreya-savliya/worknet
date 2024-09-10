import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@mui/material';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useMutation } from '@apollo/client';
import { DELETE_EMPLOYEE } from '../graphql/Mutations';
import { useEmployeeContext } from '../context/EmployeeContext';
import { Link, useLocation } from 'react-router-dom';
import { getComparator, stableSort } from '../helper/sorting';

const EmployeeTable = ({ employees }) => {
  const { refetch } = useEmployeeContext();
  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('firstName');
  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const location = useLocation();
  const shouldShowActionButtons = location.pathname === '/get-employee';

  const handleClose = () => {
    setOpen(false);
    setErrorMessage('');
  };
  const deleteEmployeeData = async (id) => {
    try {
      const { data } = await deleteEmployee({ variables: { id } });
      if (data.deleteEmployee.success) {
        refetch();
      } else {
        setErrorMessage(data.deleteEmployee.message);
        setOpen(true);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedEmployees = stableSort(employees, getComparator(order, orderBy));
  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          marginTop: '20px !important',
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label='employee table'>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'firstName'}
                  direction={orderBy === 'firstName' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'firstName')}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'lastName'}
                  direction={orderBy === 'lastName' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'lastName')}
                >
                  Last Name
                </TableSortLabel>
              </TableCell>
              {shouldShowActionButtons && <TableCell align='right'>Age</TableCell>}
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'dateOfJoining'}
                  direction={orderBy === 'dateOfJoining' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'dateOfJoining')}
                >
                  Date Of Joining
                </TableSortLabel>
              </TableCell>
              {shouldShowActionButtons && <TableCell align='right'>Date Of Birth</TableCell>}
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'title'}
                  direction={orderBy === 'title' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'title')}
                >
                  Title
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'department'}
                  direction={orderBy === 'department' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'department')}
                >
                  Department
                </TableSortLabel>
              </TableCell>
              <TableCell align='right'>
                <TableSortLabel
                  active={orderBy === 'employeeType'}
                  direction={orderBy === 'employeeType' ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, 'employeeType')}
                >
                  Employee Type
                </TableSortLabel>
              </TableCell>
              <TableCell align='center'>Current Status</TableCell>
              {shouldShowActionButtons && <TableCell align='center'>Retirement Date</TableCell>}
              {shouldShowActionButtons && <TableCell></TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedEmployees?.map((employee) => (
              <TableRow
                key={employee.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='employee'>
                  {employee.firstName}
                </TableCell>
                <TableCell align='right'>{employee.lastName}</TableCell>
               {shouldShowActionButtons &&  <TableCell align='right'>{employee.age}</TableCell>}
                <TableCell align='right'>{employee.dateOfJoining}</TableCell>
              {shouldShowActionButtons &&   <TableCell align='right'>{employee.dateOfBirth}</TableCell>}
                <TableCell align='right'>{employee.title}</TableCell>
                <TableCell align='right'>{employee.department}</TableCell>
                <TableCell align='right'>{employee.employeeType}</TableCell>
                <TableCell align='right'>
                  {' '}
                  <Chip
                    label={employee.currentStatus == 1 ? 'Working' : 'Retired'}
                    color={employee.currentStatus == 1 ? 'success' : 'error'}
                  />
                </TableCell>
               {shouldShowActionButtons &&  <TableCell align='right'>{employee.retirementDate}</TableCell>}
                {shouldShowActionButtons && (
                  <TableCell align='right' sx={{ gap: '5px', display: 'flex' }}>
                    <DeleteIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        deleteEmployeeData(employee.id);
                      }}
                    />
                    <Box sx={{ borderLeft: '1px solid gray' }} />
                    <Link to={`/edit/${employee.id}`}>
                      <EditIcon sx={{ cursor: 'pointer' }} />
                    </Link>
                    <Box sx={{ borderLeft: '1px solid gray' }} />
                    <Link to={`/view/${employee.id}`}>
                      <VisibilityIcon sx={{ cursor: 'pointer' }} />
                    </Link>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ color: 'red', fontWeight: 600 }}>Error</DialogTitle>
        <DialogContent>{errorMessage}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EmployeeTable;
