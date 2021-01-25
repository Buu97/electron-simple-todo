import {
    Paper,
    Accordion, AccordionSummary, AccordionDetails,
    Typography
} from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
    root: {
        flexGrow: 1
    }
}));


export const TaskList = () => {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <TaskItem
                title="Lorem ipsum dolor sit."
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, illo." />
            <TaskItem
                title="Lorem ipsum dolor sit amet consectetur adipisicing."
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Sit rerum facilis quisquam quas modi molestias numquam debitis ab ipsam libero laborum alias,
                ut repellat amet magni voluptatem.
                Ea provident earum minima nemo nostrum repellendus, consequuntur aperiam vel quod!
                Natus doloribus nulla facere iure temporibus voluptates sed totam alias expedita harum." />
        </Paper>
    );
}

export const TaskItem = (props: any) => {
    return (
        <Accordion>
            <AccordionSummary>
                <Typography>{props.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {props.description}
            </AccordionDetails>
        </Accordion>
    );
}
