import React from 'react';
import "../assets/About.css";
import TeamCards from '../components/Teamcards.jsx';


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

    
        <TeamCards
          data={data}
        />
      </div>
    </div>
  );
}



const data = [
    {
        image: "/pictures/Steven Uruchima.jpeg",
        name: "Steven Uruchima",
        major: "Computer Science",
        pronouns: "he/him",
        description: "Steven is a junior and as our project lead, worked on creating the system design and developing the plans for our project. He also directed the tech committee, organizing and directing members to finish our project."
    },
    {
        image: "/pictures/Eduardo Aranda.jpg",
        name: "Eduardo Aranda",
        major: "Econometrics and Quantitative Economics ",
        pronouns: "he/him",
        description: "Eduardo is a junior who is minoring in Computer Science and Computer Engineering. As our Hardware Engineering Lead he worked on all the physical tools we are using for this project!"
    },
    {
        image: "/pictures/David Okafo.jpg",
        name: "David Okafo",
        major: "Computer Science",
        pronouns: "he/him",
        description: "David is a junior and he worked on computer vision software, implementing gesture-based canvas controls. Note: he worked on having the hand gestures recorded by the camera perform specfici actions!"
    },
    {
        image: "/pictures/Samuel Evangelista.jpg",
        name: "Samuel Evangelista",
        major: "Computer Science",
        pronouns: "he/him",
        description: "Sam is a junior and helped in the design and implementation for the User Interface and User Experience. The UI/ UX are all the visuals you're seeing right now!"
    },
    {
        image: "/pictures/David Kabeya.jpg",
        name: "David Kabeya",
        major: "Statistics & Computer Science",
        pronouns: "he/him",
        description: "David Kabeya is a junior and he assisted with the design of the User Interface of the website."
    },
    {
        image: "/pictures/Olamide Ogunjobi.jpg",
        name: "Olamide Ogunjobi",
        major: "Computer Science",
        pronouns: "he/him",
        description: "Olamide is a junior and he worked on enabling two fingers, left and right hands, drawing at the same time."
    },
    {
        image: "/pictures/Audrey Ramirez.png",
        name: "Audrey Ramirez",
        major: "Computer Science",
        pronouns: "she/her",
        description: "Audrey is a freshman and helped with the implementation of the 'About' webpage and the visualization of the hand skeleton."
    },
    {
        image: "/pictures/Daniel Umana.jpg",
        name: "Daniel Umana",
        major: "Computer Science",
        pronouns: "he/him",
        description: "Daniel is a freshman and he worked on sending data from the cv and IoT wand to AWS as well as merging the two data onto the same screen."
    },
    {
        image: "/pictures/Elias Ghanayem.jpg",
        name: "Elias Ghanayem",
        major: "Computer Science",
        pronouns: "he/him",
        description: "Elias is a freshman and he made sure the video streaming data we're using works safely and that the quality/ standard of the images are not lost."
    },
    {
        image: "/pictures/thalia.jpeg",
        name: "Thalia",
        major: "Anthopology with a Minor in Computer Science",
        pronouns: "she/her",
        description: "Thalia is a sophomore and she helped create make the About webpage based on the designs made."
    },
]
