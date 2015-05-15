'use strict';
const React = require('react');
const TextComplete = require('./textcomplete.jsx');

const Example = React.createClass({

  getInitialState: function() {
    return {
    };
  },

  render: function() {

    return (
      <div>
        <span>Here's an example using states!  </span>
        <TextComplete id='example' divClass='example' target='#example2'
          array='states' placeHolder="State" selectListSize='8' ref='myVal'
          defaultValue='Example Default Val' onKeyUp='' inputSize='30'
        />
        <br />
        <span>Here's an example with some random names!  </span>
        <TextComplete id='example2' divClass='example2' array='names' target='#example'
              placeHolder="Names" selectListSize='8' ref='myVal2'/>
        <br />
        <span>Here's an example with the minimum required options! </span>
        <TextComplete divClass='example3' array='names' selectListSize='8'/>
      </div>


    );
  }

});

React.render(<Example />, document.getElementById('index'));
