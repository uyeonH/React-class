import './App.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
function App() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <FuncComp initNumber={2}></FuncComp>
      <ClassComp initNumber={2}></ClassComp>
    </div>
  );
}
var funcId = 0;
var funcStyle = 'color:blue';

function FuncComp(props) {
  var numberState = useState(props.initNumber); //배열을 반환
  var number = numberState[0]; // 상태값
  var setNumber = numberState[1]; // 상태를 바꿀 수 있는 함수

  //var dateState = useState((new Date()).toString()); //배열을 반환
  //var _date = dateState[0]; // 상태값
  //var setDate = dateState[1]; // 상태를 바꿀 수 있는 함수

  var [_date, setDate] = useState((new Date()).toString());

  //sideEffect
  useEffect(function () {
    console.log("%cfunc ==> useEffect (componentDidMount & componentDidUpdate) " + (++funcId), funcStyle);
    document.title = number+' : '+_date;
  });


  console.log("%cfunc ==> render " + (++funcId), funcStyle);

  return (
    <div className="container">
      <h2>function style component</h2>
      <p>Number: {number}</p>

      <input type="button" value="random" onClick={
        function () {
          setNumber(Math.random());
        }

      } />

      <p>Date: {_date}</p>

      <input type="button" value="date" onClick={
        function () {
          setDate((new Date()).toString());
        }

      } />
    </div>
  );
}
var classStyle = 'color:red';

class ClassComp extends React.Component {
  state = {
    number: this.props.initNumber,
    date: (new Date()).toString()
  }
  componentWillMount() {
    console.log('%cclass => componentWililMount', classStyle);

  }
  componentDidMount() {
    console.log('%cclass => componentDidlMount', classStyle);

  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('%cclass => shouldComponentUpdate', classStyle)
    return true;
  }
  componentWillUpdate(nextProps, nextState) {
    console.log('%cclass => componentWillUpdate', classStyle)
  }
  componentDidUpdate(nextProps, nextState) {
    console.log('%cclass => componentDidUpdate', classStyle)
  }
  render() {
    console.log('%cclass => render', classStyle);

    return (
      <div className="container">
        <h2>class stype component</h2>
        <p>Number: {this.state.number}</p>

        <input type="button" value="random" onClick={
          function () {
            this.setState({ number: Math.random() })
          }.bind(this)

        } />

        <p>Date: {this.state.date}</p>

        <input type="button" value="date" onClick={
          function () {
            this.setState({ date: (new Date()).toString() })
          }.bind(this)

        } />

      </div>
    )
  }
}

export default App;
