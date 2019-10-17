import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from '../styles/globalStyles';
import theme from '../styles/theme';
import Routes from './Routes';

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

function App() {
  const {
    data: { isLoggedIn }
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Router>
          <Routes isLoggedIn={isLoggedIn} />
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_RIGHT} />
      </>
    </ThemeProvider>
  );
}

export default App;
