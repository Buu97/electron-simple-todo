import React, { Fragment, useState } from 'react';
import PropTypes, { InferProps } from 'prop-types';
import Head from 'next/head';
import { AppBar, Box } from '@material-ui/core';
import CenteredTabs from '../components/CenteredTabs';
import { TaskList } from '../components/TaskList';
import { TaskInput } from '../components/TaskInput';
import { GetStaticProps } from 'next';

function TabPanel(props: InferProps<typeof TabPanel.propTypes>) {
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

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      tasks : [
        {
          title: 'An example of task',
          description: 'This is a static task fetched from GetStaticProps.'
        }
      ]
    }
  }
}


function Home(props: InferProps<typeof Home.propTypes>) {
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
        <TaskInput />
        <TaskList
          tasks={props.tasks} />
      </TabPanel>
    </Fragment>
  );
};
Home.propTypes = {
  tasks: PropTypes.array.isRequired
}

export default Home;
