import React, {Component} from 'react'

class Link extends Component {
    render(){
        return (
            <div>
               <div>
                    {this.props.link.desc} ({this.props.link.name})
                </div> 
            </div>
        )
    }

    // _voteForLink = aysnc () => {
    //     //don't worry about this yet
    // }
}

export default Link