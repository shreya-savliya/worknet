import React from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Avatar,
  IconButton,
  styled,
  Card,
  ListItem,
  List,
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { colors } from '../styles/colors';

const applicants = [
  { name: 'Mike Tyson', role: 'iOS Developer', avatar: 'path_to_image' },
  { name: 'Zara Thomas', role: 'Content Designer', avatar: 'path_to_image' },
  { name: 'Neenu Abraham', role: 'Content Designer', avatar: 'path_to_image' },
  { name: 'John Samuel', role: 'iOS Developer', avatar: 'path_to_image' },
];

const trainees = [
  { name: 'Mike Tyson', role: 'iOS Dev.', avatar: 'path_to_image' },
  { name: 'Samuel John', role: 'Android Dev.', avatar: 'path_to_image' },
  { name: 'Jiya George', role: 'UI/UX Designer', avatar: 'path_to_image' },
];
const cards = [
  { day: 'Mon', date: '22' },
  { day: 'Tue', date: '23' },
  { day: 'Wed', date: '24' },
  { day: 'Thu', date: '25' },
  { day: 'Fri', date: '26' },
];
const DashboardProfileSide = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          backgroundColor: colors.basics.white,
          padding: '20px',
          borderRadius: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: '#000',
          marginBottom: '20px',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Avatar alt='Shreya Savaliya' src='path_to_avatar_image' />
          <Box ml={2}>
            <Typography variant='h6'>Shreya Savaliya</Typography>
            <Typography variant='body2' color='textSecondary'>
              View profile
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton>
            <CalendarTodayIcon />
          </IconButton>
        </Box>
      </Box>

      <Box mb={3}>
        <Typography variant='h6'>Schedule Calendar</Typography>
        <Grid container columnSpacing={2} mb={3} sx={{ mt: '15px' }}>
          {cards.map((card) => (
            <Grid item xs={2.4} key={card.title}>
              <Card
                sx={{
                  padding: '15px',
                  textAlign: 'center',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                  bgcolor: colors.grey[20],
                  color: colors.basics.primary,
                }}
              >
                <Typography
                  variant='body1'
                  sx={{
                    fontSize: '14px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {card.day}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontSize: '13px', fontWeight: 300 }}
                >
                  {card.date}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mb={3}>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h6'>New Applicants</Typography>
          <Button variant='text' sx={{ textTransform: 'none' }}>
            View All
          </Button>
        </Box>
        <List
          sx={{
            width: '100%',
            maxWidth: '100%',
            borderRadius: '10px',
            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
            bgcolor: colors.grey[20],
          }}
        >
          {applicants.map((applicant, index) => (
            <ListItem
              key={index}
              secondaryAction={
                <>
                  <IconButton>
                    <PhoneIcon />
                  </IconButton>
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                </>
              }
            >
              <Avatar alt={applicant.name} src={applicant.avatar} />
              <Box ml={2} flexGrow={1}>
                <Typography variant='subtitle1'>{applicant.name}</Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: colors.basics.primary,

                    fontSize: '12px',
                  }}
                >
                  Applied for: {applicant.role}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <Box
          display='flex'
          justifyContent='space-between'
          alignItems='center'
          mb={2}
        >
          <Typography variant='h6'>Ready For Training</Typography>
          <Button variant='text' sx={{ textTransform: 'none' }}>
            View All
          </Button>
        </Box>
        <Grid container spacing={2}>
          {trainees.map((trainee) => (
            <Grid item xs={4} key={trainee.name}>
              <Card
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px',
                  borderRadius: '10px',
                }}
              >
                <Avatar
                  alt={trainee.name}
                  src={trainee.avatar}
                  sx={{ margin: 'auto', mb: 1 }}
                />
                <Typography
                  variant='body2'
                  sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    fontSize: '13px',
                  }}
                >
                  {trainee.name}
                </Typography>
                <Typography
                  variant='caption'
                  color='textSecondary'
                  sx={{ whiteSpace: 'nowrap', overflow: 'hidden' }}
                >
                  {trainee.role}
                </Typography>
                <Button
                  variant='contained'
                  sx={{
                    textTransform: 'none',
                    height: '20px',
                    fontSize: '10px',
                    border: 'none',
                    mt: '10px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    padding: '5px',
                  }}
                >
                  Start Training
                </Button>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default DashboardProfileSide;
