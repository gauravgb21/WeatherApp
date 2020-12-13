import React from 'react';

import emptyFunction from '../../../Utilities/emptyFunction';
import PermissionModalBody from '../../molecules/PermissionModalBody/PermissionModalBody';
import './permission_modal.scss';

const PermissionModal = props => {
    const { action = emptyFunction } = props;

    return(
        <div className={'wa-permission-modal'}>
            <PermissionModalBody action={action}/>
        </div>
    );
}

export default PermissionModal;