import './App.css';
import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
function App() {
  var [funcShow, setFuncShow]=useState(true);
  var [classShow, setClassShow]=useState(true);

  return (
    <div className="container">
      <h1>Hello World</h1>
      <input type="button" value="remove func" onClick={function(){
        setFuncShow(false)
      }}/>
      <input type="button" value="remove class" onClick={function(){
        setClassShow(false)
      }}/>
      {funcShow ?<FuncComp initNumber={2}></FuncComp> : null}
      {classShow ? <ClassComp initNumber={2}></ClassComp>:null}
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

  useEffect(function () {
    console.log("%cfunc ==> useEffect  (componentDidMount)  " + (++funcId), funcStyle);
    document.title = number;
    return function(){
    console.log("%cfunc ==> useEffect Return (componentWillUnMount) " + (++funcId), funcStyle);

    }
  },[]); // 빈 배열, 1회만 실행

  //sideEffect
  useEffect(function () {
    console.log("%cfunc ==> useEffect number (componentDidMount & componentDidUpdate) A " + (++funcId), funcStyle);
    document.title = number;
    return function(){
    console.log("%cfunc ==> useEffect Return number" + (++funcId), funcStyle);

    }
  },[number]); // number 값이 바뀌었을 때만 실행
  useEffect(function () {
    console.log("%cfunc ==> useEffect _date (componentDidMount & componentDidUpdate) B " + (++funcId), funcStyle);
    document.title = _date;
    return function(){
    console.log("%cfunc ==> useEffect Return _date" + (++funcId), funcStyle);

    }
  },[_date]); // _date 값이 바뀌었을 때만 실행


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
  componentWillUnmount() {
    console.log('%cclass => componentWillUnmount', classStyle)
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
