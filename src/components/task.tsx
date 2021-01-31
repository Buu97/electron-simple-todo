import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import {
    Paper,
    TextField
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';
import TaskItem from './taskItem';

const useStyles = makeStyles((theme) => createStyles({
    root: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing(),
        display: 'flex',
        justifyItems: 'stretch'
    },
    formControl: {
        flexGrow: 1
    }
}));

export function TaskInput(props: InferProps<typeof TaskInput.propTypes>) {
    const classes = useStyles();
    const [text, setText] = useState('');

    const handleInput = ({ key }: any) => {
        if (key === 'Enter' && text?.trim()?.length > 5) {
            props.addTask({ title: text, description: '' });
            setText('');
        }
    }
    const handleTextChange = ({ target }: any) => {
        setText(target.value);
    }

    return (
        <Paper
            className={classes.root} >
            <TextField
                variant="outlined"
                size="small"
                className={classes.formControl}
                value={text}
                onChange={handleTextChange}
                onKeyPress={handleInput} />
        </Paper>
    );
}
TaskInput.propTypes = {
    addTask: PropTypes.func.isRequired,
}

export function TaskList({ tasks }: InferProps<typeof TaskList.propTypes>) {
    const [taskList, setTaskList] = useState(tasks);

    const addTask = (task: any) => {
        setTaskList([...taskList, task]);
        ipcRenderer.send('add_task', task);
    }
    const updateTask = (task: any) => {
        const index = taskList.findIndex(t =>t.id === task.id);
        taskList[index] = {...taskList[index], task};
        setTaskList(taskList);
        ipcRenderer.send('update_task', task);
    }
    
    const renderTasks = (list: any[]) => {
        return list.map((task, index) => (
            <TaskItem
                task={task}
                updateTask={updateTask}
                key={index} />
        ));
    }

    useEffect(() => {
        ipcRenderer.invoke('get_task_list').then(list => {
            setTaskList(list);
        });
    }, []);

    return (
        <div>
            <TaskInput
                addTask={addTask} />
            { renderTasks(taskList)}
        </div>
    );
}
TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
}