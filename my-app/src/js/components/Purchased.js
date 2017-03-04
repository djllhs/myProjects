/**
 * Created by 代佳玲 on 2017/2/17.
 */
import React, { Component } from 'react';
import {ajax} from '../common/common';
import action from  '../common/interface';
import Spinner from '../Utils/Spinner';
import Null from '../Utils/Null';

class Purchased extends Component {

    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0,
            res:[],
            display:'block',
            msg:'什么都木有'
        };
    }

    componentWillMount() {
        document.title = '已购买的';
        const url = action.bought,
            obj = {
                success: res => {
                    if (res.success) {
                        this.setState({
                            res: res.data,
                            display: 'none'
                        })
                    }else {
                        this.setState({
                            res: [],
                            display: 'none',
                            msg: res.msg
                        });
                    }
                }
            };
        ajax(url, obj);
    }

    tab_click(currentIndex){
        this.setState({
            currentIndex: currentIndex,
            favType: !!currentIndex ? 4 : 3
        },() => {
            this.componentWillMount();
        });
    }

    check_tittle_index(index){
        return index === this.state.currentIndex ? "per_tab_title per_tab_title_active" : "per_tab_title";
    }

    check_item_index(index){
        return index === this.state.currentIndex ? "Tab_item show" : "Tab_item";
    }
    render(){
        const {display, msg} = this.state;
        return(
            <div className="per_purchased">
                <div className="per_purchased_title_wrap">
                    <div onClick={this.tab_click.bind(this,0)}
                         className={ this.check_tittle_index(0) }
                    >图书资源</div>
                    <div onClick={this.tab_click.bind(this,1)}
                         className={ this.check_tittle_index(1) + " per_tab_title_spot"}>点读书</div>
                    <div onClick={this.tab_click.bind(this,2)}
                         className={ this.check_tittle_index(2) }>课程</div>
                </div>
                <div className="per_purchased_content_wrap">
                    <Spinner className="loading" style={{display:display}}/>
                    <div name="teletext" className={ this.check_item_index(0) }>
                        <TeletextResources display={display}
                                           res={this.state.res.filter((item) => {return !item.clickRead })}
                                           msg={msg}
                        />
                    </div>
                    <div name="spotBooks"  className={ this.check_item_index(1) }>
                        <SpotBooksResources display={display}
                                            res={this.state.res.filter((item) => {return item.clickRead })}
                                            msg={msg}
                        />
                    </div>
                    <div name="course" className={ this.check_item_index(2)}>
                        <Course />
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
        const {res, display, msg} = this.props,
            length = res.length;
        const teletextList = !!length ? res.map((item, index) => {
            return (
                <div className="per_purchased_teletext_item_wrap" key={index}
                     onClick={this.bookInfo.bind(this,item)}
                >
                    <div className="per_purchased_teletext_item">
                        <img src={item.thumbnails} alt=""/>
                    </div>
                    <div className="per_purchased_book_item_name">{item.name}</div>
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

        const {res, display, msg} = this.props,
            length = res.length;
        const spotBooksList = !!length ? res.map((item, index) => {

            return (
                <div className="per_purchased_spot_read_container" key={index}
                     onClick={this.bookInfo.bind(this,item)}
                >
                    <div className="per_purchased_spot_read_item_wrap">
                        <div className="per_purchased_spot_read_item">
                            <img src={item.thumbnails} alt=""/>
                        </div>
                        <div className="per_purchased_book_item_name">{item.name}</div>
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
    render() {
        return(
            <div className="per_purchased_course_container">
                <div className="per_purchased_course_item_wrap">
                    <div className="per_purchased_course_item"></div>
                    <div className="per_purchased_course_item_name">
                        将哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                    </div>
                </div>
                <div className="per_purchased_course_item_wrap">
                    <div className="per_purchased_course_item"></div>
                    <div className="per_purchased_course_item_name">
                        将哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                    </div>
                </div>
                <div className="per_purchased_course_item_wrap">
                    <div className="per_purchased_course_item"></div>
                    <div className="per_purchased_course_item_name">
                        将哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                    </div>
                </div>
                <div className="per_purchased_course_item_wrap">
                    <div className="per_purchased_course_item"></div>
                    <div className="per_purchased_course_item_name">
                        将哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                    </div>
                </div>
                <div className="per_purchased_course_item_wrap">
                    <div className="per_purchased_course_item"></div>
                    <div className="per_purchased_course_item_name">
                        将哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
                        机读卡三等奖阿克苏的骄傲三菱电机阿萨德克拉手机掉了
                    </div>
                </div>
            </div>
        )
    }
}

export default Purchased;