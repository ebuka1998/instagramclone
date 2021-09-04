const userResolvers = require('./userResolvers')
const postResolvers = require('./postResolvers')


module.exports = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
    },
    
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
    },

    // Subscription: {
    //     ...messageResolvers.Subscription
    // }
}