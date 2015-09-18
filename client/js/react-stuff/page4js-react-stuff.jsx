import React from 'react';

module.exports = (function page4jsReactStuff_Module(){

    console.log('in react stuff!');


    /**
     * Spaces sections of test page out, adds long makeshift line as separater
     */
    var Spacer = React.createClass({
        render: function() {
            return (
                <div>
                    <br/>
                    -----------------------------------------------------------------------------
                    <br/>
                    <br/>
                </div>
            );
        }
    });

    React.render(<Spacer/>, document.getElementById('cutoff-betw-bb-and-react-views'));


//**************************** COMPONENT SET 5 ****************************//
    var ButtonFive = React.createClass({
        getInitialState: function() {
            return { val: 0 };
        },
        update: function(e){
            console.log('BF - update');
            this.setState({ val: this.state.val+1 });
        },
        componentWillMount: function(){
            console.log('BF - mounting');
        },
        render: function() {
            console.log('BF - rendering');
            return (
                <button onClick={this.update}>
                    {this.state.val}
                </button>
            );
        },

        componentDidMount: function(){
            console.log('BF - mounted - componentDidMount');
        },
        componentWillUnmount: function(){
            console.log('BF - unmounted! Byebye!');
        }
    });

    var AppFive = React.createClass({
        mountEl: function() {
            console.log('AppFive - mounted - mount function');
            React.render(<ButtonFive />, document.getElementById('app-five'));
        },
        unmountEl: function() {
            console.log('AppFive - unmounted - unmount function');
            React.unmountComponentAtNode(document.getElementById('app-five'));
        },
        render: function() {
            console.log('AF - render');
            console.log(this.mountEl);
            console.log(this.unmountEl);
            return (
                <div>
                    <button onClick={this.mountEl}>Mount</button>
                    <button onClick={this.unmountEl}>Unmount</button>
                    <div id='app-five'></div>
                    <Spacer />
                </div>
            );
        }
    });

    React.render(<AppFive/>, document.getElementById('react-component-5'));

//*************************************************************************//

//**************************** COMPONENT SET 4 ****************************//
// <AppThree>
//   |--> <ButtonTwo>
//          |--> <Heart>

    var AppThree = React.createClass({
        render: function() {
            return (
                <div className="AppThree">
                    <Spacer/>
                    <ButtonTwo><Heart/></ButtonTwo>
                    <Spacer/>
                </div>
            );
        }
    });

    var ButtonTwo = React.createClass({
        render: function() {
            return (
                <div className="ButtonTwo"> I {this.props.children} eating babies</div>
            );
        }
    });

    var Heart = React.createClass({
        render: function() {
            return (
                <span className="Heart" className="heart"><b><u>love</u></b></span>
            );
        }
    });

    React.render(<AppThree/>, document.getElementById('react-component-4'));

//*************************************************************************//

//**************************** COMPONENT SET 1 ****************************//
// <App>
// <AppTwo>

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
                <div className="App">
                    <Spacer/>
                    <input type="text" onChange={this.update} />
                    <h1>Hello World</h1>
                    <h2>{this.state.txt}</h2>
                    <span><b>{cat}</b></span>
                    <Spacer/>
                </div>
            );
        }
    });

    React.render(<App txt="yay!" cat={7} />, document.getElementById('react-component-1'));
}());



var AppTwo = React.createClass({
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

React.render(<AppTwo age={20} />, document.getElementById('react-component-2'));




//**************************** COMPONENT SET 2 ****************************//
//<CaseBox>
//  |--> <TextInputter>
//  |--> <DropdownInputter>

var CaseBox = React.createClass({

    getInitialState: function() {
        return {
            caseNum: 999,
            caseName: 'default',
            caseType: 'bears'
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
                <select ref="drop" name={this.props.inputIdent} defaultValue="theft"
                        id={this.props.inputIdent+'Dropdown'} onChange={this.props.update}>
                    <option value="fraud">fraud</option>
                    <option value="theft">theft</option>
                    <option value="espionage">espionage</option>
                    <option value="bears">bears</option>
                </select>
            </div>
        );
    }
});


//*************************************************************************//


React.render(<CaseBox />, document.getElementById('react-component-3'));