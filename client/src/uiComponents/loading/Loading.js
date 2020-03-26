import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

const Loading = () => {
    return(
        <div className="loading">
            <LoadingOutlined style={{ fontSize: 48 }} spin />
        </div>
    )
};

export default Loading
