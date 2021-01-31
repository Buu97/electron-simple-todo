import { Accordion, AccordionDetails, AccordionSummary, TextField, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ExpandMore } from "@material-ui/icons";
import React from "react";
import PropTypes, { InferProps } from 'prop-types'


const useStyles = makeStyles(() => createStyles({
    root: {
        padding: '0px 16px 8px'
    },
    item: {
        display: 'flex'
    },
    formControl: {
        flexGrow: 1
    }
}))
export default function TaskItem({ task, updateTask }: InferProps<typeof TaskItem.propTypes>) {
    const classes = useStyles();
    // const [ description, setDescription ] = useState(props.description);

    const handleBlur = ({ target: { value } }: React.FocusEvent<HTMLInputElement>) => {
        if (value !== task.description) {
            updateTask({ id: task.id, description: value });
        }
    }


    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />} >
                <Typography>
                    {task.title}
                </Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={8} className={classes.item}>
                        <TextField
                            multiline rows={4}
                            variant="outlined"
                            size="small"
                            defaultValue={task.description}
                            onBlur={handleBlur}
                            className={classes.formControl} />
                    </Grid>
                    <Grid item xs={4}></Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
}
TaskItem.propTypes = {
    task: PropTypes.any.isRequired,
    updateTask: PropTypes.func.isRequired,
}