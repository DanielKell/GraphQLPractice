//Contains all of the knowledge about how each object should look/link to
const graphql = require('graphql');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = graphql;

//This object instructs graphql what a user object should look like
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString} },
            resolve(parentValue, args){ //I'll look for the user!
                
            }
        } //args = arguments to return the corresponding user.
    } //If you give me an id, I will give you back the UserType you want
});