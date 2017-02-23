/**
 * Created by 代佳玲 on 2017/2/17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import action from  '../common/interface';
import {resStatistics} from '../common/common';
import '../../scss/App.css';

class App extends Component {
    componentWillMount() {
        document.title = '个人中心'
    }

    render() {
        return (
            <div className="personal">
                <ul className="per_list">
                    <li>
                        <Link to="/bookShelf" activeClassName="li_active">
                            <div>
                                <div className="per_icon_wrap">
                                    <img src={require("../../img/ic_my_bookcase@3x.png")} alt=""/>
                                </div>
                                <span>书架</span>
                                <div className="per_icon_pageRight"></div>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="/myCollection" activeClassName="li_active"  onClick={() => {resStatistics(action.eventUp, 1027)}}>
                            <div>
                                <div className="per_icon_wrap">
                                    <img src={require("../../img/ic_my _ccollection@3x.png")} alt=""/>
                                </div>
                                <span>我的收藏</span>
                                <div className="per_icon_pageRight"></div>
                            </div>
                        </Link>
                    </li>

                    <li>
                        <Link to="/purchased" activeClassName="li_active"  onClick={() => {resStatistics(action.eventUp,1028)}}>
                            <div>
                                <div className="per_icon_wrap">
                                    <img src={require("../../img/ic_my_bought@3x.png")} alt=""/>
                                </div>
                                <span>已购买的</span>
                                <div className="per_icon_pageRight"></div>
                            </div>
                        </Link>

                    </li>
                </ul>
            </div>
        );
    }
}

export default App;
