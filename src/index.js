import React from 'react';
import ReactDOM from 'react-dom';
import './styles/main.css';

import FirstComponent from './components/test';

const App = () => {
    return (
        <div>
            <FirstComponent />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));