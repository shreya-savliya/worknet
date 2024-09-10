import { Box, ThemeProvider } from '@mui/material';
import './App.css';
import EmployeeDirectory from './components/EmployeeDirectory';
import { Route, Routes } from 'react-router-dom';
import EmployeeCreate from './components/EmployeeCreate';
import UpdateEmployee from './components/UpdateEmployee';
import EmployeeList from './components/EmployeeList';
import RetireEmployee from './components/RetireEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import { lightTheme } from './styles/theme';
import ResponsiveDrawer from './components/Drawer';
import Dashboard from './components/Dashboard';
import Employee from './components/Employee';

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Box>
        <ResponsiveDrawer>
          <Routes>
            <Route path='/' exact element={<Dashboard />} />
            <Route
              path='/add-employee'
              element={
                <Employee>
                  <EmployeeCreate />
                </Employee>
              }
            />
            <Route
              path='/get-employee'
              element={
                <Employee>
                  <EmployeeDirectory />
                </Employee>
              }
            />
            <Route
              path='/retire-employee'
              element={
                <Employee>
                  <RetireEmployee />
                </Employee>
              }
            />
            <Route
              path='/edit/:id'
              element={
                <Employee>
                  <UpdateEmployee />
                </Employee>
              }
            />
            <Route
              path='/view/:id'
              element={
                <Employee>
                  <EmployeeDetails />
                </Employee>
              }
            />
          </Routes>
        </ResponsiveDrawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
