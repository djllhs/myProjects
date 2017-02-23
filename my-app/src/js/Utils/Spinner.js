/**
 * Created by 代佳玲 on 2017/2/21.
 */

import React, {Component} from 'react';

class Spinner extends Component {
    render() {
        const {text,style, className} = this.props;

        return (
            <div className={className} style={style}>{text}</div>
        )
    }
}

Spinner.propTypes = {
    type: React.PropTypes.string,
    display: React.PropTypes.string,
    style: React.PropTypes.object,
    text: React.PropTypes.string,
    show: React.PropTypes.bool,
    className: React.PropTypes.string,
};

Spinner.defaultProps = {
    style: {},
    text: '加载中...',
    show: false,
    className:''
}

export default Spinner;