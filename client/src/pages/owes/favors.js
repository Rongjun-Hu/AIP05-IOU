import React, { useState } from 'react';
import { Wrapper} from './style';
import Owed from './component/owed';
import Owe from './component/owe';
import Record from './component/record';
import { Button, Divider, Tabs, Drawer } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddFavor from './component/addowe'
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import { actionCreators } from './store';


const { TabPane } = Tabs;


class favor extends React.Component{

    state = { visible: false };

    showDrawer = () => {
        this.setState({
          visible: true,
        });
      };
    
      onClose = () => {
        this.setState({
          visible: false,
        });
      };

    render(){
        console.log(this.props.username)
        return(
            <Wrapper>
              <Button type="primary" onClick={this.showDrawer} style={{float: 'right'}}>
              <PlusOutlined /> New favor 
              </Button>
              <Tabs tabPosition='left'>
                  <TabPane tab="Owes" key="1">
                      <Owe username={this.props.username}/>
                  </TabPane>
                  <TabPane tab="Owed" key="2">
                      <Owed username={this.props.username}/>
                  </TabPane>
                  <TabPane tab="Record" key="3">
                      <Record username={this.props.username}/>
                  </TabPane>
              </Tabs>
              <Drawer
                  title="Create a new Favor"
                  width={480}
                  onClose={this.onClose}
                  visible={this.state.visible}
                  bodyStyle={{ paddingBottom: 80 }}
              >
                  <AddFavor username={this.props.username}/>
              </Drawer>
            </Wrapper>
        );
    }

    componentDidMount() {
		this.props.getRewards();
		this.props.getUsers();
    }
}

const mapState = (state) => ({    // get the current user's data(without password)
	currentuser: state.auth.user
})

const mapDispatch = (dispatch) => ({
	getRewards() {         //get the fixed rewards from the databse
		const action = actionCreators.getRewards();
		dispatch(action);
	},
	getUsers() {       //get the users from the datase
		const action = actionCreators.getUsers();
		dispatch(action);
	}
});

export default connect(mapState, mapDispatch)(favor);