import { createContext, useState } from 'react';

const AppContext = createContext({ tasks: [] } as any);
type Task = {
    title: string;
    description?: string;
}

export const AppWrapper = ({ children }) => {

    const [tasks, setTasks] = useState([
        {
            title: 'Lorem ipsum dolor sit.',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores, illo.'
        },
        {
            title: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Sit rerum facilis quisquam quas modi molestias numquam debitis ab ipsam libero laborum alias,
            ut repellat amet magni voluptatem.
            Ea provident earum minima nemo nostrum repellendus, consequuntur aperiam vel quod!
            Natus doloribus nulla facere iure temporibus voluptates sed totam alias expedita harum.`
        }
    ] as Task[]);
    const value = {
        tasks,
        addTask(task: Task) {
            setTasks([...tasks, task]);
        },
        removeTask() { },
        updateTask() { }
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export default AppContext;