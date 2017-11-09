/**
 * Created by 代佳玲 on 2017/2/21.
 */

import React, {Component} from 'react';
import '../../scss/App.css';

class Null extends Component {
    render() {
        const {style, text} = this.props;
        return (
            <div className="_null" style={style}>
                <img src={require("../../img/ic_cache@3x.png")} alt=""/>
                <div className="_null_text">{text}</div>
            </div>
        )
    }
}


Null.propTypes = {
    style: React.PropTypes.object,
    text: React.PropTypes.string,
    className: React.PropTypes.string,
    src: React.PropTypes.string,
};

Null.defaultProps = {
    text: "什么都木有"
};


export default Null;