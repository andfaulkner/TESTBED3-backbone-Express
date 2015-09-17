import React from 'react';

module.exports = (function page4jsReactStuff_Module(){

    console.log('in react stuff!');


    var App = React.createClass({
        getInitialState: function App_getInitialState() {
            return {
                txt: 'the state txt',
                id: 0
            };
        },

        update: function App_update(e){
            this.setState({ txt: e.target.value });
        },

        getDefaultProps: function App_getDefaultProps() {
            return {
                txt: 'DEFAULT TEXT',
                cat: 5
            };
        },
        propTypes: {
            txt: React.PropTypes.string,
            cat: React.PropTypes.number.isRequired
        },
        render: function App_render() {
            // var txt = this.props.txt;
            var cat = this.props.cat;
            return (
                <div>
                    <input type="text" onChange={this.update} />
                    <h1>Hello World</h1>
                    <h2>{this.state.txt}</h2>
                    <span>{cat}</span>
                </div>
            );
        }
    });

    React.render(<App txt="yay!" cat={7} />, document.getElementById('react-component-1'));
}());



var AppTwo = React.createClass({
    // getDefaultProps: function(){
    //     return {
    //         age: 42,
    //         name: 'gr'
    //     };
    // },
    propTypes: {
        age: React.PropTypes.number,
        name: React.PropTypes.string
    },

    getInitialState: function() {
        return {
            age: 500,
            name: 'POOO'
        };
    },

    update: function(e){
        return this.setState({
            age: e.target.value,
            name: e.target.value
        });
    },

    render: function() {
        return (
            <div className="AppTwo">
                <input type="text" onChange={this.update}/><br/>
                <input type="text" onChange={this.update}/> <br/>
                <span>Your name is {this.state.name}</span><br/>
                <span>Your age is currently {this.state.age}</span>
            </div>
        );
    }
});

React.render(<AppTwo age='20' />, document.getElementById('react-component-2'));





//**************************** COMPONENT SET 2 ****************************//
var CaseBox = React.createClass({

    getInitialState: function() {
        return {
            caseNum: 999,
            caseName: 'Default',
            caseType: 'Bears'
        };
    },

    update: function(e){
        return this.setState({
            caseNum: this.refs.caseNum.refs.inp.getDOMNode().value,
            caseName: this.refs.caseName.refs.inp.getDOMNode().value,
            caseType: this.refs.caseType.refs.drop.getDOMNode().value
        });
    },

    render: function() {
        return (
            <div className="CaseBox">
                <TextInputter ref='caseNum' inputTitle='Case Number' update={this.update}/>
                <TextInputter ref='caseName' inputTitle='Case Name' update={this.update}/>
                <DropdownInputter ref='caseType' inputIdent='caseType' inputTitle='Case Type'
                                  update={this.update}/>
                <span>Case {this.state.caseName}, of type {this.state.caseType} has a
                      case # of {this.state.caseNum}</span>
            </div>
        );
    }
});


/**
 * [render description]
 * @param  {String} ) {                   return (            <div className [description]
 * @return {[type]}   [description]
 */
var TextInputter = React.createClass({
    render: function() {
        return (
            <div className="TextInputter">
                <h2>{this.props.inputTitle}</h2>
                <input ref="inp" type="text" onChange={this.props.update}/><br/>
            </div>
        );
    }
});


/**
 * [render description]
 * @return {ReactComponent} A react component for a dropdown menu
 */
var DropdownInputter = React.createClass({
    propTypes: {
        inputIdent: React.PropTypes.string,
        inputTitle: React.PropTypes.string
    },
    render: function() {
        return (
            <div className="DropdownInputter">
                <h2>{this.props.inputTitle}</h2>
                <select ref="drop" name="{this.props.inputIdent}"
                        id="{this.props.inputIdent}Dropdown" onChange={this.props.update}>
                    <option value="Fraud">Fraud</option>
                    <option value="Theft">Theft</option>
                    <option value="Espionage">Espionage</option>
                    <option value="Bears" selected>Bears</option>
                </select>
            </div>
        );
    }
});


//*************************************************************************//


React.render(<CaseBox />, document.getElementById('react-component-3'));