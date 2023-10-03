const {ApolloServer} =require("apollo-server");
const mongoose = require("mongoose");

// const MONGO_URI=process.env.MONGO_URI;
MONGO_URI='mongodb+srv://usmael:tododb@todo-db.2epuypc.mongodb.net/?retryWrites=true&w=majority'

const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    });

mongoose.connect(MONGO_URI, { useNewUrlParser: true })
    .then(() => {
        console.log("MongoDB Connected");
        return server.listen({ port: 5000 });
    })
    .then((res) => {
        console.log(`Server running at ${res.url}`);
    });


