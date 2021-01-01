import React from 'react'
import 'antd/dist/antd.css'
import { connect } from 'react-redux'
import {
	Select, Row, Col, Button,
	AutoComplete, InputNumber, List, Upload
} from 'antd';
import { UploadOutlined, DeleteOutlined, PlusSquareOutlined } from '@ant-design/icons';
import { Div } from '../../style'
import { AddOweWrapper, Head } from '../style'
import { actionCreators } from '../../store'


const { Option } = Select;

class Addowed extends React.Component {


	render() {
		const { rewardList, userList, addrewardList, rewardname, rewardamount, owepeople, proof, auth } = this.props;
		return (
			<AddOweWrapper>
				<Head>Add an owed</Head>
				<Row style={{margin: '0 0 15px 0' }}>
					<p>Owe to: </p>
					<Select
						showSearch
						style={{ width: '80%' }}
						placeholder="who owes you.."
						optionFilterProp="children"
						filterOption={(input, option) =>
							option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
						}
						value={owepeople}
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
				</Row>
				<p>Favor:</p>

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
						<InputNumber placeholder="amount" style={{ marginRight: '30px' }} value={rewardamount} onChange={this.props.amountChange} />
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
				<Upload
					listType="picture"

					className="upload-list-inline"
					onChange={this.props.handleUpload}
				>
					<Button icon={<UploadOutlined />}>Upload</Button>
				</Upload>
				<Button
					type="primary"
					style={{ margin: '10px auto' }}
					onClick={() => this.props.handleAddFavor(owepeople, auth.username, addrewardList, proof)}
					block
				>
					Add
				</Button>
			</AddOweWrapper>

		);
	}
}

const mapState = (state) => ({
	auth: state.auth.user,
	owepeople: state.owes.owepeople,
	rewardname: state.owes.rewardname,
	rewardamount: state.owes.rewardamount,
	rewardList: state.owes.rewardList,
	userList: state.owes.userList,
	addrewardList: state.owes.addrewardList,
	proof: state.owes.fileList
})

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
	handleUpload({ fileList }) {
		const action = actionCreators.addPicture(fileList);
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
	}
})


export default connect(mapState, mapDispatch)(Addowed);