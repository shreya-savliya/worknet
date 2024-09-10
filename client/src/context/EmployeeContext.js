import React, { createContext, useContext, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_EMPLOYEES } from '../graphql/Queries';

const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const { loading, error, data, refetch } = useQuery(GET_EMPLOYEES);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (data?.employees) {
      setEmployees(data.employees);
    }
  }, [data]);

  const updateEmployees = (newEmployees) => {
    setEmployees(newEmployees);
  };


  if (loading) return <p>Loading...</p>;
  return (
    <EmployeeContext.Provider value={{ loading, error, employees, refetch ,updateEmployees}}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployeeContext = () => useContext(EmployeeContext);
