import React from 'react';

import DailyForecastCardText from '../../atoms/DailyForecastCardText/DailyForecastCardText';
import PermissionModalButton from '../../atoms/PermissionModalButton/PermissionModalButton';
import emptyFunction from '../../../Utilities/emptyFunction';
import './permission_modal_body.scss';

const PermissionModalBody = props => {
    const { action = emptyFunction } = props;

    return(
        <>
            <div className={'wa-permission-modal-body'}>
                <DailyForecastCardText className={'dailyforecastcard-text--dark'} cardText={'Allow Weather App to access your location ?'}/>
            </div>
            <div className={'wa-permission-modal-footer'}>
                <PermissionModalButton btnText={'Don\'t Allow'} onBtnClick={() => action({ type : 'PERMISSION_NOT_ALLOWED' })}/>
                <PermissionModalButton btnText={'Allow'} onBtnClick={() => action({ type : 'PERMISSION_ALLOWED' })}/>
            </div>
        </>
    );
}

export default PermissionModalBody;