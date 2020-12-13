import React from 'react';

import emptyFunction from '../../../Utilities/emptyFunction';
import './search_input.scss';

const SearchInput = props => {
    const { clickedCity = '' , action = emptyFunction , onKeyUpEvent = emptyFunction } = props;
    const inputAttr = {
        value : clickedCity
    };

    const attr = clickedCity !== '' ?  inputAttr : {};
    
    return(
        <input type='text' className={'search-input'} {...attr} placeholder={'Search City'}  onKeyUp={(e) => {
            action({ type : 'RESET_CLICKED' });
            onKeyUpEvent({ type : 'FETCH_PLACES' , payload : { searchKey : e.target.value } });
        }}/>
    );
}

export default SearchInput;