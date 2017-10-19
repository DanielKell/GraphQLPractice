//Contains all of the knowledge about how each object should look/link to
const graphql = require('graphql');
const axios = require('axios');
const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema, //Takes in a root query, and returns a GraphQL Schema 
    GraphQLList
} = graphql;

//must define above UserType
const CompanyType = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({ //This POSTPONES the running of this until after the doc is loaded
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        users: {
            type: new GraphQLList(UserType), //Telling GraphQL we will have multiple users
            resolve(parentValue, args) {
                return axios.get(`http.localhost:3000/companies/${parentValue.id}/users`)
                .then (resp => resp.data);
            }
        }
    })
});

//This object instructs graphql what a user object should look like
const UserType = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: {type: GraphQLString},
        firstName: {type: GraphQLString},
        age: {type: GraphQLInt},
        company: {
            type: CompanyType, 
//Need to return the company associated with a given user
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(resp => resp.data);
            }
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString} },
            resolve(parentValue, args){ //I'll look for the user!
                return axios.get(`http://localhost:3000/users/${args.id}`)
                .then (resp => resp.data); //take response, return the data 
                //Same as a fetch request
            }
        },
        company: {
            type: CompanyType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/companies/${args.id}`)
                .then(resp => resp.data);
            }
        }
         //args = arguments to return the corresponding user.
    } //If you give me an id, I will give you back the UserType you want
});

module.exports = new GraphQLSchema({
    query: RootQuery
});