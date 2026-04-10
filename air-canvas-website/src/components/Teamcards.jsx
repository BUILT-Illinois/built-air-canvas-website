import React, { useState } from "react";
import ReactCardFlip from 'react-card-flip'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay, Navigation, Pagination} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../assets/Teamcards.css';


function TeamCards(props) {
    const [flippedCards, setFlippedCards] = useState({});
    function flipCard(index){
        setFlippedCards(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    }

    return (
        <div className='card-container'>
            {props.data.map((item, index) => (
                <ReactCardFlip
                key={index}
                flipDirection ='horizontal'
                isFlipped={!!flippedCards[index]}>
                    <div className = 'basic-info' onClick={() => flipCard(index)}>
                        <div className='imgcontainer'>
                            <img className='image' src={item.image} alt='profpic'/>
                        </div>
                        <h2 className='nombre'>{item.name}</h2>
                        <p className='study'>{item.major}</p>
                    </div>

                    <div className = 'impact' onClick={() => flipCard(index)}>
                        <p className='tasks'>{item.description}</p>
                    </div>
                </ReactCardFlip>
            ))}
        </div>

    )
}

export default TeamCards;
