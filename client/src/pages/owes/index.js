import React from 'react';
import Fav from './favors'

class Favor extends React.Component{
    render(){
        console.log(this.props)
        return(
            <div>
                <Fav username={this.props.match.params.id}/>
            </div>
        );
    }
}

export default Favor;