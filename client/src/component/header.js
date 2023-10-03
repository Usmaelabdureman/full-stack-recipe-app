import React from 'react';

import logo from '../images/logo.jpg'
const Header = () => {
  return (
    <header className="bg-black py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-2xl font-semibold">
          <img
            src={logo}
            alt="Logo"
            className="h-10 w-10 mr-2 inline-block"
          />
          My Recipe App
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4 text-white">
            <li>
              <a href="/" className="hover:text-blue-300">Home</a>
            </li>
            <li>
              <a href="/recipes" className="hover:text-blue-300">Recipes</a>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-300">About</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
