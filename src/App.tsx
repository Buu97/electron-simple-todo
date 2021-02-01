import React from 'react';
import { Route, HashRouter, Switch, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './lib/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, } from '@material-ui/core';
import { CenteredTab, LinkTab } from './components/tabs';
import { TaskList } from './components/task';
import TaskGroups from './pages/TaskGroups';

function Router({ children }) {
  if (process.env.NODE_ENV === 'production') {
    return (
      <HashRouter>
        {children}
      </HashRouter>
    );
  } else {
    return (
      <BrowserRouter>
        {children}
      </BrowserRouter>
    );
  }
}

function App() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />

        <AppBar position="static" color="transparent">
          <CenteredTab
            value={value}
            handleChange={handleChange}>
            <LinkTab
              to="/"
              label="List" />
            <LinkTab
              to="/scheduled"
              label="Scheduled" />
          </CenteredTab>
        </AppBar>
        <Switch>
          <Route path="/scheduled" component={TaskList} />
          <Route path="/" exact component={TaskGroups} />
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
