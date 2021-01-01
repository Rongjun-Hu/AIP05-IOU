import React from 'react'
import { connect } from 'react-redux'
import { List, Button, Tag, Divider, Popconfirm } from 'antd'
import 'antd/dist/antd.css'
import { Wrapper, ListWrapper, Head} from '../style'
import { actionCreators } from '../../store'
import Reward from '../tags'


class Owed extends React.Component {

	render() {
		const { owedList } = this.props;
		return (
			<Wrapper>
				<Head>Favors</Head>
				<Divider />
					<List
						itemLayout="horizontal"
						dataSource={owedList}
						pagination={{
							pageSize: 5,
						}}
						renderItem={(item, index) => (
							<List.Item>
								<List.Item.Meta
									title={item.owepeoplename}
									description={<Reward item={item}/>}
								/>
								<Popconfirm title="Are you sure？" 
											okText="Yes" 
											cancelText="No"
											onConfirm={() => this.props.handleComplete(item._id, item.proof, index)}>
									<Button type='link' >
										Complete 
									</Button>
								</Popconfirm>
								

							</List.Item>
						)}
					/>
			</Wrapper>
		);
	}
	componentDidMount(){
		this.props.getAllOwed(this.props.username);
	}
}

const mapState = (state) => ({
	owedList: state.owes.owedList,
})


const mapProps = (dispatch) => ({
	getAllOwed(username) {     //get the render data of owed
		const iscomplete = false;
		const user = { username, iscomplete }
		const action = actionCreators.getOwedData(user);
		dispatch(action);
	},
	handleComplete(id, proof, index) {
		const iscomplete = {
			iscomplete: true,
			proof: proof
		}
		const oweType = 'owed'
		const action = actionCreators.handleComplete(id, iscomplete, index, oweType);
		console.log(action)
		dispatch(action)
		alert("Complete successfully!")
	}
})

export default connect(mapState, mapProps)(Owed);