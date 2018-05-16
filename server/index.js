const { GraphQLServer } = require('graphql-yoga')
    , { string } = require('./superSecret.js')
    , massive = require('massive')
    , axios = require('axios')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => console.log(axios.get('https://swapi.co/api/people').then(res => res)),
        users: () => server.db().users.find()
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `Link-${idCount++}`,
                description: args.description,
                url: args.url,
                userId: 'user-1'
            }
            links.push(link)
            return link
        }
    },
    Link: {
        name: (root) => console.log(root)
    },
    User: {
        id: (root) => root.id,
        name: (root) => root.user_name,
    }
}

var server = new GraphQLServer({
    typeDefs: './server/schema.graphql',
    resolvers,
})

server.db = function(){
    return this.express.get("db")
}

massive(string).then(dbInstance => {
    server.express.set('db', dbInstance);
    server.start(() => console.log(`Server is running on 4000`))
})