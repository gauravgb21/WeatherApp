import React, { useCallback } from 'react';

import SearchInput from '../../atoms/SearchInput/SearchInput';
import LocationIcon from '../../atoms/LocationIcon/LocationIcon';
import SearchIcon from '../../atoms/SearchIcon/SearchIcon';

import emptyFunction from '../../../Utilities/emptyFunction';
import debounce from '../../../Utilities/debounce';
import './search_bar.scss';

const SearchBar = props => {
    const { clickedCity = '' , action = emptyFunction } = props;

    const handleKeyUpEvent = useCallback(debounce(action,500),[]);
    
    return(
        <div className={'wa-search-bar'}>
            <LocationIcon />
            <SearchInput clickedCity={clickedCity} action={action} onKeyUpEvent={handleKeyUpEvent}/>
            <SearchIcon />
        </div>
    );
}

export default SearchBar;