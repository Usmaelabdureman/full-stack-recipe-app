
import React, { useState } from 'react';

const RecipeCard = ({ recipe, onUpdate, onDelete }) => {
  const { id, name, description, imageUrl } = recipe;
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecipe, setEditedRecipe] = useState({ name, description });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onUpdate(editedRecipe);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedRecipe({ name, description ,imageUrl});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedRecipe({ ...editedRecipe, [name]: value });
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={imageUrl} alt={name} className="w-full h-40 object-cover" />

      <div className="p-4">
        {isEditing ? (
          <>
            <input
              type="text"
              name="name"
              value={editedRecipe.name}
              onChange={handleInputChange}
              className="text-xl font-semibold"
            />
            <textarea
              name="description"
              value={editedRecipe.description}
              onChange={handleInputChange}
              className="text-gray-600 mt-2"
            />
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold">{name}</h2>
            <p className="text-gray-600 mt-2">{description}</p>
          </>
        )}
      </div>

      <div className="flex justify-end p-4">
        {isEditing ? (
          <>
            <button
              onClick={handleSaveClick}
              className="bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={handleCancelClick}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <button
              onClick={handleEditClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(id)}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;
