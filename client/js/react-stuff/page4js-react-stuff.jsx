import React from 'react';

module.exports = (function page4jsReactStuff_Module(){

    console.log('in react stuff!');

    var App = React.createClass({
        render: function App_render() {
            return (
                <h1>Hello World</h1>
            );
        }
    });

    // React.render(<App />);

    return 'win!';
}());