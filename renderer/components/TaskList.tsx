import { useState } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography
} from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PropTypes, { InferProps } from 'prop-types';
import { Task } from '../../main/database/models/Task';

const useStyles = makeStyles(() => createStyles({
    root: {
        width: '100%'
    }
}));


export function TaskList({ tasks }: InferProps<typeof TaskList.propTypes>) {
    const classes = useStyles();
    const [taskList, setTaskList] = useState(tasks);

    return (
        <div className={classes.root}>
            { renderTaskList(taskList)}
        </div>
    );
}
TaskList.propTypes = {
    tasks: PropTypes.array.isRequired
}

function renderTaskList(tasks: Task[]) {
    return tasks.map((task, index) => (
        <TaskItem
            title={task.title}
            description={task.description}
            key={task.id} />
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
