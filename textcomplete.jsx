'use strict';

const React = require('react');

//Place arrays/array of values here
const stateArr = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida',
    'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Caolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
    'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

const nameArr = [
'Chrissy',
'Clay',
'Monica',
'Ettie',
'Minta',
'Verline',  
'Kathern',  
'Esther', 
'Emil',
'Parker', 
'Tyesha', 
'Genna',
'Emelda', 
'Tamica', 
'Alena',
'Kathy',
'Kenton', 
'Jospeh', 
'Marlene',  
'Isabell',  
'Adelaide',
'Slyvia', 
'Cathleen',
'Alana',
'Deann',
'Janina', 
'Jame',
'Raymond',  
'Shellie',  
'Monnie'
];
//
// const host = 'http://localhost:5000';

const TextComplete = React.createClass({

  getInitialState: function() {
    return {
      //Updated when typing, contains value of input box
      input: '',
      //Contains option for which array to use
      array: this.props.array,
      //Will be populated with data provided (either above or via a DB query) to be shown in dropdown
      inputArr: [],
      //Used to be differentiate elements in this component from all other elements of page
      inputComponent: "textComplete-"+this.props.divClass,
      //Intially hide list
      active: false
    };
  },

  componentDidMount: function() {
    this.queryArray(this.state.array);
    this.isMounted() ? this.setState(this.state) : null;
  },

  //Logic for which array/data should be used
  queryArray: function (array) {
    if(array === 'states') {
      this.state.inputArr = stateArr;
    }
    //Example of a DB query for an array
    // if(array === 'builder') {
    //   $.post(host+'/getBuilders', JSON.stringify({text: 'JSON.parse filler'}), data => {
    //     data = JSON.parse(data);
    //     for(let p in data) {
    //       this.state.inputArr.push(data[p].builder)
    //     }
    //   });
    // }
    if(array === 'names') {
      this.state.inputArr = nameArr;
    }
    this.isMounted() ? this.setState(this.state) : null;
  },

  changeList: function (e) {
    //When values being entered, change input
    this.state.input = e.target.value;
    this.isMounted() ? this.setState(this.state) : null;
  },

  checkFocus: function (e) {
    //If target of the document focus event is this component, open the list
    this.state.active = (e.target.dataset.class === this.state.inputComponent)
    this.isMounted() ? this.setState(this.state) : null;
  },

  checkBlur: function (e) {
    //When input/option unfocused, check value of next target
    if(e.relatedTarget !== null && e.relatedTarget.tagName.toLowerCase() === 'option' ) {
      //If it is an option element, select and focus it
      e.relatedTarget.selected = true;
      e.relatedTarget.focus();
    }
    //When input/option unfocused, check value of next target
    if(e.relatedTarget === null ||
    e.relatedTarget.tagName.toLowerCase() !== 'option' &&
    e.relatedTarget.tagName.toLowerCase() !== 'select'  ) {
      //If it is not an option or select element, hide component
      this.state.active = false;
      this.state.input = '';
    }
    this.isMounted() ? this.setState(this.state) : null;
  },

  //Used for the option elements
  checkKey: function (e) {
    //If enter pushed while option element focused, fill input with that value
    if(e.key === 'Enter') {
      this.fillField(e);
    }
    //If arrow key pushed while option element focused, select and focus next/previous option element
    if(e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      let select = document.querySelector("#"+e.target.dataset.class);
      let option = select.options[select.selectedIndex].focus()
    }
  },

  fillField: function (e) {
    //Get the appropriate input box (in-case of multiple per page)
    let input = document.querySelector('[data-id='+e.target.dataset.class+']');
    //Make its value the value of the select option element
    input.value = e.target.value;
    //Close list
    this.state.active = false;
    //Empty state of input
    this.state.input = '';
    this.isMounted() ? this.setState(this.state) : null;
    //If the component has a target, focus that next, otherwise do nohing
    document.querySelector(e.target.getAttribute('target')) ?
      document.querySelector(e.target.getAttribute('target')).focus() :
      null;
  },

  //If key pressed while the dropdown list or input box focused
  checkInput: function (e) {
    //If tab is pressed
    if(e.key === 'Tab') {
      //Get length of the list
      let length = document.querySelector("#"+e.target.dataset.class).options.length;
      //If there is only one element left in the list (filtered down appropriately)
      if(length === 1) {
        //Get it's value
        let val = document.querySelector("#"+e.target.dataset.class).options[0].value
        //Fill the input box with the single value in the list
        e.target.value = val;
        //Close list
        this.state.active = false;
        //Empty state of input
        this.state.input = '';
        this.isMounted() ? this.setState(this.state) : null;
      }
    }
    //Arrow down pushed
    if(e.key === 'ArrowDown') {
      e.preventDefault();
      //Select first element of the select list
      document.querySelector("#"+e.target.dataset.class).options[0].focus();
    }
  },


  render: function() {

    let optionVals = this.state.inputArr.map( (option, i) => {
      if(option.toLowerCase().indexOf(this.state.input.toLowerCase()) === 0) {
        return (
          <option tabIndex='0'
            data-class={this.state.inputComponent} target={this.props.target}
            key={option+i}
            onFocus={this.checkFocus}
            onClick={this.fillField}
            onBlur={this.checkBlur}
            onKeyUp={this.checkKey}
            >
            {option}
          </option>
        );
      }
    })

    let selectObject = this.state.active ?
      ( <select tabIndex='1' id={this.state.inputComponent}
        style={{position: 'absolute', zIndex: 10, width: '100%'}} size={this.props.selectListSize}>
          {optionVals}
        </select>
      ) : null;


    return (
      <div className={this.props.divClass} style={{display: 'inline-block', position: 'relative', boxSizing: 'content-box'}}>
        <input style={{width: '100%'}} type='text'
            data-class={this.state.inputComponent} data-id={this.state.inputComponent}
            id={this.props.id}
            className={this.props.divClass}
            onChange={this.changeList}
            onFocus={this.checkFocus}
            onBlur={this.checkBlur}
            onKeyDown={this.checkInput}

            placeholder={this.props.placeHolder}
            defaultValue={this.props.defaultValue}
            size={this.props.inputSize}
            ref={this.props.ref}
            onKeyUp={this.props.onKeyUp}
            />
        {selectObject}
      </div>
    );
  }

});

module.exports = TextComplete;
