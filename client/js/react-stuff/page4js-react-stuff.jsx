/***************************************************************************************************
*
*   REACT TINKERING
*
*/

/**
 * REACT DEFINITIONS
 *
 * ReactElement   :     Single virtual DOM node usable by a ReactComponent. Defined using JSX tags.
 *                      E.g. <input type="text" /> - in JSX - is a ReactElement. Outside JSX, def
 *                      w React.createElement('input', { type: 'text' });  [or something like that]
 *
 * ReactComponent :
 *
 * Uncontrolled         An e.g. <input> that does not supply a value (or sets it to null) is an
 * Components     :     uncontrolled component. In an uncontrolled <input>, the value of the
 *                      rendered element will reflect the user's input. To listen to updates to the
 *                      value, use inline onChange event, within the tag - e.g.
 *                          <input type="text" onChange={this.someChangeHandlingFn} />
 *                          ... where someChangeHandlingFn is defined earlier in the component...
 *                            handleChange: function(event) {
 *                                this.setState({ value: event.target.value.substr(0, 140) });
 *                            }
 */





//Imports React...obviously
import React from 'react';
import { Router, Route, Link } from 'react-router';


/**
 * From here down, exported to the browser
 */
module.exports = (function page4jsReactStuff_Module(){

    // console.log('in react stuff!');


    //*****************************************************************************
    //
    //      DYNAMIC COMPONENTS TWO (See below for DYNAMIC COMPONENTS ONE)
    //
    //-----

    var puppyData = [
        {id: 1, firstName: 'Meeka', lastName: 'PeekaFaulkner'},
        {id: 2, firstName: 'Callie', lastName: 'Peeke'},
        {id: 3, firstName: 'Osiris', lastName: 'Persia'},
        {id: 4, firstName: 'Lako', lastName: 'Bakota'}
    ]

    //================== COMPONENT ==================
    //
    //--
    //
    var DynamicDataBlock = React.createClass({

        //Sets up the initial state of the component - e.g. the initial variables' values
        getInitialState: function(){
            return { puppyDataTable: puppyData };
        },

        // Run on component update; i.e. when this.update is called in 'this.render' below
        update: function() {
            puppyDataTable.push({ });
            return this.setState({ });
        },

        //[2] Mount component
        render: function() {

            this.rows = this.state.puppyDataTable.map(function(puppy){
                return ( <PuppyTableRow data={puppy} key={puppy.id}} />  );
            });

            return (
                <div className="DynamicDataBlock">
                    <table>{rows}</table>
                    <AddPuppy update={this.update} />
                    <SubmitPuppies />
                </div>
            );
        },

    });
    //===============================================



    //================== COMPONENT ==================
    //
    //--
    //
    var PuppyTableRow = React.createClass({
        render: function() {
            return (
                <
            );

        }
    });
    //===============================================


    //================== COMPONENT ==================
    //
    //--
    //
    var AddPuppy = React.createClass({
        render: function() {
            return (
                <div className="AddPuppy"></div>
            );
        }
    });
    //===============================================


    //================== COMPONENT ==================
    //
    //--
    //
    var SubmitPuppies = React.createClass({
        render: function() {
            return (
                <div className="SubmitPuppies"></div>
            );
        }
    });
    //===============================================


    React.render(<DynamicDataBlock />, __domNodeToAttachTo);

    //-----
    //
    //      END DYNAMIC COMPONENTS TWO
    //
    //**************************************************************************//


    //*****************************************************************************
    //
    //      DYNAMIC COMPONENTS
    //
    //-----
    var personData = [
        {id: 1, fname: "Simon", lname: "Shollenberger"},
        {id: 2, fname: "Joe", lname: "Peters"},
        {id: 3, fname: "John", lname: "Moss"},
        {id: 4, fname: "Jack", lname: "Penner"},
        {id: 5, fname: "Albert", lname: "Doggs"},
        {id: 6, fname: "Isabelle", lname: "McNeil"},
        {id: 7, fname: "Meeka", lname: "Faulkner"},
        {id: 8, fname: "Callie", lname: "Peeke"},
        {id: 9, fname: "Lisa", lname: "Faulkner"},
        {id: 10, fname: "Boo", lname: "TheGhost"},
        {id: 11, fname: "Fish", lname: "TheFish"}
    ];

    //================== COMPONENT ==================
    //
    //-- Data table + way to dynamically add data: contains both table, & btn + txtbox to add items
    //
    var PersonTable = React.createClass({

        //Grabs personData array, assigns it to this.state.data
        //Anything returned from this becomes initial this.state
        getInitialState: function() {
            return {
                data: personData
            };
        },

        /**
         * Used to update state when button
         * @param  {[type]} e [description]
         * @return shallow merge of nextState into current state (i.e. val made by this.setState)
         */
        update: function(e){
            console.log('________ CONTENT ADD FUNCTION entered! (PersonTable.update) ________');
            console.log('findDOMNode val: ');
            console.log(React.findDOMNode(this.refs.dataAdder.refs.newLastNmTxtBox).value);
            if (!!React.findDOMNode(this.refs.dataAdder.refs.newFirstNmTxtBox).value &&
                    !!React.findDOMNode(this.refs.dataAdder.refs.newLastNmTxtBox).value){
                this.state.data.push({
                    id: this.state.data.length + 1,
                    fname: React.findDOMNode(this.refs.dataAdder.refs.newFirstNmTxtBox).value,
                    lname: React.findDOMNode(this.refs.dataAdder.refs.newLastNmTxtBox).value
                });

            }
            return this.setState({ });
        },

        /**
         * Displays the component & its children
         * @return {JSXComponent} the JSX of the component; i.e. the component itself, for display
         */
        render: function() {
            console.log('PersonTable.render::: this.state:'); console.log(this.state);
            console.log('PersonTable.render::: this.props:'); console.log(this.props);
            var rows = this.state.data.map(function(person){
                return (<PersonRow data={person} key={person.id} />);
            });
            return (
                <div>
                    <table>{rows}</table>
                    <AddPersonBlock ref="dataAdder" update={this.update} />
                </div>
            );
        }
    });
    //===============================================



    //================== COMPONENT ==================
    //
    //-- Single row of the data table
    //      * this.state DOES NOT propagate downward
    //      * propagation occurs through this.props
    //
    var PersonRow = React.createClass({

        render: function() {
            // console.log('PersonRow.render::: this.state:'); console.log(this.state);
            // console.log('PersonRow.render::: this.props:'); console.log(this.props);
            var dt = this.props.data; //this.props.data is the data that was passed in to personRow
            return (
                <tr>
                    <td>{(dt.id > 9) ? dt.id : '0' + dt.id} </td>
                    <td> | </td>    <td>{dt.fname}</td>
                    <td> | </td>    <td>{dt.lname}</td>
                </tr>
            );
        }

    });
    //===============================================



    //================== COMPONENT ==================
    //
    //-- Textbox and button to add contents of textbox to data table
    //      * this.state DOES NOT propagate downward
    //      * propagation occurs through this.props
    //
    var AddPersonBlock = React.createClass({

        render: function() {
            console.log('AddPersonBlock.render::: this.state:'); console.log(this.state);
            console.log('AddPersonBlock.render::: this.props:'); console.log(this.props);
            return (
                <div className="AddPersonBlock"><br/>
                    <span><input type="text" ref='newFirstNmTxtBox'/>. .</span>
                    <span><input type="text" ref='newLastNmTxtBox'/>. .</span>
                    <button onClick={this.props.update}>Add Person</button>
                </div>
            );
        }

    });
    //===============================================

    //Render components
    React.render(<PersonTable/>, document.getElementById('react-component-8'));

    //-----
    //
    //      END DYNAMIC COMPONENTS
    //
    //**************************************************************************//





    //*****************************************************************************
    //
    //      UPDATE LIFECYCLE
    //
    //
    var ButtonWithUpdateLifecycle = React.createClass({

        getInitialState: function() {
            return {
                increasingAndNot10Divisble: false
            };
        },
        update: function(){
            this.setProps({val: this.props.val + 1});
        },

        componentWillReceiveProps: function(nextProps){
            this.setState({ increasingAndNot10Divisble: (nextProps.val > this.props.val) &&
                                                         nextProps.val % 10 !== 0 });
        },

        /**
         * Only allow component to update if the function returns true
         * nextProps: values the properties will be set to after update completes
         * nextState: state of the component following the update
         */
        shouldComponentUpdate: function(nextProps, nextState){
            // console.log(nextState);
            return nextProps.val % 5 === 0;
        },

        render: function() {
            // console.log(this.state.increasingAndNot10Divisble);
            // console.log(this.props.val);
            return (<button onClick={this.update}>{this.props.val}</button>);
        },

        /**
         * Do something after component update complete
         * prevProps & prevState: pre-update component properties & state, respectively;
         */
        componentDidUpdate: function(prevProps, prevState) {
            // console.log('prevProps: ', prevProps);
        }

    });

    React.render(<ButtonWithUpdateLifecycle val={0} />, document.getElementById('react-component-7'));

//**************************** MOUNTING PRACTICE ***************************//
    var ButtonToMount2 = React.createClass({

        getInitialState: function() {
            return {
                val: 0
            };
        },

        update: function(){
            return this.setState({val: this.state.val + 1});
        },

        //[1] Run when mounting component
        componentWillMount: function(){
            this.setState({valAppearingOnMount: 2});
            // console.log('component will mount!');
        },

        //[2] Mount component
        render: function() {
            return (
                <button onClick={this.update}>
                    {this.state.valAppearingOnMount*this.state.val}
                </button>
            );
        },

        //[3] Run directly after component mounted
        // You can access the mounted component - in the DOM - from here
        componentDidMount: function(){
            // console.log('component mounted!');
            // console.log('this.getDOMNode(): ');
            // console.log(this.getDOMNode());
            this.inc = setInterval(this.update, 500); // this.update runs every 500ms
        },

        //[4] Run directly before component unmounts
        componentWillUnmount: function(){
            clearInterval(this.inc);    // stop interval firing of this.update on unmount
            // console.log('component about to unmount!');
        }
    });


    var ButtonMounter2 = React.createClass({

        //function that is called to mount the new element
        mountEl: function() {
            React.render(<ButtonToMount2 />, document.getElementById('mount-buttontomount2-here'));
        },

        //function that is called to unmount the new element
        unmountEl: function() {
            React.unmountComponentAtNode(document.getElementById('mount-buttontomount2-here'));
        },

        render: function() {
            return (
                <div>
                    <button onClick={this.mountEl}>Mount ButtonToMount2</button>
                    <button onClick={this.unmountEl}>Unmount ButtonToMount2</button>
                    <div id='mount-buttontomount2-here'></div>
                </div>
            );
        }
    });

    React.render(<ButtonMounter2 />, document.getElementById('react-component-6'));
//*************************************************************************//




//**************************** SPACER COMPONENT ****************************//
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

    React.render(<Spacer/>, document.getElementById('spacer-slot-2'));
    React.render(<Spacer/>, document.getElementById('cutoff-betw-bb-and-react-views'));


//**************************** COMPONENT SET 5 ****************************//
    var ButtonFive = React.createClass({
        getInitialState: function() {
            return { val: 0 };
        },
        update: function(e){
            // console.log('BF - update');
            this.setState({ val: this.state.val+1 });
        },
        componentWillMount: function(){
            // console.log('BF - mounting');
        },
        render: function() {
            // console.log('BF - rendering');
            return (
                <button onClick={this.update}> {this.state.val} </button>
            );
        },

        componentDidMount: function(){
            // console.log('BF - mounted - componentDidMount');
        },
        componentWillUnmount: function(){
            // console.log('BF - unmounted! Byebye!');
        }
    });

    var AppFive = React.createClass({
        mountEl: function() {
            // console.log('AppFive - mounted - mount function');
            React.render(<ButtonFive />, document.getElementById('app-five'));
        },
        unmountEl: function() {
            // console.log('AppFive - unmounted - unmount function');
            React.unmountComponentAtNode(document.getElementById('app-five'));
        },
        render: function() {
            // console.log('AF - render');
            // console.log(this.mountEl);
            // console.log(this.unmountEl);
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
//*************************************************************************//


//**************************** REFERENCING PARENT ****************************//
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
 * <TextInputter>
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
 * <DropdownInputter>
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

React.render(<CaseBox />, document.getElementById('react-component-3'));
//*************************************************************************//
//****************************************************************************//