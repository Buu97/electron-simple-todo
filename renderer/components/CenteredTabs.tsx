import { Tabs, Tab } from '@material-ui/core';

const CenteredTabs = (props) => {
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
    );
}

export default CenteredTabs;