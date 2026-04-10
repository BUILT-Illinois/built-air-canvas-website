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
                        <h2 className='nombre'><span className='brown'>{item.name} ({item.major})</span></h2>
                    </div>

                    <div className = 'impact' onClick={() => flipCard(index)}>
                        <p className='cardText'>{item.description}</p>
                    </div>
                </ReactCardFlip>
            ))}
        </div>

    )
}

export default TeamCards;
/*
const [isFlipped, setIsFlipped] = useState(false);
    function flipCard(){
        setIsFlipped(!isFlipped);
}
{props.data.map((item) => (
    <div className='card-container'>
            
    </div>       
                    /*<SwiperSlide className='slides'>
                        <div className='cards'>
                            <h2 className='nombre'><span className='brown'>{item.name} ({item.major})</span></h2>
                            <p className='cardText'>{item.description}</p>
                        </div>
                        <div className='imgcontainer'>
                            <img className='image' src={item.image} alt='profpic'/>
                        </div>
                    </SwiperSlide>

                    <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
                        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>AB</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>CD</Text></TouchableOpacity>
                    </CardFlip>*/