/**
 * Created by 代佳玲 on 2017/2/17.
 */

import React, { Component } from 'react';
import {ajax, wxSetTitle} from '../common/common';
import action from  '../common/interface';
import Spinner from '../Utils/Spinner';
import Null from '../Utils/Null';

//import $ from 'jquery';

class BookShelf extends Component {

    constructor(props) {
        super(props);
        this.state = {
            res: [],
            display: 'block',
            msg:'什么都木有'
        }
    }

    componentWillMount() {
        wxSetTitle('书架')
    }
    componentDidMount() {
        // document.title = '书架';
        const url = action.bookShelf,
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

    bookInfo(item) {
        window.location = action.bookInfo + 'id=' + item.id + '&sign=' + item.idSign;
    }

    render() {
        const {res, display, msg } = this.state,
            length = res.length;
        const bookList = !!length ? res.map((item, index) => {
            return (
                <div className="per_boS_book_item_wrap" onClick={this.bookInfo.bind(this,item)} key={index}>
                    <div className="per_boS_book_item">
                        <img src={item.thumbnails} alt=""/>
                    </div>
                    <div className="per_boS_book_item_name">
                        {item.name}
                    </div>
                </div>
            )
        }) :<Null style={{display:display === 'block' ? "none" : 'block'}} text={msg}/>;

        return (
            <div className="per_bookShelf">

                <Spinner className="loading" style={{display:display}}/>
                {
                    bookList
                }
            </div>
        )
    }
}

export default BookShelf;