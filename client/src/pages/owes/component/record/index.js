import React from 'react';
import { connect } from 'react-redux';
import { Wrapper, Head } from '../style';
import { Divider, List, Card, Image } from 'antd';
import { actionCreators } from '../../store'
import Reward from '../tags'


class record extends React.Component {

	render() {
		const { recordList } = this.props;
		return (
			<Wrapper>
				<Head>Favors record</Head>
				<Divider />
				<List
					itemLayout="vertical"
					size="large"
					dataSource={recordList}
					pagination={{ pageSize: 4 }}
					renderItem={item => (
						<List.Item
							extra={
								<Image
									width={172}
									alt=""
									src={item.proof ? item.proof[0] : null}
								></Image>
							}
						>
							<List.Item.Meta
								title={<p>{item.owepeoplename} owes {item.ownername}</p>}
								description={item.begin_date}
							/>
							{
								<Reward item={item}/>
							}
						</List.Item>
					)}
				/>
			</Wrapper>
		);
	}
	componentDidMount(){
		this.props.getAllRecord(this.props.username);
	}
}

const mapState = (state) => ({
	recordList: state.owes.recordList,
})

const mapDispatch = (dispatch) => ({
	getAllRecord(username) {   //get the render data of record
		const iscomplete = true;
		const user = { username, iscomplete }
		const action = actionCreators.getRecordData(user);
		dispatch(action);
	}
})



export default connect(mapState, mapDispatch)(record);