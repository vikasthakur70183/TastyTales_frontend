import React from 'react';
import './ShareRecipe.css';
import burger from '/Landing/burger.png';

function ShareRecipe() {
  return (
    <section className="share-recipe">
      <div className="share-recipe-container">
        <div className="share-recipe-image">
          <img src={burger} alt="Share a Recipe Image" />
        </div>
        <div className="share-recipe-text">
          <h1>Share Your Own Recipes</h1>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi, voluptatum!</p>
          <button className="create-button">Create New Recipe</button>
        </div>
      </div>
    </section>
  );
}

export default ShareRecipe;
