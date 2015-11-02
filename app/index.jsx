import './static/styles/main';
import React from 'react';
import App from './components/App.jsx';
import ReactDOM from 'react-dom'

main();

function main() {
    const app = document.createElement('div');
    document.body.appendChild(app);
    ReactDOM.render(<App />,app);
}
