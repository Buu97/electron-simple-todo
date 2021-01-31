import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './lib/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, } from '@material-ui/core';
import { CenteredTab, TabPanel } from './components/tabs';
import { TaskList } from './components/task';

function App() {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  const tasks = [];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static" color="transparent">
        <CenteredTab
          value={value}
          handleChange={handleChange} />
      </AppBar>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        <TaskList
          tasks={tasks} />
      </TabPanel>
    </ThemeProvider>
  );
}

export default App;
