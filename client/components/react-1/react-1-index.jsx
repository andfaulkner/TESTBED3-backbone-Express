/* global React _ $ */

console.log('in react1Index outer!');

var Topbar = React.createClass({


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
            <div className="topbar">
                <ul>{ this.props.dataItem + ' in TopBar el ' }</ul>

                {this.state.titles.map(function(title){
                    console.log(keyCounter);
                    return (
                        <TopbarButton title={title} key={keyCounter++}
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


var TopbarButton = React.createClass({
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


React.render(<Topbar dataItem="my new data!" />, document.getElementById('container'));

export function react1Index() {
    console.log('in react1Index!');
};