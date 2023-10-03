import React, { useState } from "react";
import Header from "./component/header";
import RecipeList from "./component/recipeList";
import RecipeCreateModal from "./component/createRecipe";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
const App = () => {

  const [showModal, setShowModal] = useState(false);
  const [recipes, setRecipes] = useState([
    // Your initial recipes data here...
  ]);

  const [search, setSearch] = useState("");

  // Function to handle creating a new recipe
  const handleCreateRecipe = (newRecipe) => {
    setRecipes([...recipes, newRecipe]);
  };

  const client = new ApolloClient({
    cache:new InMemoryCache(),
    uri:"https://recipe-gufm.onrender.com/graphql"
  })

  const filteredRecipes = recipes.filter((recipe) =>
  recipe.name.toLowerCase().includes(search.toLowerCase())
);


  return (
    <ApolloProvider client={client}>
      <Header />
      <div>
      <div className="grid grid-cols-3 gap-4">
      <div className="flex  m-3 col-span-2">
      <h1 className="text-2xl font-semibold mb-4 mr-2 ml-5">Explore Your Recipe:</h1>
          <input
            type="search"
            placeholder="Search your recipe"
            className="border border-gray-400 rounded py-2 px-4 mr-2"
          />
          <button className="bg-blue-700 text-white font-bold py-2 px-4 rounded" 
          onClick={(e) => setSearch(e.target.value)}
          value={search}
          >
            Search
          </button>
          <div>
         {/* do search functionality here */}
         {filteredRecipes.map((recipe) => (
          
          <div key={recipe.id}>
            <h1>{recipe.name}</h1>
            <h1>{recipe.description}</h1>
          </div>
        ))}
        </div>
        </div>
        <div className="flex justify-end m-3">
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-700 text-white  rounded font-bold hover:bg-blue-600 rounded p-3"
        >
          Add Recipe
        </button>
        </div>
        {/* Render the RecipeCreateModal component */}
        <RecipeCreateModal
          showModal={showModal}
          onClose={() => setShowModal(false)}
          onCreate={handleCreateRecipe}
        />
      </div>
        
        <RecipeList />
      </div>
    </ApolloProvider>
  );
};

export default App;
