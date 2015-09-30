/* global React _ $ */
'use strict';

let injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const { RaisedButton, AppBar, IconButton, FlatButton, LeftNav } = require('material-ui');
let ThemeManager = require('material-ui/lib/styles/theme-manager');
let MyRawTheme = require('./theme-1');

var NavigationClose = require('material-ui/lib/svg-icons/navigation/close');
var NavigationCancel = require('material-ui/lib/svg-icons/navigation/cancel');
var NavigationMenu = require('material-ui/lib/svg-icons/navigation/menu');
var MenuItem = require('material-ui/lib/menu/menu-item');


var DisplayBearInfo = React.createClass({
    getInitialState: function() {
        return {
            bearType: '',
            bearFood: ''
        };
    },
    componentDidMount: function() {
        $.get(this.props.source, function(result){
            if (this.isMounted()) {
                this.setState({
                    bearType: result.bearType,
                    bearFood: result.bearFood
                });
            }
        }.bind(this));
    },
    render: function() {
        return (
            <div className="displayBearInfo">
                <ul>Type of Bear: {this.state.bearType}</ul>
                <ul>Food eaten by Bear: {this.state.bearFood}</ul>
            </div>
        );
    }
});

React.render(<DisplayBearInfo source="http://localhost:3002/api/bears/get-bear-info" />,
             document.getElementById('display--bearType'));

/**************************************************************************************************
*
*       Data definition section
*
*/
var menuItems = [
    { route: 'get-started', text: 'Get Started' },
    { route: 'customization', text: 'Customization' },
    { route: 'components', text: 'Components' },
    { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
    {
        type: MenuItem.Types.LINK,
        payload: 'https://github.com/callemall/material-ui',
        text: 'GitHub'
    },
    { text: 'Disabled', disabled: true },
    {
        type: MenuItem.Types.LINK,
        payload: 'https://www.google.com',
        text: 'Disabled Link',
        disabled: true
    },
];
/*************************************************************************************************/


// class MyLeftNav extends LeftNav {
//     constructor() {
//         super();
//         this.state = { open: false };
//         console.log('MyLeftNav');
//     }
// };


/**************************************************************************************************
*
*       Components begin!
*
*/
const MyAppBar = React.createClass({

    childContextTypes: {
        //All child contexts must be defined here
        muiTheme: React.PropTypes.object
    },

    getChildContext: function(){
        return {
            muiTheme: ThemeManager.getMuiTheme(MyRawTheme)
        };
    },

    //Sets up the initial state of the component - e.g. the initial variables' values
    getInitialState: function(){
        return {
            menuOpen: false
        };
    },

    //Do right before component mounts.
    componentWillMount: function() {
        console.log('MyAppBar: componentWillMount:');
        console.log(this.props.children);
        console.log(this.refs.leftNav);
    },

    handleClick: function(){
        console.log('clicked!');
        this.refs.leftNav.toggle();
        console.log(this);
        console.log(this.refs.leftMenuButton);
        console.log(this.refs.leftMenuButton.getStyles());
        console.log('ICON');
        console.log(this.refs.leftMenuButton.getStyles().icon);
        console.log('OVERLAY');
        console.log(this.refs.leftMenuButton.getStyles().overlay);
        console.log('ROOT');
        console.log(this.refs.leftMenuButton.getStyles().root);
    },

    render: function() {
        return (
            <div>
                <AppBar
                    title="Title"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    iconElementLeft={
                        <IconButton ref="leftMenuButton" onClick={this.handleClick}>
                            <NavigationMenu label="Menu"/>
                        </IconButton>
                    }
                    onRightIconButtonTouchTap={this.handleClick}
                    onLeftIconButtonTouchTap={this.handleClick} />
                <LeftNav ref="leftNav" menuItems={menuItems} docked={false} />
            </div>
        );
    }
});

React.render(<MyAppBar />, document.getElementById('topbar'));


// const MyFunButton = React.createClass({
//     render: function() {
//         return (
//               <RaisedButton label="Default" />
//         );
//     }
// });

// React.render(<MyFunButton />, document.getElementById('button1'));

var Content1 = React.createClass({


    //Sets up the initial state of the component - e.g. the initial variables' values
    getInitialState: function(){
        return {
            titles: ['Home', 'News', 'Forum', 'Bears']
        };
    },

    update: function(e){
        console.log('in update!');
        this.state.titles.push(React.findDOMNode(this.refs.newBtnBox.refs.newBtnTxt).value);
        return this.setState({
            titles: this.state.titles
        });
    },

    render: function() {
        var keyCounter = 1;
        return (
            <div className="content1">
                <ul>{ this.props.dataItem + ' in Content1 el ' }</ul>

                {this.state.titles.map(function(title){
                    console.log(keyCounter);
                    return (
                        <Content1Button title={title} key={keyCounter++}
                                      onclick={this.update} />
                    );
                }.bind(this))}

                <ul><NewBtnTxt id='newBtnBox' ref='newBtnBox'/></ul>

            </div>
        );
    }
});


var NewBtnTxt = React.createClass({
    render: function() {
        return (
            <input type='text' id={this.props.id} ref="newBtnTxt" onChange={this.handleChange}/>
        );
    }
});


var Content1Button = React.createClass({
    handleClick: function(){
        console.log('button was clicked!');
        this.update();
    },
    render: function() {
        console.log(this.props);
        console.log(this.props.onclick);
        return (
                <input type="button" onClick={this.props.onclick}
                       name={this.props.title} key={this.props.key}
                       value={this.props.title} />
        );
    }
});


React.render(<Content1 dataItem="my new data!" />, document.getElementById('container'));

module.exports = function react1Index() {
    console.log('in react1Index!');
};