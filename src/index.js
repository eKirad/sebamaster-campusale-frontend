import React from 'react';
import App from './App';
import ReactDOM from 'react-dom';
import WebFontLoader from 'webfontloader';


WebFontLoader.load({
    google: {
        families: ['Roboto:300,400,500,700', 'Material Icons'],
    },
});

ReactDOM.render(<App/>, document.getElementById('app'));

