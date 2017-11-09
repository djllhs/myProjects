/**
 * Created by 代佳玲 on 2017/2/17.
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import action from  '../common/interface';
import {resStatistics, wxSetTitle,isiOS, ajax,isEmptyObj} from '../common/common';
import '../../scss/App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state={
            banner: null,
            isShowSpot: false
        };
        this.getNoticeTips = this.getNoticeTips.bind(this);
    }
    componentWillMount() {
        // document.title = '个人中心'
        wxSetTitle('我的');
        const url = action.showBanner,
            obj = {
                data: {location: 111},
                success: res => {
                    const closeNode = document.getElementsByClassName("tooltip_bar")[0];
                    if(res.success && !isEmptyObj(res.data)){
                        this.setState({
                            banner: res.data
                        });
                    }else  closeNode.className = "tooltip_bar";
                }
            };
        ajax(url, obj);
        let Request=new Object();
        Request=GetRequest();
        let u=Request['u'];
        this.setState({
            u,
        })
        !!u &&　this.getNoticeTips(u);
    }
    getNoticeTips(u){

        const url = action.noticeTips,
            obj = {
                data:{u},
                success: res => {
                    console.log(res);
                    if(res.success){
                        this.setState({
                            isShowSpot: res.data
                        });
                    }
                }
            };
        ajax(url, obj);
    }
    download() {
        const iosValue = document.getElementById('ioss').value,
            androidValue = document.getElementById('androids').value;
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
    onClickBanner(){
        resStatistics(action.eventUp,1053);
        location.href = this.state.banner.actionContent;
    }
    handleShop(){
        const shop = document.getElementById('shop').value;
        console.log("shop----",shop);
        location.href = shop;
    }
    handleMsg(){
        const msg = document.getElementById('message').value;
        console.log("msg----",msg);
        location.href = msg;
    }
    render() {
        const {banner,isShowSpot,u} = this.state;

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
                                <span>我的订单</span>
                                <div className="per_icon_pageRight"></div>
                            </div>
                        </Link>

                    </li>

                    <li>
                        <Link to="/coupon" activeClassName="li_active" >
                            <div>
                                <div className="per_icon_wrap">
                                    <img src={require("../../img/wap优惠券icon@3x.png")} alt=""/>
                                </div>
                                <span>优惠券</span>
                                <div className="per_icon_pageRight"></div>
                            </div>
                        </Link>

                    </li>
                    <li>
                    {
                        banner ? 
                            <img style={{width: '100%',marginTop: '0.13333rem'}} 
                                src={banner.imgUrl} alt="" onClick={this.onClickBanner.bind(this)}/>
                            : ""
                    }
                    </li>
                </ul>
               

                <div className="tooltip_bar tooltip_bar_display">

                    <div className="tooltip_bar_logo">
                        {/*<span>*/}
                            <img src={require('../../img/ic_share_logo.png')} className="tooltip_bar_logo_img"/>
                        {/*</span>*/}
                        <div className="tooltip_bar_logo_des">
                            <div className="tooltip_bar_logo_des_name">书链</div>
                            <div className="tooltip_bar_logo_des_content">
                                新人好礼-看书听课0元起</div>
                        </div>
                    </div>

                    <div className="tooltip_bar_download" onClick={this.download.bind(this)}>
                        <span>立即打开</span>
                    </div>
                    <div className="tooltip_bar_close">
                        <img src={require("../../img/Artboard 54@3x.png")} onClick={this.close.bind(this)}/>
                    </div>

                </div>

                <div className="bottom_navigator" style={{display:!!u ? "flex":"none"}}>
                    <div className="tab" onClick={this.handleShop.bind(this)}>
                        <img src={require("../../img/my/ic_home_default.png")} alt=""/>
                        <div>首页</div>
                    </div>
                    <div className="tab" onClick={this.handleMsg.bind(this)}>
                        <img src={require("../../img/my/ic_message_default.png")} alt=""/>
                        <div className="redSpot" style={{display:isShowSpot?"block":"none"}}></div>
                        <div>消息</div>
                    </div>
                    <div className="tab tab_active">
                        <img src={require("../../img/my/ic_my_active.png")} alt=""/>
                        <div>我的</div>
                    </div>    

                </div>
            </div>
        );
    }
}function GetRequest(){
    var url=location.search;//获取url中？后的字串
    var theRequest=new Object();
    if(url.indexOf("?")!=-1){
        var str=url.substr(1),//抽取从 start 下标开始的指定数目的字符
            strs=str.split("&");
        for(var i=0;i<strs.length;i++){
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


export default App;
