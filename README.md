#What is it

* Textcomplete is an extremely simple and customizable React component for lookahead text input

#Textcomplete

* Follow these steps to test it out, or simply copy the textcomplete.jsx file and read the How To Use section below!
* Install packages (for es6 features and quick setup)

```
(sudo) npm install
```

* Build your client with webpack

```
./wp.sh
```
(cause I'm lazy)

* In a seperate terminal tab/window, run the example

```
node index.js
```

 or

 ```
 nodemon (if you have it installed)
 ```

* Point browser to localhost:2000

* Test it out!

#Basic example:

```javascript
<TextComplete id='example' divClass='example' target='#nextInput'
  array='states' placeHolder="State" selectListSize='8' ref='myVal'
  defaultValue='Example Default Val' onKeyUp={yourFunc} inputSize='30'
/>
```
* <strong>divClass (required) </strong>- Used for application logic / styling to match other input elements. Style like any other css class element.

* <strong>array (required)</strong> - Determine what array to use for this particular Texcomplete component (see more details below).

* <strong>selectListSize (required)</strong>  - Determine how many option elements to display at once (also prevents browser default list to show).

* <strong>id (recommended)</strong> - Used to extract text, style, and differentiate the input element like a normal DOM element. Style like any other css id elemnt.

* <strong>ref (recommended)</strong>- If you need to reference the input element within the parent component, this is the recommended way of getting it.

* <strong>placeHolder (optional)</strong> - Display text within the input element by default.

* <strong>defaultValue (optional)</strong> - If you wish to display a default value instead of a placeholder (or both).

* <strong>onKeyUp (optional)</strong> - If you wish to attach another function to the component, say, perform a search based on the current input, you can add that here.

* <strong>inputSize (optional)</strong> - The size of the input field (also adjusted via CSS).

* <strong>target (optional)</strong> - Next element you would like the focus to be after selecting an option.


#How to configure/use

* Copy the texcomplete.jsx file to wherever you wish to use/reference it like any other React component.

```javascript
const (or var) TextComplete = require('textcomplete.jsx')
```

* Simply add the array/query for the data you would like populated into the selection list, at the top of the component, as seen in the textcomplete.jsx file.

* In the `queryArray` function, add your if/switch statement to determine what array the particular Textcomplete component should reference and set it to `this.state.inputArr`.

Ex:
```javascript
if(array === 'states') {
      this.state.inputArr = myStateArr;
}
```
* Apply the options detailed above. Using the Basic Example above, we set the `array` prop to 'states', so this component would use the `myStateArr` which is placed at the top of the component.

* That's it!

#Additional notes
* Uses io.js (should work with node if you switch back to es5 features, detailed below)

* Currently set up for React (0.12+?, maybe only 0.13+) and es6 features like const/let, and arrow functions, using babel.

* To use it without those features, find the consts, lets, and replace them with var. Find the arrow functions ex:` parameter =>` and replace with `function(parameter)` and you're good to go.

* I found it easier to put the arrays in the component itself, especially if I was using the same array in multiple places. If you don't wish to do that and would like it passed directly from the parent component, either configure it yourself(you're smart enough to do that (:  ), or message/raise an issue and I'll include a file with that feature as well.

#TODO
* Switch from querySelector to ref (should work).
* Use the ref instead of data-classes and data-set
* Make es5 file
* Make better looking example file
* Add functionality to combine arrays
