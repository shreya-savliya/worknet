import { Card, TextField } from '@mui/material';
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { blue, green, orange } from '@mui/material/colors';
import { colors } from '../styles/colors';
import Search from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import DashboardProfileSide from './DashboardProfileSide';
import EmployeeList from './EmployeeList';

const cards = [
  { title: 'Content Designers', candidates: 5 },
  { title: 'PHP Developers', candidates: 8 },
  { title: 'UI/UX Designer', candidates: 5 },
  { title: 'iOS Developer', candidates: 10 },
  { title: 'Android Developer', candidates: 10 },
];

const rows = [
  {
    name: 'John Doe',
    designation: 'IT',
    status: 'Retired',
    color: blue[500],
  },
  {
    name: 'Sam Emmanuel',
    designation: 'Marketing',
    status: 'Retired',
    color: orange[500],
  },
  {
    name: 'John Samuel',
    designation: 'HR',
    status: 'Retired',
    color: green[500],
  },
  {
    name: 'John Doe',
    designation: 'Engineering',
    status: 'Retired',
    color: blue[500],
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  return (
    <Grid container>
      <Grid
        item
        xs={12}
        sm={12}
        md={8.5}
        sx={{ backgroundColor: colors.grey[20], p: 5 }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                gap: 2,
                width: '100%',
                maxWidth: '70%',
                margin: '10px auto',
              }}
            >
              <TextField
                type='text'
                placeholder='search employees...'
                value={searchTerm}
                fullWidth
                size='small'
                sx={{
                  backgroundColor: colors.basics.white,
                  borderRadius: '8px',
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
            <Button
              endIcon={<ExpandMoreIcon />}
              variant='contained'
              sx={{ height: '24px', fontSize: '12px' }}
              onClick={() => {
                navigate('/add-employee');
              }}
            >
              Add New
            </Button>
          </Box>
          <Box
            sx={{
              backgroundColor: colors.basics.primary,
              width: '100%',
              height: '170px',
              borderRadius: '20px',
              mt: '25px',
            }}
          >
            <Box sx={{ p: 4 }}>
              <Typography
                variant='h2'
                sx={{
                  color: colors.basics.white,
                  fontSize: '24px',
                  letterSpacing: '1px',
                  fontWeight: 600,
                }}
              >
                Good Morning Shreya
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: colors.basics.white,
                  fontSize: '14px',
                  mt: '5px',
                  fontWeight: 300,
                  letterSpacing: '1px',
                }}
              >
                You have 75 new applications. It is a lot of work for today!
              </Typography>
              <Typography
                variant='body1'
                sx={{
                  color: colors.basics.white,
                  fontSize: '14px',
                  mt: '5px',
                  fontWeight: 300,
                  letterSpacing: '1px',
                }}
              >
                So let's start.
              </Typography>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: colors.basics.white,
                  color: colors.basics.primary,
                  textTransform: 'none',
                  height: '20px',
                  fontSize: '12px',
                  border: 'none',
                  mt: '10px',
                }}
              >
                Review It
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: '20px' }}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: '15px',
              }}
            >
              <Typography variant='h6' gutterBottom sx={{ fontWeight: 600 }}>
                You Need to Hire
              </Typography>
              <Button
                variant='contained'
                sx={{
                  textTransform: 'none',
                  height: '20px',
                  fontSize: '12px',
                  border: 'none',
                  mt: '10px',
                }}
              >
                View All
              </Button>
            </Box>
            <Grid container spacing={2} mb={3}>
              {cards.map((card) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={card.title}>
                  <Card
                    sx={{
                      padding: '15px',
                      textAlign: 'center',
                      borderRadius: '10px',
                      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    <Box
                      sx={{
                        width: '50px',
                        height: '50px',
                        bgcolor: colors.grey[30],
                        borderRadius: '50%',
                        m: '0 auto 10px',
                      }}
                    ></Box>
                    <Typography
                      variant='body1'
                      sx={{
                        fontSize: '14px',
                        fontWeight: 600,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                      }}
                    >
                      {card.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ fontSize: '13px', fontWeight: 300 }}
                    >
                      ({card.candidates} Candidates)
                    </Typography>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box><EmployeeList/></Box>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={3.5}>
        <DashboardProfileSide />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
