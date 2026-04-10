import React from 'react';
import "../assets/About.css";
import PplSlider from '../components/Pplslider.jsx';


export default function About() {
  return (
    <div>
      <div className="about-container">
        <div className="left">
            <h1>Overview</h1>
            <h2>
              B[U]ILT Air Canvas is an interactive Engineering Open House exhibit
              that lets visitors “draw in the air” using Disney-style ESP32 wands
              or hand gestures tracked by a webcam, turning motion into real-time
              visualizations on a screen
            </h2>
          </div>
          <div className="right">
            <div className="curved-box"></div>
          </div>
        <div className="left">
          <div className="curved-box"></div>
        </div>
        <div className="left">
          <h1>Why We Built It</h1>
          <h2>
            B[U]ILT Air Canvas is an interactive Engineering Open House exhibit
            that lets visitors “draw in the air” using Disney-style ESP32 wands
            or hand gestures tracked by a webcam, turning motion into real-time
            visualizations on a screen
          </h2>
        </div>
        <div className="left">
          <h1>How We Built It</h1>
          <h2>
            Step#
          </h2>
          <h3>
            step description
          </h3>
        </div>
        <div className="right">
          <div className="curved-box"></div>
        </div>
        <div className="left">
          <div className="curved-box"></div>
        </div>
        <div className="right">
          <h2>
            Step#
          </h2>
          <h3>
            step description
          </h3>
        </div>
        <div className="left">
          <h2>
            Step#
          </h2>
          <h3>
            step description
          </h3>
        </div>
        <div className="right">
          <div className="curved-box"></div>
        </div>
        <div className="left">
          <div className="curved-box"></div>
        </div>
        <div className="right">
          <h1>
            Challenges We Overcame
          </h1>
        </div>

    
        <PplSlider
          data={data}
        />
      </div>
    </div>
  );
}



const data = [
    {
        image: "/public/logo192.png",
        nombre: "President",
        major: "Melissa Aninagyei-Bonsu",
        pronouns: "she/her",
        description: "Hey, I’m Melissa, President of B[U]ILT! I spend most of my time bouncing between classes, running track, playing flag football, and figuring out what to do with my hair next. Leading B[U]ILT is one of my favorite parts of college! I get to meet amazing people, plan fun events, and help create a community where we can all thrive."
    },
    {
        image: "/public/logo192.png",
        nombre: "Vice President",
        major: "Bolden Jones",
        pronouns: "he/him",
        description: "Hi, my name is Bolden! I am a senior studying Computer Science with a minor in Statistics, from Flossmoor, IL. As this year’s Vice President, I’m excited to help lead B[U]ILT in fostering community, supporting our members, and strengthening the overall impact of our organization. In my free time, I like going to the gym, playing volleyball, and playing electric guitar."
    },
    {
        image: "/public/logo192.png",
        nombre: "Marketing Director",
        major: "Paloma Pichardo",
        pronouns: "she/her",
        description: "Hi! My name is Paloma Pichardo, and I am a sophomore studying Computer Science with a minor in Business. I am from Houston, Texas and really enjoy running, eating sushi, and the movie Fantastic Mr. Fox. I am so excited to serve as Marketing Director this school year and can’t wait to meet you all!"
    },
]
