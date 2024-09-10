import React from 'react';
import { colors } from '../styles/colors';
import { Box, Avatar, IconButton, Typography } from '@mui/material';
import { Search, Notifications, Settings } from '@mui/icons-material';

const Employee = ({ children }) => {
  return (
    <Box
      sx={{
        bgcolor: colors.grey[20],
        padding: 3,
        minHeight: '100vh',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: '30px',
        }}
      >
        <Box>
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <Settings />
          </IconButton>
          <IconButton>
            <Notifications />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', gap: '10px' }}>
          <Box>
            <Typography
              variant='body1'
              sx={{ color: colors.basics.primary, fontWeight: 600 }}
            >
              Shreya Savaliya
            </Typography>
            <Typography variant='body2' sx={{ color: colors.basics.primary }}>
              View profile
            </Typography>
          </Box>
          <Avatar
            alt='Shreya Savaliya'
            src='/static/images/avatar/1.jpg'
            sx={{ bgcolor: colors.basics.primary }}
          />
        </Box>
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default Employee;
