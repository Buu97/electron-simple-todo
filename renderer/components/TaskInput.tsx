import { Paper, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        marginBottom: theme.spacing(2),
        padding: theme.spacing()
    }
}));


export const TaskInput = () => {
    const classes = useStyles();
    return (
        <Paper
            className={classes.root} >
            <TextField
                variant="outlined"
                size="small" />
        </Paper>
    );
}
