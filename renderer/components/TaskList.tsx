import { useContext } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppContext from './state/AppContext';

const useStyles = makeStyles(() => createStyles({
    root: {
        width: '100%'
    }
}));


export const TaskList = () => {
    const classes = useStyles();
    const { tasks } = useContext(AppContext);

    return (
        <div className={classes.root}>
            { renderTaskList(tasks) }
        </div>
    );
}

function renderTaskList(tasks: any[]) {
    return tasks.map((task, index) => (
        <TaskItem
            title={task.title}
            description={task.description}
            key={index} />
    ));
}

export const TaskItem = (props: any) => {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />} >
                <Typography>{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.description}
            </AccordionDetails>
        </Accordion>
    );
}
