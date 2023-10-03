const { model, Schema } = require('mongoose');

const recipeSchema = new Schema({
  name: String,
  description: String,
  imageUrl: String, // Include the image field
  createdAt: String,
  thumbsUp: Number,
  thumbsDown: Number,
});

module.exports = model('Recipe', recipeSchema);
