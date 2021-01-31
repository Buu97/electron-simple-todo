import React from 'react';
import PropTypes, { InferProps } from 'prop-types';
import { Box, Tabs, Tab } from '@material-ui/core';


export function TabPanel(props: InferProps<typeof TabPanel.propTypes>) {
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

export function CenteredTab(props: InferProps<typeof CenteredTab.propTypes>) {
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
