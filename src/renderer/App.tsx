import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { AppBar, } from '@material-ui/core';
import { theme } from './lib/theme';
import { CenteredTab, TabPanel } from './components/tabs';
import { TaskList } from './components/task';

const App = () => {
    const [value, setValue] = useState(1);
    const handleChange = (event: any, newValue: number) => {
        setValue(newValue);
    }
    const tasks = [
        {
            title: 'Test task',
            description: 'Task description'
        }
    ]

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
