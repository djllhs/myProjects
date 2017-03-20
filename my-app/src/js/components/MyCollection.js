/**
 * Created by 代佳玲 on 2017/2/17.
 */

import React, { Component } from 'react';
import {ajax, format_ms_to_string, format_size, isiOS} from '../common/common';
import action from  '../common/interface';
import Spinner from '../Utils/Spinner';
import Null from '../Utils/Null';

class MyCollection extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0,
            res:[],
            resCourse:[],
            favType:3,
            display:'block',
            appUrl: null,
            msg:'什么都木有' // 数据提示
        };
        this.openApp = this.openApp.bind(this);
        this.success = this.success.bind(this);
    }

    componentWillMount() {
        document.title = '我的收藏';
        const {favType } = this.state;
        const url = action.favorites,
            obj = {
                data: {favType: favType},
                success: res => {
                    this.success(res,'res');
                }
            };
        ajax(url, obj); // 默认请求视频资源


    }
    success(res, result) {
        if (res.success) {
            this.setState({
                [result]: !!res.data.resources ? res.data.resources : [],
                display: 'none',
                appUrl: res.data.iosDir !== undefined ? isiOS() ? res.data.iosDir : res.data.androidDir : null
            })
        } else {
            this.setState({
                [result]: [],
                display: 'none',
                msg: res.msg,
                appUrl: null
            });
        }
    }

    tab_click(currentIndex){
        this.setState({
            currentIndex: currentIndex,
            favType: currentIndex === 0 ? 3 : currentIndex === 1 ? 4 : 6,
            res:[],
            display:'block',
            appUrl: null
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

    openApp(){
        const {appUrl} = this.state;
        window.location = appUrl;
    }

    render(){
        const {resCourse} = this.state;
        return(
            <div className="per_myCollection">
                <div className="per_myC_title_wrap">
                    <div onClick={ this.tab_click.bind(this,0)}
                         className={ this.check_tittle_index(0) }
                    >视频</div>
                    <div onClick={this.tab_click.bind(this,1)}
                         className={ this.check_tittle_index(1) + " per_tab_title_spot"}>音频</div>
                    <div onClick={this.tab_click.bind(this,2)}
                         className={ this.check_tittle_index(2) }
                    >课程</div>

                </div>
                <div className="per_purchased_content_wrap">
                    <div name="video" className={ this.check_item_index(0) }>
                        <VideoResources {...this.state} openApp={this.openApp}/>
                    </div>
                    <div name="audio"  className={ this.check_item_index(1) }>
                        <AudioResources  {...this.state} openApp={this.openApp}/>
                    </div>
                    <div name="course"  className={ this.check_item_index(2) }>
                        <Course  {...this.state} openApp={this.openApp}/>
                    </div>
                </div>
            </div>
        )
    }
}

class VideoResources extends Component{

    playVideo(item){
        window.location = action.playVideo + 'rid=' + item.id + '&sign=' +
                          item.idSign + "&cid=" + item.pcrId;
    }

    render(){
        const {res, display, appUrl, msg } = this.props,
            length = res.length;
        const videoList = !!length ? res.map((item, index) => {
            return(
                <div className="item" onClick={this.playVideo.bind(this,item)} key={index}>
                    <div className="thumb">
                        <span>
                            <img alt='' className="thumb-img" src={item.thumbnails}/>
                        </span>
                    </div>
                    <div className="info">
                        <div className="info-top">{item.title}</div>
                        <div className="info-bottom">
                             <span className="duration">
                                 <span>
                                    <img alt='' src={require("../../img/min_icon_times.png")}/>
                                </span>
                                 {format_ms_to_string(item.times)}
                            </span>
                            <span className="size">
                                <span>
                                    <img alt='' src={require("../../img/min_icon_length.png")}/>
                                </span>
                                {format_size(item.length)}
                            </span>
                        </div>
                    </div>
                </div>
            )
        }) : <Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;

        return(
            <div>
                <div className="video-list">
                    <Spinner className="loading" style={{display:display}}/>
                    { videoList  }
                    <div className="per_myCollection_incomplete_data"
                         style={{display:!appUrl  ? "none" : 'block'}}
                    >
                        <div className="text" onClick={this.props.openApp}>打开App-查看全部内容</div>
                        <div className="null_div"></div>

                    </div>

                </div>
            </div>
        )
    }
}

class AudioResources extends Component{

    playAudio(item){
        window.location = action.playAudio + 'rid=' + item.id + '&sign=' +
                          item.idSign + "&bid=" + item.bookId;
    }

    render(){
        const {res, display, appUrl, msg} = this.props,
            length = res.length;
        const audioList = !!length ?
            res.map((item, index) => {
                return(
                        <div className="other-item" onClick={this.playAudio.bind(this, item)} key={index}>
                            <div className="other-item-margin">
                                <div className="other-thumb">
                                    <img alt='' className="other-img" src={require("../../img/ic_audio.png")}/>
                                </div>
                                <div className="other-info">
                                    <div className="info-top">{item.title}</div>
                                        <div className="info-bottom">
                                            <span className="duration">
                                                <span>
                                                    <img alt='' src={require("../../img/min_icon_times.png")}/>
                                                </span>
                                                {format_ms_to_string(item.times)}
                                            </span>
                                            <span className="size">
                                                <span>
                                                    <img alt='' src={require("../../img/min_icon_length.png")}/>
                                                </span>
                                                {format_size(item.length)}
                                            </span>
                                        </div>
                                </div>
                            </div>
                        </div>
                    )

            }):<Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;


        return(
            <div className="audio-list">
                <Spinner className="loading" style={{display:display}}/>
                {audioList}
                <div className="per_myCollection_incomplete_data"
                     style={{display:!appUrl  ? "none" : 'block'}}
                >
                    <div className="text" onClick={this.props.openApp}>打开App-查看全部内容</div>
                    <div className="null_div"></div>

                </div>
            </div>
        )
    }
}
class Course extends  Component {
    viewCourse(item) {
        window.location = action.viewCourse + 'lessonId=' + item.id ;
    }
    render() {
        const {res, display, appUrl, msg} = this.props,
            length = res.length;
        const courseList = !!length ?
            res.map((item, index) => {
                return (
                    <div className="per_course_item_wrap" onClick={this.viewCourse.bind(this,item)} key={index}>
                        <div className="per_course_item">
                            <img alt='' src={item.thumbnails}/>
                        </div>
                        <div className="per_course_item_name">
                            {item.name}
                        </div>
                    </div>
                )
            })
            : <Null style={{display: display === 'block' ? "none" : 'block'}} text={msg}/>;
        return (
            <div className="per_course_container">
                <Spinner className="loading" style={{display: display}}/>
                {courseList}
                <div className="per_myCollection_incomplete_data"
                     style={{display: !appUrl ? "none" : 'block'}}
                >
                    <div className="text" onClick={this.props.openApp}>打开App-查看全部内容</div>
                    <div className="null_div"></div>

                </div>
            </div>
        )
    }
}

export default MyCollection;