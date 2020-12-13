import React from 'react';

import emptyFunction from '../../../Utilities/emptyFunction';
import './permission_modal_btn.scss';

const PermissionModalButton = props => {
    const { btnText = '' , onBtnClick = emptyFunction } = props;
    return(
        <button className={'wa-modal-btn'} onClick={() => onBtnClick()}>{btnText}</button>
    );
}

export default PermissionModalButton;