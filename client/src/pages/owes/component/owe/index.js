import React from 'react'
import { connect } from 'react-redux'
import { List, Button, Tag,Divider,Drawer } from 'antd'
import 'antd/dist/antd.css'
import { Wrapper, Head} from '../style'
import { actionCreators } from '../../store';
import CompleteOwe from '../completeOwe'
import Reward from '../tags'


class Owe extends React.Component {

	state = { visible: false, transData: null, transIndex: null };
		showDrawer = (item, index) => {
			this.setState({
			visible: true,
			transData: item,
			transIndex: index
			});
		};
		
		onClose = () => {
			this.setState({
			visible: false,
			});
		};

	render() {
		const { oweList } = this.props;
		console.log(this.props)
		return (
			<Wrapper>
				<Head>Favors</Head>
				<Divider />
				<List
					itemLayout="horizontal"
					dataSource={oweList}
					pagination={{
						pageSize: 5,
					}}
					renderItem={(item, index) => (
						<List.Item>
							<List.Item.Meta
								title={item.ownername}
								description={<Reward item={item}/>}
							/>
							<Button type='link' onClick={() => this.showDrawer(item, index)}>Complete</Button>
						</List.Item>	
					)}
				/>
							<Drawer
								title="Complete a Faovr"
								width={480}
								onClose={this.onClose}
								visible={this.state.visible}
								bodyStyle={{ paddingBottom: 80 }}
							>
								<CompleteOwe item={this.state.transData} index={this.state.transIndex}/>
            				</Drawer>
				</Wrapper>
		);
	}

	componentDidMount() {
		this.props.getAllOwes(this.props.username);
	}

}

const mapState = (state) => ({
	oweList: state.owes.oweList,
})

const mapDispatch = (dispatch) => ({
	getAllOwes(username) {      //get the render data of owes
		const iscomplete = false;
		const user = { username, iscomplete }
		const action = actionCreators.getOwesData(user);
		dispatch(action);
	}
})



export default connect(mapState, mapDispatch)(Owe);
