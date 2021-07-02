import React,{useState, useEffect} from 'react';
import axios from 'axios';
import Cards from './components/Cards.js';
import Search from './components/Search.js';
import WishList from './components/WishList.js';
import ReactPaginate from 'react-paginate';
import './App.css';

function App() {

  const [cardsOfGoods, setCardsOfGoods] = useState([]);
  const [listOfWish, setListOfWish] = useState([]);
  
  const [searchedState, setSearchedState] = useState([]);
  const [flagForRenderSearch, setFlagRender] = useState(false);

  const [paginPageNumbers, setPageNumbers] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = paginPageNumbers * usersPerPage;
  const pageCount = Math.ceil(cardsOfGoods.length / usersPerPage)
  const changePage = ({selected}) => {
    setPageNumbers(selected);
  }

  const addWishToList = (idForMove, name) => {

    const nextState = [
      ...listOfWish,
      {
        id: idForMove,
        name: name
      }
    ];
    setListOfWish(nextState);

    const cardIndex = cardsOfGoods.findIndex(card => card.id === idForMove);
    const card = cardsOfGoods[cardIndex];
    if(card){
      const updated = Object.assign({}, card, {wishBtnFlag: true});
      const flagNextState = cardsOfGoods;
      flagNextState[cardIndex] = updated;
      setCardsOfGoods(flagNextState);
    }

  }

  const deleteWish = (idForDelete) => {
    const nextWishState = listOfWish.filter(wish => wish.id !== idForDelete);
    setListOfWish(nextWishState);

    const cardIndex = cardsOfGoods.findIndex(flagCard => flagCard.id === idForDelete);
    const card = cardsOfGoods[cardIndex];
    if(card){
      const updated = Object.assign({}, card, {wishBtnFlag: false})
      const nextCardState = cardsOfGoods;
      nextCardState[cardIndex] = updated;
      setCardsOfGoods(nextCardState);
    }

    
  }
  const isEmptyArr = (obj) => {
    for (let key in obj) {
      return true;
    }
    return false;
  }
  const searchEngingForName = (nameForSearch) =>{
      const nextSearchState = cardsOfGoods.filter(card => card.name === nameForSearch)
      if(isEmptyArr(nextSearchState)){
          setSearchedState(nextSearchState);
          setFlagRender(true);
      }else{
        alert('Товар не найден');
      }
      console.log('nameForSearch'+nameForSearch);

  }

  const renderInitialGoods = () => {
    return(
      cardsOfGoods.slice(pagesVisited, pagesVisited + usersPerPage).map(cards => {
        return <Cards key={cards.id.toString()} 
                      cards={cards} 
                      addWishToList={addWishToList}
                />
      })
    )
  }

  const renderSearchedGoods = () => {
      console.log(searchedState[0]);
      return(
        searchedState.map(cards => {
          return <Cards key={cards.id.toString()} 
                        cards={cards} 
                        addWishToList={addWishToList}
                 />
      })
      )
  }
  useEffect(() => {
    const getGoods = async () => {
      const res = await axios.get('https://api.punkapi.com/v2/beers');
      setCardsOfGoods(res.data);
      console.log(res.data)
    }

    getGoods();
  },[])

  return (
    <div className="App">
      <div className="leftSide">
        <Search searchEngingForName={searchEngingForName}/>
        <div className="wrapOfWish">
          <text className="wishLabel">Список желаний:</text>
          <ul className='wishUl'>
            {listOfWish.map(wish => {
               return <WishList key={wish.id} wish={wish} deleteWish={deleteWish}/>
            })}
          </ul>
        </div>
      </div>
      <div className="rightSide">
        <div className="wrapperGoods">
          {flagForRenderSearch ? renderSearchedGoods() : renderInitialGoods()}
          <ReactPaginate 
            previousLabel='<'
            nextLabel='>'
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={'paginateBtns'}
            disabledClassName={'paginationDisabled'}
          />
        </div>
        
      </div>
    </div>
  );
}

export default App;
