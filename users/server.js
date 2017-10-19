const express = require('express');
const expressGraphQL = require('express-graphql'); //Glue between the two

const app = express();

//How we wire up middleware to express: app.use
app.use('/graphql', expressGraphQL({
    graphiql: true
})); 

app.listen(4000, () => {
    console.log('Listening');
});