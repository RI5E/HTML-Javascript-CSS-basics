var Calendar = React.createClass({
  handleChange: function(event){
      var date = new Date(event.target.value);
      var date_formatted = (date.getMonth()+1) + '/' + (date.getDate()+1) + '/' + date.getFullYear();
      this.props.setChosenDate(date_formatted);
  },
  render: function(){
    return (
      <input className="calendar" type="date" id="twitter_date" min="2015-01-01" max="2017-01-01" required="required" onChange={this.handleChange}/>
    );
  }
});

var SubmitButton = React.createClass({
  handleClick: function(event){
      this.props.setDisplayDate();
  },
  render: function(){
    return(
      // <div>
        <button id="submit_button" onClick={this.handleClick}>Submit</button>
      // </div>
    );
  }
});

var Query = React.createClass({
  getInitialState: function(){
      return {chosenDate: 'ERROR:no_date_chosen', displayDate: ''};
  },
  render: function() {
    var me = this;
    var setChosenDate = function(date) {  // updates whenever calendar value is changed
        me.setState({chosenDate: date });
    };
    var setDisplayDate = function() {
        me.setState({displayDate: 'Searching for most popular hashtags on ' + me.state.chosenDate + '...'});
    };
    return(
      <div>
        <h1 className="query" id="query">What day do you want to look at?</h1>
        <Calendar setChosenDate={setChosenDate}/>
        <SubmitButton setDisplayDate={setDisplayDate}/>
        <p>
            {this.state.displayDate}
        </p>
        <p> <a href="/results" title="eventually we can just load this automatically... or single page app??">Click</a> to see results!!! </p>
      </div>
    );
  }
});

ReactDOM.render(
  <Query />,
  document.getElementById('content')
);
