import React from 'react';
import Container from "react-bootstrap/Container";
import { table, tr } from './style';
import './style.css';
const mongoose = require("mongoose");

class leaderboard extends React.Component {

  constructor() {
    super();
    this.state ={
      boardList:[]
    }
  }

  async componentDidMount() {
    let response = await fetch('api/leaderboard/selectFavor');
    let json = await response.json();
    let data =[];
    for(let name of Object.keys(json)){
      data.push({name:name,data:json[name]})
    }
    console.log(data)
    this.setState({
      boardList: data
    })

  }

  render() {
    return (
        <div>
          <Container className="Wrapper" >
            <table className ="table">
              <tr className ="header">
                <th> Rank </th>
                <th> Owe People Name </th>
                <th> Number Of Owes </th>
              </tr>
              {this.state.boardList.map((item,index) =>
                  <tr>
                    <td>{index+1} </td>
                    <td> {item.name}  </td>
                    <td>{item.data} </td>
                  </tr>
              )}
            </table>
          </Container>
        </div>
    );
  }
}



export default leaderboard;

