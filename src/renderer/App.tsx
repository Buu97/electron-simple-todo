import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import { ipcRenderer } from 'electron';

const mainElement = document.createElement('div');
document.body.appendChild(mainElement);

const App = () => {
    const buttonCliked = () => {
        ipcRenderer.send('notify', 'Test notification');
    }

    return (
        <Fragment>
            <h1>
                Hi from a react app with hot reload.
            </h1>
            <button onClick={buttonCliked}>Click me</button>
        </Fragment>
    )
}

ReactDom.render(<App />, mainElement);
