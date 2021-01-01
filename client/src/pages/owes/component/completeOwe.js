import React from 'react'
import { connect } from 'react-redux'
import { Button, Col, Upload, Divider, Table } from 'antd'
import 'antd/dist/antd.css'
import { AddOweWrapper, Head } from './style'
import { UPLOAD_URL, UPLOAD_PRESET } from './url'
import { actionCreators } from '../store'
import request from 'superagent';

const { Column } = Table;

class Complete extends React.Component {


	render() {
		const { item, index, imgList, fileList } = this.props
		return (
			<AddOweWrapper>
				<Head>{item.ownername}</Head>
				<Divider />
				<Table dataSource={item.reward}>
					<Column title="Reward" dataIndex="name" key="name" />
					<Column title="Amount" dataIndex="amount" key="amount" />
				</Table>
				<Col style={{ margin: '20px 0 20px 0' }}>
					<Upload
						onRemove={this.props.removeImage}
						beforeUpload={this.props.beforeUpload}
						disabled={imgList.length === 1}
					>
						<Button >Select File</Button>
					</Upload>
					<Button
						type="primary"
						onClick={() => this.props.handleSubmit(imgList[0], item.proof, item.iscomplete)}
						disabled={imgList.length === 0}
						style={{ marginTop: 16 }}
					>
						Upload proof
                    </Button>
				</Col>
				<Button type="primary"
					style={{ margin: '10px auto' }}
					onClick={() => this.props.handleComplete(item._id, fileList, index)}
					block
				>Complete</Button>
			</AddOweWrapper>
		);
	}
}

const mapState = state => ({
	imgList: state.owes.imgList,
	fileList: state.owes.fileList,
})


const mapDispatch = dispatch => ({
	removeImage() {
		dispatch({
			type: 'REMOVE_IMAGE'
		})
	},
	beforeUpload(file) {
		const action = {
			type: 'FILE_UPLOAD',
			value: file
		}
		dispatch(action)
		return false;
	},
	handleSubmit(file, proof, iscomplete) {
		let upload = request.post(UPLOAD_URL)
			.field('upload_preset', UPLOAD_PRESET)
			.field('file', file);
		upload.end((err, response) => {
			if (err) {
				console.error(err);
				alert("Upload fail")
			}
			if (response.body.secure_url !== '') {
				const action = {
					type: 'GET_URL',
					url: response.body.secure_url,
					originProof: proof
				}
				console.log(action)
				dispatch(action)
			}
		});
	},
	handleComplete(id, proof, index) {
		const iscomplete = {
			iscomplete: true,
			proof: proof
		}
		const oweType = 'owe'
		const action = actionCreators.handleComplete(id, iscomplete, index, oweType);
		console.log(action)
		dispatch(action)
	}
})


export default connect(mapState, mapDispatch)(Complete)