/**
 * Created by admin on 2017/3/30.
 */
import React, {Component} from 'react';
import Null from '../Utils/Null';
import Spinner from '../Utils/Spinner';
import action from '../common/interface';
import {ajax, wxSetTitle} from '../common/common';

export default  class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res: [],
            display: 'block',
            msg: '什么都木有' // 数据提示
        }
    }

    componentWillMount() {
        // document.title = '我的课程';
        wxSetTitle('我的课程');
        const url = action.course,
            obj = {
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
    viewCourse(item) {
        window.location = action.viewCourse + '_appbiz=lesson&srcchannel=mp&lessonId=' + item.id ;
    }

    componentWillUnMount() {
        console.log(123);
        this.setState({
            res: [],
            msg: '什么都木有' // 数据提示
        })
    }
    render() {
        const {res, msg, display} = this.state,
            length = res.length,
            courseList = !!length ? res.map((item, index) => {
                    return (
                        <div className="course_item"   onClick={this.viewCourse.bind(this,item)}  key={index}>
                            <div  className="course_item_book">
                                <img src={item.thumbnails} alt=""/>
                            </div>


                            <div className="course_item_info">
                                {item.name}
                            </div>
                        </div>
                    )
                }) : <Null style={{display: display === 'block' ? "none" : 'block'}} text={msg}/>
        return (
            <div className="course">
                <Spinner className="loading" style={{display: display}}/>
                {courseList}
            </div>
        )
    }
}