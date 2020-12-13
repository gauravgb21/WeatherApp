import React from 'react';

import SearchBar from '../../molecules/SearchBar/SearchBar';
import SearchListItem from '../../molecules/SearchListItem/SearchListItem';

import emptyFunction from '../../../Utilities/emptyFunction';
import './header.scss';

const Header = props => {
    const { clickedCity = '' , searchListData = [] , action = emptyFunction } = props;

    const searchListElement = searchListData.map((data,ind) => (<SearchListItem key={'searchlist-item'+ind} name={data.name} lat={data.lat} lon={data.lon} temp={data.temp} dayType={data.dayType} action={action}/>));

    const searchListCont = searchListElement.length > 0 ? (
        <ul>
            {searchListElement}
        </ul>
    ) : '';

    return(
        <div className={'wa-header'}>
            <SearchBar clickedCity={clickedCity} action={action}/>
            {searchListCont}
        </div>
    );
}

export default Header;