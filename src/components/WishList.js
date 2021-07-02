import React from 'react';
import '../styles/WishList.css';

const WishList = ({wish, deleteWish}) => {
    const deleteWishHandler = () =>{
        deleteWish(wish.id);
    }
    return(
                <li className='wishLi'>
                    {wish.name}
                    <button onClick={deleteWishHandler}>X</button>
                </li>
    )
}

export default WishList;