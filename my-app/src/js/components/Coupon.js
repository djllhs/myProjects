/**
 * 2017-9-14 优惠券
 */
import React, { Component } from 'react';
import {ajax, format_date, wxSetTitle} from '../common/common';
import action from  '../common/interface';
import Spinner from '../Utils/Spinner';
import Null from '../Utils/Null';

export default class Coupon extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 1,
            res:[],
            resCourse:[],
            favType:3,
            display:'block',
            appUrl: null,
            msg:'什么都木有' // 数据提示
        };
        this.getCouponList = this.getCouponList.bind(this);
    }
    componentWillMount() {
        wxSetTitle('优惠券');
        this.getCouponList({valid: this.state.currentIndex});
    }
    tab_click(currentIndex){
        this.setState({
            currentIndex: currentIndex,
            res:[],
            display:'block',
        },() => {
            this.getCouponList({valid: currentIndex});
        });
    }
    check_tittle_index(index){
        return index === this.state.currentIndex ? "per_tab_title per_tab_title_active" : "per_tab_title";
    }

    check_item_index(index){
        return index === this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }
    getCouponList(params = {valid:1}){
        const url = action.coupon,
            obj = {
                data: params,
                success: res => {
                    if (res.success) {
                        this.setState({
                            res: res.data,
                            display: 'none'
                        })
                    } else {
                        this.setState({
                            msg: res.msg,
                            display: 'none',
                        })
                    }

                },
            };
        ajax(url, obj);
    }
    render(){
        return(
            <div className="per_myCollection">
                <div className="per_myC_title_wrap">
                    <div onClick={ this.tab_click.bind(this,1)}
                        className={ this.check_tittle_index(1) }
                    >未使用</div>
                    <div onClick={this.tab_click.bind(this,0)}
                        className={ this.check_tittle_index(0) + " per_tab_title_spot"}>已失效</div>
                </div>
                <div className="per_purchased_content_wrap">
                    <div name="ineffective" className={ this.check_item_index(1) }>
                        <UnusedCoupon {...this.state}/>
                    </div>
                    <div name="effective"  className={ this.check_item_index(0) }>
                        <IneffectiveCoupon  {...this.state}/>
                    </div>
                </div>
            </div>
        )
    }
}

class UnusedCoupon extends Component {
    render(){
        const couponType = ["", "通用券","读书券"];
        couponType[8] = "点读券";
        couponType[11] = "课程券";
        const {res, display,  msg } = this.props,
            length = res.length;
        const couponList = !!length ? res.map((t, i) => {
                return (
                    <div className="per_unuserd_coupon_wrap">
                        <div className="per_unuserd_coupon_left">
                            <img  className="per_unuserd_coupon_left_semicircle" src={require("../../img/ic_coupon_halfround_left@3x.png")} alt=""/>
                            <div className="per_unuserd_coupon_left_amount_wrap">
                                <div className="per_unuserd_coupon_left_amount">
                                    ¥
                                    <span>{(t.amount/100).toFixed(0)}</span>
                                </div>
                                <div className="per_unuserd_coupon_left_amount_use">
                                    {!t.limitAmount ? "无使用门槛" : "满" + (t.limitAmount/100).toFixed(0)+"元可用"}
                                </div>
                            </div>
                        </div>
                        <div className="per_unuserd_coupon_right">
                            <div className="per_unuserd_coupon_right_top">
                                <div className="per_unuserd_coupon_right_title">{couponType[+t.type]}</div>
                                <a className="per_unuserd_coupon_right_title_right" href={t.actionContent} style={{display: t.actionType === 2 ? "block": "none"}}>
                                    <div className="per_unuserd_coupon_right_use">立即使用</div>
                                    <img  className="per_unuserd_coupon_right_arrow" src={require("../../img/ic_Right arrow@3x.png")} alt=""/>
                                </a>
                            </div>
                            <div className="per_unuserd_coupon_right_middle">
                                {t.endTime == null ? "长期有效":(t.startTime?format_date(t.startTime)+"-": "有效期至")+format_date(t.endTime)}
                            </div>
                            <div className="per_unuserd_coupon_right_bottom">
                                {t.description}
                            </div>
                            <img className="per_unuserd_coupon_right_semicircle" src={require('../../img/ic_coupon_halfround_right.@3x.png')} alt=""/>
                        </div>

                    </div>
                )
            }) :  <Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;
        return (
            <div className="per_coupon_list">
                <Spinner className="loading" style={{display:display}}/>
                { couponList }
            </div>
        )
    }
}
class IneffectiveCoupon extends Component {
    render(){
        const couponType = ["", "通用券","读书券"];
                couponType[8] = "点读券";
                couponType[11] = "课程券";
        const {res, display,  msg } = this.props,
            length = res.length;
        const couponList = !!length ? res.map((t, i) => {
                return (
                    <div className="per_unuserd_coupon_wrap">
                        <div className="per_unuserd_coupon_left per_ineffective_coupon_left">
                            <img  className="per_unuserd_coupon_left_semicircle" src={require("../../img/ic_coupon_halfround_left@3x.png")} alt=""/>
                            <div className="per_unuserd_coupon_left_amount_wrap">
                                <div className="per_unuserd_coupon_left_amount">
                                    ¥
                                    <span>{(t.amount/100).toFixed(0)}</span>
                                </div>
                                <div className="per_unuserd_coupon_left_amount_use">
                                    {!t.limitAmount ? "无使用门槛" : "满" + (t.limitAmount/100).toFixed(0)+"元可用"}
                                </div>
                            </div>
                        </div>
                        <div className="per_unuserd_coupon_right">
                            <div className="per_unuserd_coupon_right_top">
                                <div className="per_unuserd_coupon_right_title">{couponType[+t.type]}</div>
                                <img className="per_ineffective_coupon_img"
                                     src={t.status === 4 ? require("../../img/ic_coupon_use.png") : require("../../img/ic_coupon_expired.png")} alt=""/>
                            </div>
                            <div className="per_unuserd_coupon_right_middle">
                                {t.endTime == null ? "长期有效": (t.startTime?format_date(t.startTime)+"-": "有效期至")+format_date(t.endTime)}
                            </div>
                            <div className="per_unuserd_coupon_right_bottom">
                                {t.description}
                            </div>
                            <img className="per_unuserd_coupon_right_semicircle" src={require('../../img/ic_coupon_halfround_right.@3x.png')} alt=""/>
                        </div>

                    </div>
                )
            }):  <Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;
        return (
            <div className="per_coupon_list">
                <Spinner className="loading" style={{display:display}}/>
                { couponList }
            </div>
        )
    }
}