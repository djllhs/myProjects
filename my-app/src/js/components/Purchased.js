/**
 * Created by 代佳玲 on 2017/2/17.
 */
import React, { Component } from 'react';
import {ajax, wxSetTitle, format_price} from '../common/common';
import action from  '../common/interface';
import Spinner from '../Utils/Spinner';
import Null from '../Utils/Null';

class Purchased extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0,
            res:[],
            resLessons:[],
            display:'block',
            msg:'什么都木有'
        };
        this.reload = this.reload.bind(this);
    }
    componentWillMount() {
        document.title = '已购买的';
        wxSetTitle('我的订单');
        this.reload();
    }

    tab_click(currentIndex){
        console.log("--1111",currentIndex);
        this.setState({
            currentIndex: currentIndex,
        });
    }
    check_tittle_index(index){
        return index === this.state.currentIndex ? "per_purchased_tab_title per_purchased_tab_title_active" : "per_purchased_tab_title";
    }
    // check_title_line_index(index){
    //     return index === this.state.currentIndex ? "per_purchased_tab_title_line" : "per_purchased_tab_title_line_hidden";
    // }
    check_item_index(index){
        return index === this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }
    reload() {
        const url = action.bought,
            obj = {
                success: res => {
                    if (res.success) {
                        this.setState({
                            res: res.data,
                            display: 'none'
                        });
                    }else {
                        this.setState({
                            res: [],
                            resLessons: [],
                            display: 'none',
                            msg: res.msg
                        });
                    }
                }
            };
        ajax(url, obj);
    }

    render(){
        const {display, msg, res} = this.state;
        return(
            <div className="per_purchased">
                <div className="per_purchased_title_wrap">
                    <div onClick={this.tab_click.bind(this,0)}
                         className={ this.check_tittle_index(0) }
                    >
                        图书资源
                        {/*<div className={this.check_title_line_index(0)}></div>*/}
                    </div>
                    <div onClick={this.tab_click.bind(this,1)}
                         className={ this.check_tittle_index(1) + " per_tab_title_spot"}>
                        点读书
                        {/*<div className={this.check_title_line_index(1)}></div>*/}
                    </div>
                    <div onClick={this.tab_click.bind(this,2)}
                         className={ this.check_tittle_index(2) }>
                        课程
                        {/*<div className={this.check_title_line_index(2)}></div>*/}
                    </div>
                    <div onClick={this.tab_click.bind(this,3)}
                         className={ this.check_tittle_index(3) }>
                        纸质书
                        {/*<div className={this.check_title_line_index(3)}></div>*/}
                    </div>
                    <div  onClick={this.tab_click.bind(this,4)}
                         className={ this.check_tittle_index(4) }>
                         学习计划
                         {/*<div className={this.check_title_line_index(4)}></div>*/}
                    </div>
                </div>
                <div className="per_purchased_content_wrap">
                    <Spinner className="loading" style={{display:display}}/>
                    <div name="teletext" className={ this.check_item_index(0) }>
                        <TeletextResources display={display}
                                           books={res.books}
                                           msg={msg}
                        />
                    </div>
                    <div name="spotBooks"  className={ this.check_item_index(1) }>
                        <SpotBooksResources display={display}
                                            clicks={res.clicks}
                                            msg={msg}
                        />
                    </div>
                    <div name="course" className={ this.check_item_index(2)}>
                        <Course display={display}
                                lessons={res.lessons}
                                msg="您还未购买课程"/>
                    </div>
                    <div name="paperBook" className={ this.check_item_index(3)}>
                        <PaperBook display={display} msg={msg} pBooks={res.pBooks} reload={this.reload}/>
                    </div>
                    <div name="studyPlans" className={ this.check_item_index(4)}>
                        <StudyPlans display={display} msg={msg} studyPlans={res.studyPlans}
                                    reload={this.reload}/>
                    </div>
                </div>
            </div>
        )
    }
}

class TeletextResources extends Component{

    bookInfo(item){
        window.location=action.bookInfo +'id=' + item.id + '&sign=' + item.idSign;
    }

