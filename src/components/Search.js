import React from 'react';
import '../styles/Search.css';
import {useForm} from 'react-hook-form';

const Search = ({searchEngingForName}) => {

    const { register, formState: {errors}, handleSubmit } = useForm();

    const handlerSearch = data => {
        searchEngingForName(data.searchForm);
    }
    return(
        <form className='searchForm' onSubmit={handleSubmit(handlerSearch)}>
            <label className='searchLabel'><b>ПОИСК</b></label>
            <input
              className='searchInput'
              placeholder='Поиск по имени'
              type="text"
              {...register('searchForm', { required: true })}
            />
                {errors.searchForm && <p>⚠ Обязательно для заполнения</p>}
  
            <input className='searchSubmit' type="submit" />
        </form>
    )
}

export default Search;