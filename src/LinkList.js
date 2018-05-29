import React, {Component} from 'react'
import Link from './Link'
import {graphql} from 'react-apollo'
import gql from 'graphql-tag'

class LinkList extends Component {
    constructor() {
        super()

        this.state = {
            user: 1
        }
    }

    render () {
        if (this.props.feedQuery && this.props.feedQuery.loading) {
            return <div>Loading</div>
        }

        if (this.props.feedQuery && this.props.feedQuery.error) {
            return <div>Error</div>
        }

        const linksToRender = this.props.feedQuery.sales
        return (
            <div>
                {linksToRender.map(link => <Link key={link.id} link={link}/>)}
            </div>
        )
    }
}

const FEED_QUERY = gql`
    query FeedQuery ($userId: Int!) {
        sales (userId: $userId){
                id
                name
                desc
                user {
                    id
                    name
                }
        }
    }`

export default graphql(FEED_QUERY, {name: 'feedQuery', variables: {$userID: 1}})(LinkList)