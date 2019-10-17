import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/globalStyles';
import theme from '../styles/theme';
import Routes from './Routes';

function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Routes isLoggedIn={false} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
