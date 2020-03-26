import React from 'react';
import {Empty, Button} from 'antd';

function NotFount() {
    return (
        <Empty
            image={require('../../assets/svg/error-404.svg')}
            imageStyle={{height: 150}}
            description={<span>Opps!</span>}
        >
            <Button
                className="c-button c-button-secondary"
                type="primary"
                onClick={()=> {}}
            >
                Go Back
            </Button>
        </Empty>
    )
};
export default NotFount;