    render(){
        const {books, display, msg} = this.props,
            length =books ? books.length : 0;
        const teletextList = !!length ? books.map((item, index) => {
            return (
                <div className="per_purchased_item_wrap" key={index}
                     onClick={this.bookInfo.bind(this,item)}
                >
                    <div className="per_purchased_item_status">购买成功</div>
                    <div className="per_purchased_item">
                        <img className="per_purchased_item_thumbnails" src={item.thumbnails} alt=""/>
                        <div className="per_purchased_item_detail">
                            <div className="per_purchased_item_name">{item.name}</div>
                            <div className="per_purchased_item_publisher">{item.author+'/'+item.publisher}</div>
                            <div className="per_purchased_item_price">¥{format_price(item.price)}</div>
                        </div>
                    </div>
                    <div className="per_purchased_item_pay">
                        实付款：¥{format_price(item.buyPrice)}
                    </div>
                </div>
            )
        }) : <Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;

        return(
            <div className="per_purchased_teletext_container">

                {teletextList}
            </div>
        )
    }
}

class SpotBooksResources extends Component{

    bookInfo(item){
        window.location=action.spotBook +'bookId=' + item.id;
    }
    render(){

        const {clicks, display, msg} = this.props,
            length = clicks ? clicks.length : 0;
        const spotBooksList = !!length ? clicks.map((item, index) => {

            return (
                <div className="per_purchased_item_wrap" key={index}
                     onClick={this.bookInfo.bind(this,item)}
                >
                    <div className="per_purchased_item_status">购买成功</div>
                    <div className="per_purchased_item">
                        <img className="per_purchased_item_thumbnails" src={item.thumbnails} alt=""/>
                        <div className="per_purchased_item_detail">
                            <div className="per_purchased_item_name">{item.name}</div>
                            <div className="per_purchased_item_publisher">{item.author+'/'+item.publisher}</div>
                            <div className="per_purchased_item_price">¥{format_price(item.price)}</div>
                        </div>
                    </div>
                    <div className="per_purchased_item_pay">
                        实付款：¥{format_price(item.buyPrice)}
                    </div>
                </div>
            )
        }) : <Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;

        return(
            <div className="per_purchased_spot_read_container">
                {spotBooksList}
            </div>
        )
    }
}

class Course extends  Component {
    viewCourse(item) {
        window.location = action.viewCourse + '_appbiz=lesson&srcchannel=mp&lessonId=' + item.id ;

    }
    render() {
        const {lessons, display, msg} = this.props,
            length = lessons ? lessons.length : 0;
        const courseList = !!length ?
            lessons.map((item, index) => {
                return (
                    <div className="per_purchased_item_wrap" key={index}
                         onClick={this.viewCourse.bind(this,item)}
                    >
                        <div className="per_purchased_item_status">购买成功</div>
                        <div className="per_purchased_item">
                            <img className="per_purchased_item_thumbnails per_purchased_course_item_thumbnails" src={item.thumbnails} alt=""/>
                            <div className="per_purchased_item_detail">
                                <div className="per_purchased_item_name">{item.name}</div>
                                <div className="per_purchased_item_price">¥{format_price(item.price)}</div>
                            </div>
                        </div>
                        <div className="per_purchased_item_pay">
                            实付款：¥{format_price(item.buyPrice)}
                        </div>
                    </div>
                )
            })
            : <div className="_null" style={{display: display === 'block' ? "none" : 'block'}}>
                <img src={require("../../img/img_course_empty.png")} alt=""/>
                <div className="_null_text">{msg}</div>
            </div>;
        return (
            <div className="per_course_container">
                {courseList}
            </div>
        )
    }
}

/**
 * 纸质书
 */
