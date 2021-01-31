import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tabs, Tab } from '@material-ui/core';


export function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other} >
            {value === index && (
                <Box p={3}>
                    {children}
                </Box>
            )}
        </div>
    );
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

export function CenteredTab (props) {
    return (
        <Tabs
            value={props.value}
            onChange={props.handleChange}
            textColor="primary"
            indicatorColor="primary"
            centered>
            <Tab label="Lists" />
            <Tab label="Scheduled" />
        </Tabs>
    )
}
CenteredTab.propTypes = {
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
}
