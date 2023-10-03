import React from 'react';

const AboutMe = () => {
  const myName = 'Usmael Abdurhaman'; // Replace with your actual name
  const aboutRecipes = 'I love cooking and exploring new recipes!';

  return (
    <div className="text-center">
      <h1 className="text-3xl font-semibold mb-4">About Me</h1>
      <p className="text-lg text-gray-700">{`Hi, I'm ${myName}.`}</p>
      <p className="text-lg text-gray-700">{aboutRecipes}</p>
    </div>
  );
};

export default AboutMe;