class PaperBook extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false,
            loading: false
        }
    }
    goPaperBook(item) {
        window.location = item.detailUrl;
    }

    viewLogistics(item){
        window.location = item.url;
    }
    confirm() {
        const {id, index} = this.state;
        console.log(id ,index);
        this.setState({loading: true});
        // return;
        const  url = action.confirm_receive + "?orderId=" + id,
            obj = {
                success: res => {
                    this.setState({loading: false});
                    console.log(res);
                    console.log("确认收货成功");
                    if(res.success && res.data)
                    {
                        this.props.pBooks[index].status = 3;
                        // this.props.reload();
                        this.onCancel();
                    }else  alert(res.msg || "操作失败请重试")
                }
            };
        ajax(url, obj);
    }
    showModal(id, index) {
        this.setState({
            visible: true,
            id: id,
            index: index
        });
    }
    onCancel() {
        this.setState({
            visible: false
        })
    }
    render(){
        const {pBooks, display, msg} = this.props,
            length = pBooks ? pBooks.length : 0,
            status = ["已付款","已发货","","交易成功"],
            { visible, loading }  = this.state;
        const teletextList = !!length ? pBooks.map((item, index) => {
                return (
                    <div className="per_purchased_item_wrap" key={index}>
                        <div className="per_purchased_item_status per_purchased_paperbook_item_status">{status[item.status]}</div>
                        <div className="per_purchased_item"  onClick={this.goPaperBook.bind(this, item)}>
                            <img className="per_purchased_item_thumbnails" src={item.thumbnails} alt=""/>
                            <div className="per_purchased_item_detail">
                                <div className="per_purchased_item_name">{item.name}</div>
                                <div className="per_purchased_item_publisher">{item.author+'/'+item.publisher}</div>
                                <div className="per_purchased_item_price">¥{format_price(item.price)}</div>
                            </div>
                        </div>
                        <div className="per_purchased_item_pay">
                            实付款：¥{format_price(item.buyPrice)}
                        </div>
                        <div className="per_purchased_item_logistics" style={{display: item.status === 0 ? "none":"flex"}}>
                            <div className="per_purchased_item_logistics_btn"
                                 style={{display: (item.status === 1 || item.status === 3)? "flex":"none"}}
                                 onClick={this.viewLogistics.bind(this,item)}>查看物流</div>
                            <div className="per_purchased_item_logistics_btn per_purchased_item_confirm_btn"
                                 style={{display: item.status === 1 ? "flex":"none"}}
                                 onClick={this.showModal.bind(this,item.id ,index)}>确认收货</div>
                        </div>
                        <div className="modal_wrap"  style={{display: visible ? 'flex' : 'none'}}>
                            <div className="modal_mask"></div>
                            <div className="modal_confirm_wrap">
                                <div className="modal_confirm_tips">
                                    请收到爱书后再确认收货呦~赠送内容将在确认收货后即时发放~
                                </div>
                                <div className="modal_btns">
                                    <div className="modal_btn " onClick={this.onCancel.bind(this)} >取消</div>
                                    <div className="modal_btn modal_confirm_btn_mask"  style={{display: loading ? "block" : "none"}}> 1</div>
                                    <div className="modal_btn modal_confirm_btn"onClick={this.confirm.bind(this)}>
                                        <span className="spin_dot" style={{display: loading ? "inline-block" : "none"}}>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                            <i></i>
                                        </span>
                                        <span>确认收货</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }) : <Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;

        return(
            <div className="per_purchased_teletext_container">
                {teletextList}
            </div>
        )
    }
}

class StudyPlans extends Component{
    viewStudyPlans(item) {
        window.location = action.viewStudyPlan  + item.id ;
    }
    render(){
        const {studyPlans, display, msg} = this.props,
            length = studyPlans ? studyPlans.length : 0;
        const studyPlansList = !!length ? studyPlans.map((item, index) => {
                return (
                    <div className="per_purchased_item_wrap" key={index}
                         onClick={this.viewStudyPlans.bind(this,item)}
                    >
                        <div className="per_purchased_item_status">购买成功</div>
                        <div className="per_purchased_item">
                            <img className="per_purchased_item_thumbnails per_purchased_item_studyplan_thumbnails" src={item.thumbnails} alt=""/>
                            <div className="per_purchased_item_detail">
                                <div className="per_purchased_item_name">{item.name}</div>
                                <div className="per_purchased_item_price">¥{format_price(item.price)}</div>
                            </div>
                        </div>
                        <div className="per_purchased_item_pay">
                            实付款：¥{format_price(item.buyPrice)}
                        </div>
                    </div>
                )
            })
            : <div className="_null" style={{display: display === 'block' ? "none" : 'block'}}>
                <img src={require("../../img/img_course_empty.png")} alt=""/>
                <div className="_null_text">{msg}</div>
            </div>;

        return(
            <div className="per_course_container">
                {studyPlansList}
            </div>
        )
    }
}
export default Purchased;