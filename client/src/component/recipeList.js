
import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import RecipeCard from './recipeCard';
import Loading from './loading';

const QUERY_ALL_RECIPES = gql`
  query GetRecipes {
    getRecipes {
      id
      name
      description
      imageUrl
    }
  }
`;

const UPDATE_RECIPE_MUTATION = gql`
  mutation UpdateRecipe($updateRecipeId: ID!, $recipeInput: RecipeInput) {
    updateRecipe(id: $updateRecipeId, recipeInput: $recipeInput) {
      id
      name
      description
      imageUrl
    }
  }
`;

const DELETE_RECIPE_MUTATION = gql`
  mutation DeleteRecipe($deleteRecipeId: ID!) {
    deleteRecipe(id: $deleteRecipeId){
      id
    }
  }
`;

const RecipeList = () => {
  const { data, loading, error } = useQuery(QUERY_ALL_RECIPES);
  const [updateRecipe] = useMutation(UPDATE_RECIPE_MUTATION);
  const [deleteRecipe] = useMutation(DELETE_RECIPE_MUTATION);

  if (loading) {
    
    return (
    <Loading/>
 );
    

  }

  if (error) {
    return <p className='flex justify-center text-red-500 font-bold '>{error.message}</p>;
  }

  const recipes = data.getRecipes || [];

  const handleUpdate = (recipeId, updatedData) => {
    updateRecipe({
      variables: {
        updateRecipeId: recipeId,
        recipeInput: updatedData,
      },
    }).then((response) => {
      console.log('Recipe updated:', response.data.updateRecipe);
    });
  };

  const handleDelete = (recipeId) => {
    deleteRecipe({
      variables: {
        deleteRecipeId: recipeId,
      },
    }).then(() => {
      console.log(`Recipe with ID ${recipeId} deleted`);
    });
  };

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4">Featured Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {data.getRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onUpdate={(updatedData) => handleUpdate(recipe.id, updatedData)}
            onDelete={() => handleDelete(recipe.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
