const { gql } = require('apollo-server');
module.exports = gql`
  type Recipe {
    id: ID!
    name: String!
    description: String!
    createdAt: String!
    thumbsUp: Int!
    thumbsDown: Int!
    imageUrl: String!
  }

  input RecipeInput {
    name: String!
    description: String!
    imageUrl: String!
  }

  type Query {
    recipe(id: ID!): Recipe!
    getRecipes(amount: Int): [Recipe]!
  }

  type Mutation {
    createRecipe(recipeInput: RecipeInput): Recipe!
    deleteRecipe(id: ID!): Recipe
    updateRecipe(id: ID!, recipeInput: RecipeInput): Recipe!
  }
`;