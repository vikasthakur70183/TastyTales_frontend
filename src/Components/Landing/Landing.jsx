import React from 'react';
import './Landing.css';
import ShareRecipe from './Sections/ShareRecipe/ShareRecipe';
import food from '/Landing/Food.png'
import bg from '/Landing/bg1.jpg'
function Landing() {

    return (

        <div className="landing">
            <section className="landing-section1">
                <div className="landing-text">

                    <h1>Discover Culinary Delights from Around the Globe</h1>
                    <p>Tasty Tales - Where Every Bite Tells a Story!</p>
                    <br/>
                    <div className="landing-call-to-action">
                        <a href="/signup">Sign Up</a>
                    </div>
                    <p>Already a member? <a href="/login">Log in</a></p>
                </div>
                <div className="landing-image">
                    <img src={food} alt="Food Inspiration" />
                </div>
                <img className='background' src={bg} alt="" />
            </section>


            <ShareRecipe />
        </div>
    );
}

export default Landing;
