import React from 'react';
import 'antd/dist/antd.css';
import { connect } from 'react-redux';
import {
	Select, Row, Col, Button,
	AutoComplete, InputNumber, List, Empty,
} from 'antd';
import { Div } from '../style';
import { AddOweWrapper} from './style';
import { DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { actionCreators } from '../store';

const { Option } = Select;


class Addown extends React.Component {
	render() {
		const { rewardList, userList, addrewardList, rewardname, rewardamount, owner, username, proof } = this.props;
		return (
			<AddOweWrapper>
				<Div style={{marginBottom: '15px' }}>
					<p>Owe to: </p>
					<Select
						showSearch
						style={{ width: '80%' }}
						placeholder="who owes you.."
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						value={owner}
						onSelect={this.props.owePeopleChange}
					>
						{userList.map(item => (
							<Option
								value={item.username}
								key={item._id}
							>
								{item.username}
							</Option>
						))}
					</Select>
				</Div>
				<p>Reward: </p>
				<Row>
					<AutoComplete
						style={{ width: '70%' }}
						placeholder="Reward"
						options={rewardList.map(item => (
							{ value: item.rewardName }
						))}
						onChange={this.props.rewardChange}
						value={rewardname}
					/>
					<Col style={{ marginTop: '8px' }}>
						<InputNumber style={{ marginRight: '30px' }} value={rewardamount} min={1} onChange={this.props.amountChange} />
						<Button onClick={() => this.props.handleAddReward(rewardname, rewardamount)}><PlusSquareOutlined /></Button>
					</Col>
				</Row>

				<List style={{ width: '100%', marginTop: '15px' }}
					itemLayout="horizontal"
					dataSource={addrewardList}
					renderItem={(item, index) => (
						<List.Item>
							<List.Item.Meta
								title={item.name}
								description={item.amount}
							/>
							<Button onClick={() => this.props.handleItemDelete(index)}><DeleteOutlined /></Button>
						</List.Item>
					)}>
				</List>
				<Button type="primary"
					style={{ margin: '10px auto' }}
					onClick={() => this.props.handleAddFavor(username, owner, addrewardList, proof)}
					block
				>Add</Button>
			</AddOweWrapper>
		);
	}
}

const mapState = (state) => ({
	owner: state.owes.owepeople,
	rewardname: state.owes.rewardname,
	rewardamount: state.owes.rewardamount,
	rewardList: state.owes.rewardList,
	userList: state.owes.userList,
	addrewardList: state.owes.addrewardList,
	proof: state.owes.fileList
});

const mapDispatch = (dispatch) => ({
	owePeopleChange(value) {
		const action = actionCreators.owePeopleChange(value);
		dispatch(action)
	},
	rewardChange(value) {
		const action = actionCreators.rewardChange(value);
		dispatch(action);
	},
	amountChange(value) {
		const action = actionCreators.amountChange(value);
		dispatch(action);
	},
	handleAddReward(name, amount) {
		const reward = {
			name: name,
			amount: amount
		};
		const action = actionCreators.addReward(reward);
		dispatch(action)
	},
	handleItemDelete(index) {
		const action = actionCreators.deleteReward(index);
		dispatch(action)
	},
	handleAddFavor(owepeoplename, ownername, reward, proof) {
		const iscomplete = false;
		const newFavor = {
			owepeoplename,
			ownername,
			reward,
			proof,
			iscomplete
		}
		const action = actionCreators.addFavor(newFavor);
		dispatch(action)
		alert("Add favors successfully")
	}
})


export default connect(mapState, mapDispatch)(Addown);
