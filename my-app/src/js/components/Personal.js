/**
 * Created by 代佳玲 on 2017/2/17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import action from  '../common/interface';
import {resStatistics, wxSetTitle,isiOS} from '../common/common';
import '../../scss/App.css';

class App extends Component {
    componentWillMount() {
        // document.title = '个人中心'
        wxSetTitle('个人中心')
    }
    download() {
        const iosValue = document.getElementById('ioss').value,
            androidValue = document.getElementById('androids').value
        console.log(iosValue);
        if(isiOS()){
            window.location = iosValue;
        }else{
            window.location = androidValue
        }
    }
    close() {
        const closeNode = document.getElementsByClassName("tooltip_bar")[0];

        closeNode.className = "tooltip_bar tooltip_bar_display";
        // alert(closeNode.className);
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
                        <Link to="/course" activeClassName="li_active" onClick={() => {resStatistics(action.eventUp,1032)}}>
                            <div>
                                <div className="per_icon_wrap">
                                    <img src={require("../../img/ic_my _course@3x.png")} alt=""/>
                                </div>
                                <span>我的课程</span>
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
                <div className="tooltip_bar">

                    <div className="tooltip_bar_logo">
                        {/*<span>*/}
                            <img src={require('../../img/ic_share_logo.png')} className="tooltip_bar_logo_img"/>
                        {/*</span>*/}
                        <div className="tooltip_bar_logo_des">
                            <div className="tooltip_bar_logo_des_name">书链</div>
                            <div className="tooltip_bar_logo_des_content">海量书籍配套资源</div>
                        </div>
                    </div>

                    <div className="tooltip_bar_download" onClick={this.download.bind(this)}>
                        <span>立即打开</span>
                    </div>
                    <div className="tooltip_bar_close">
                        <img src={require("../../img/Artboard 54@3x.png")} onClick={this.close.bind(this)}/>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
