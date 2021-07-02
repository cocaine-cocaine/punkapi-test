import React from 'react';
import "../styles/Cards.css";

 const Cards = ({cards, addWishToList}) =>{
    const pressWishHandler = () =>{
        addWishToList(cards.id, cards.name);
    }
    const btnToWish = () => {
        return <button className="btnAdd" onClick={pressWishHandler}><b>В желание</b></button>;
    }
    const btnIsInWish = () => {
        return <button className="btnDisable" ><b>добавлено</b></button>;
    }
    return(
        <div className='cards'>
            <div className="imgWrap">
                <img className="imgOfCard" src={cards.image_url}/>
            </div>
            
            <div className="nameOfCard"><b> {cards.name}</b></div>
            <div className="taglineOfCard"> {cards.tagline}</div>
            <div className="firstBrewedOfCard"><b>first_brewed: </b>{cards.first_brewed}</div>
            <div className="descriptionOfCard"><b>description: </b>{cards.description.substring(0, 50)}...</div>
            <div className="btnAddWrap">
                {cards.wishBtnFlag ? btnIsInWish() : btnToWish()}
            </div>
        </div>
    )
}
export default Cards