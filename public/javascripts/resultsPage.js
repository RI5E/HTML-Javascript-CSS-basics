// describes hashtag
var TopHashtag = React.createClass({
    handleClick: function(event){
        this.props.setSelHashtag(this.props.text);
    },
    // TODO: make the click transition nicer somehow...
    render: function() {
        if (this.props.selHashtag == this.props.text) {
            return (
                <div>
                    <div id="pointer"></div>
                    <div className="hashtag_clicked">
                        {this.props.text}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="hashtag" onClick={this.handleClick} >
                    {this.props.text}
                </div>
            );
        }
    }
});

// sidebar listing top hashtags
var SideBar = React.createClass({
    render: function() {
        // TODO: not currently using rank prop
        return (
            <div id="sidebar">
                {this.props.hashtags.map(function(hashtag, i) {
                    return (
                        <TopHashtag rank={i} text={hashtag} setSelHashtag={this.props.setSelHashtag} selHashtag={this.props.selHashtag} />
                    );
                }, this)}            
            </div>
        );
    }
});

// words used on Twitter to describe subject of the hashtag
var TopDescriptor = React.createClass({
    getInitialState: function() {
        return ({clicked: false});
    },
    handleClick: function(event) {
        if(this.props.focus != '0') {
            this.setState({clicked: !this.state.clicked});
            if(this.state.clicked) {
                this.props.setFocus('');
            } else {
                this.props.setFocus(this.props.rank);
            }
        }
    },
    render: function() {
        var cName;
        if(this.props.focus == this.props.rank || this.props.focus == '') {
            cName = "descriptor";
        } else {
            cName = "descriptor_blur";
        }
        var DIMS = ["10,600", "150,800", "300,750", "70,100", "300,300"];
        var dim = DIMS[this.props.rank-1];
        var divStyle;
        if(this.props.focus == '0') {
            divStyle = {
                top: parseInt(dim.split(',')[0]),
                right: parseInt(dim.split(',')[1]),
                cursor: 'default'
            };
        } else {
            divStyle = {
                top: parseInt(dim.split(',')[0]),
                right: parseInt(dim.split(',')[1])
            };
        }        
        return (
            <div className={cName} style={divStyle} onClick={this.handleClick}>
                "{this.props.text}"
            </div>
        );
    }   
});

// description / general info about subject of hashtag
var InfoBox = React.createClass({
   render: function() {
        // this could be like... his wikipedia summary??
        return (
           <div id="info">
                <h1>Information</h1>
                <p>{this.props.infoText}</p>
           </div>
        );
   }       
});

// photo of subject of hashtag
var CentralPhoto = React.createClass({
    getInitialState: function() {
        return {clicked: false};
    },
    handleClick: function(event) {
        this.setState({clicked: !this.state.clicked});
        if(this.state.clicked) {
            this.props.setFocus('');
        } else {
            this.props.setFocus('0');
        }
    },
    render: function() {
        if(this.state.clicked) {
            return (
                <div>
                    <img id="photo" src={this.props.imageSource} onClick={this.handleClick}/>
                    <InfoBox infoText={this.props.infoText}/>
                </div>
            );
        } else {
            return (
                <img id="photo" src={this.props.imageSource} onClick={this.handleClick}/>
            );
        }
    }   
});

// container for everything related to the hashtag
var FancyMap = React.createClass({
    // TODO: make this fade in
    // or perform some cool animation
    getInitialState: function() {
        return ({focus: ''});
    },
    render: function() {
        // have TopDescriptors be randomly placed?
        // also it would be nice to have them move around a little...
        var me = this;
        var setFocus = function(val) {
            me.setState({focus: val});
        };
        return (
            <div id="map">
                <CentralPhoto imageSource={this.props.imageSource} infoText={this.props.infoText} setFocus={setFocus}/>
                <div>
                    {this.props.descriptors.map(function(descriptor, i) {
                        return (
                            <TopDescriptor rank={i+1} text={descriptor} setFocus={setFocus} focus={this.state.focus}/>
                        );
                    }, this)}            
                </div>
            </div>
        );
    }
});

// puts everything together
var MasterComponent = React.createClass({
    getInitialState: function() {
        return {selHashtag: ""}; // identifies the selected hashtag
    },
    render: function() {
        var me = this;
        var setSelHashtag = function(rank){
            me.setState({selHashtag: rank});
        };
        if (this.state.selHashtag == "") {
            return (
                <div>
                    <SideBar hashtags={Object.keys(this.props.hashtags)} setSelHashtag={setSelHashtag} selHashtag={this.state.selHashtag}/>
                </div>
            );
        } else {
            var imageSource=this.props.hashtags[this.state.selHashtag]["imageSource"];
            var infoText=this.props.hashtags[this.state.selHashtag]["infoText"];
            var descriptors=this.props.hashtags[this.state.selHashtag]["descriptors"];
            return (
                <div>
                    <SideBar hashtags={Object.keys(this.props.hashtags)} setSelHashtag={setSelHashtag} selHashtag={this.state.selHashtag}/>
                    <FancyMap imageSource={imageSource} infoText={infoText} descriptors={descriptors}/>
                </div>
            );
        }
    }
});

// input
// eventually passed in from somewhere else
var HASHTAGS = {
    "#aaaa": {imageSource: "http://placehold.it/300/09f/fff.png", infoText: "asdfasdfasdf", descriptors: ["descriptor1", "descriptor2", "descriptor3", "descriptor4", "descriptor5"]},
    "#bbbb": {imageSource: "http://placehold.it/300/f90/fff.png", infoText: "these descriptions look way nicer when they're longer", descriptors: ["descriptor6", "descriptor7", "descriptor8", "descriptor9", "descriptor0"]},
    "#cccc": {imageSource: "http://placehold.it/300/0f9/fff.png", infoText: "but I was too lazy to type a lot of words out whoops", descriptors: ["descriptor1", "descriptor2", "descriptor3", "descriptor4", "descriptor5"]},
    "#dddd": {imageSource: "http://placehold.it/300/f09/fff.png", infoText: "asdfasdfasdf", descriptors: ["descriptor6", "descriptor7", "descriptor8", "descriptor9", "descriptor0"]},
    "#eeee": {imageSource: "http://placehold.it/300/9f0/fff.png", infoText: "asdfasdfasdf", descriptors: ["descriptor1", "descriptor2", "descriptor3", "descriptor4", "descriptor5"]}
}

ReactDOM.render(
  <MasterComponent hashtags={HASHTAGS}/>,
  document.getElementById('content')
);
