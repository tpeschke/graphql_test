const { GraphQLServer } = require('graphql-yoga')
    , { string } = require('./superSecret.js')
    , massive = require('massive')
    , axios = require('axios')

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        sales: (some, args, any) => console.log(some, args, any),
        // server.db().sale.find(),
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
    Sale: {
        id: (root) => root.id,
        name: (root) => root.sale_name,
        desc: (root) => root.sale_desc,
        userId: (root) => root.sale_user
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