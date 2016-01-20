var Calendar = React.createClass({
  render: function(){
    return (
      <input className="calendar" type="date" id="twitter_date" min="2015-01-01" max="2017-01-01" required="required" />
    );
  }
});

var SubmitButton = React.createClass({
  render: function(){
    return(
      <div>
        <button id="submit_button" onclick="dateSearch()">Submit</button>
      </div>
    );
  }
});

var Query = React.createClass({
  render: function() {
    return(
      <div>
        <h1 className="query" id="query">What day do you want to look at?</h1>
        <Calendar />
        <SubmitButton />
      </div>
    );
  }
});
ReactDOM.render(
  <Query />,
  document.getElementById('content')
);
