import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { InferProps } from 'prop-types';
import { Box, Tabs } from '@material-ui/core';
import Tab from '@material-ui/core/Tab';


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
            {props.children}
        </Tabs>
    )
}
CenteredTab.propTypes = {
    value: PropTypes.number.isRequired,
    handleChange: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
}

export function LinkTab(props: InferProps<typeof LinkTab.propTypes>) {
    return (
        <Tab
            component={Link}
            {...props} />
    );
}
LinkTab.propTypes = {
    label: PropTypes.string,
    to: PropTypes.string.isRequired,
    children: PropTypes.element,
}