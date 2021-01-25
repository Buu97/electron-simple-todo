import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import { AppBar, Box, Typography } from '@material-ui/core';
import CenteredTabs from '../components/CenteredTabs';
import { TaskList } from '../components/TaskList';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
      paddingTop: theme.spacing(4),
    },
  })
);
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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

const Home = () => {
  const [value, setValue] = useState(1);
  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  }

  return (
    <Fragment>
      <Head>
        <title>Task list</title>
      </Head>
      <AppBar position="static" color="transparent">
        <CenteredTabs
          value={value}
          handleChange={handleChange} />
      </AppBar>
      <TabPanel value={value} index={0}></TabPanel>
      <TabPanel value={value} index={1}>
        <TaskList/>
      </TabPanel>
    </Fragment>
  );
};

export default Home;
