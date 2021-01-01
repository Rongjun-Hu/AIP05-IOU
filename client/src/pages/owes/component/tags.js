import React from 'react'
import { List, Tag } from 'antd'
import 'antd/dist/antd.css'


class tags extends React.Component{
    render(){
        const {item} = this.props
        return(
            <List
                grid={{ gutter: 16, xs: 1 }}
                dataSource={item.reward}
                renderItem={data => (
                    <List.Item>
                        <Tag color="blue"><p style={{ margin: 'auto' }}>{data.amount} {data.name}</p></Tag>
                    </List.Item>
                )}
            />
        );
    }
}

export default tags