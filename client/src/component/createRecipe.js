import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import AWS from '../aws-config';

const CREATE_RECIPE_MUTATION = gql`
  mutation CreateRecipe($recipeInput: RecipeInput) {
    createRecipe(recipeInput: $recipeInput) {
      id
      name
      description
      imageUrl
    }
  }
`;


const RecipeCreateModal = ({ showModal, onClose, onCreate }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null); // To store the selected image file
  const [imageUrl, setImageUrl] = useState(''); // To store the S3 URL after upload
  const [createRecipe] = useMutation(CREATE_RECIPE_MUTATION);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Create a URL for the selected image and display it as a preview
    // const imageUrl = URL.createObjectURL(file);
    const imageUrl = `https://my-recipe-bucket-one.s3.amazonaws.com/uploads/${file.name}`;

    setImageUrl(imageUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload the image to S3
      if (imageFile) {
        const s3 = new AWS.S3();
        const params = {
          Bucket: 'my-recipe-bucket-one',
          Key: `uploads/${imageFile.name}`,
          Body: imageFile,
        };
        const { Location } = await s3.upload(params).promise();
        setImageUrl(Location);
      }
       // Create the recipe with the GraphQL mutation, including the imageUrl
       const newRecipe = {
  
        name,
        description,
        imageUrl,
      };

       // Call the GraphQL mutation here
    const { data } = await createRecipe({
      variables: { recipeInput: newRecipe }, // Pass newRecipe as a variable
    });

      onCreate(newRecipe);
      onClose();
    } catch (error) {
      console.error('Error uploading image to S3:', error);
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        showModal ? 'block' : 'hidden'
      }`}
    >
      <div className="modal-overlay absolute inset-0 bg-gray-800 opacity-50"></div>

      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Create Recipe</p>
            <button
              onClick={onClose}
              className="modal-close p-2 rounded-full hover:bg-gray-300"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path
                  d="M12.571 12.172l-.797-.797L9 10.241l-2.774 1.134-.797.797L9 8.276l-2.572 2.896-.797-.797L7.206 9l-2.72-2.571.797-.797L9 7.724l2.774-1.134.797.797L10.794 9l2.72 2.571z"
                ></path>
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold">
                Recipe Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input mt-1 block w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description" className="block text-gray-700 font-bold">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-textarea mt-1 block w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>

            {/* <div className="mb-4">
              <label htmlFor="imageUrl" className="block text-gray-700 font-bold">
                Image URL
              </label>
              <input
                type="file"
                id="imageUrl"
                value={imageUrl}
                accept='image/jpg'
                onChange={(e) => setImageUrl(e.target.value)}
                className="form-input mt-1 block w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
                required
              />
            </div> */}
            <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700 font-bold">
            Image
          </label>
          <input
            type="file"
            id="imageUrl"
            onChange={handleImageChange}
            accept="image/*"
            className="form-input mt-1 block w-full border-2 border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
            required
          />
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Image Preview"
              className="mt-2 w-40 h-40 object-cover"
            />
          )}
        </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
              >
                Create Recipe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecipeCreateModal;
