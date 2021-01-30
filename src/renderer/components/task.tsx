import React, { useState, useEffect } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import {
    Accordion, AccordionDetails, AccordionSummary,
    Typography,
    Paper,
    TextField,
    Theme
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { ipcRenderer } from 'electron';

const useStyles = makeStyles((theme: Theme) => createStyles({
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

    const handleInput = ({ key }) => {
        if (key === 'Enter' && text?.trim()?.length > 5) {
            props.addTask({ title: text, description: '' });
            setText('');
        }
    }
    const handleTextChange = ({ target }) => {
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

    const renderTasks = (list: any[]) => {
        return list.map((task, index) => (
            <TaskItem
                title={task.title}
                description={task.description}
                key={index} />
        ))
    }
    const addTask = (task: any) => {
        setTaskList([...taskList, task]);
    }

    useEffect(() => {
        ipcRenderer.invoke('get_task_list').then(list => {
            setTaskList(list);
            console.log(list);
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

const TaskItem = (props) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />} >
                <Typography>
                    {props.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.description}
            </AccordionDetails>
        </Accordion>
    );
}
