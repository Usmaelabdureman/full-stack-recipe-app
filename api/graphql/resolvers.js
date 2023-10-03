const Recipe = require('../models/recipe');
module.exports ={
    Query :{
        async recipe(_, {id}){
            try{
                const recipe = await Recipe.findById(id);
                if(recipe){
                    return recipe;
                }else{
                    throw new Error("Recipe not found");
                }
            }catch(err){
                throw new Error(err);
            }
        },
        async getRecipes(_, {amount}){
            try{
                const recipes = await Recipe.find().sort({createdAt: -1}).limit(amount);
                return recipes;
            }catch(err){
                throw new Error(err);
            }
        },},
        Mutation:{
            async createRecipe(_, {recipeInput: {name, description,imageUrl}}, context){
                const newRecipe = new Recipe({
                    name,
                    description,
                    imageUrl,
                    createdAt: new Date().toISOString(),
                    thumbsUp: 0,
                    thumbsDown: 0,
                });

                const recipe = await newRecipe.save(); //mongo db save
                return {
                    ...recipe._doc,
                    id: recipe._id,
                };
                },
            async deleteRecipe(_, {id}){
                    const wasDeleted = (await Recipe.deleteOne({_id: id})).deletedCount;
                    return wasDeleted;
            },
            async updateRecipe(_, {id, recipeInput: {name, description,imageUrl}}){
                
                    const wasEdited = (await Recipe.updateOne({_id: id}, {name, description,imageUrl})).nModified;
                    return wasEdited;
            },
        }
      
    }