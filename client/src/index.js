import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';

const client = new ApolloClient({
  uri: 'http://localhost:7000/graphql',
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <EmployeeProvider>
          <App />
        </EmployeeProvider>
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
