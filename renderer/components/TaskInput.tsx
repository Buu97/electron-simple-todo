import { Paper, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { SyntheticEvent, useContext, useState } from 'react';
import AppContext from './state/AppContext';

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


export const TaskInput = () => {
    const classes = useStyles();
    const [text, setText] = useState('');
    const { addTask } = useContext(AppContext);

    const handleInput = ({ key }) => {
        if (key === 'Enter' && text?.trim()?.length > 5) {
            addTask({ title: text, description: '' });
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
