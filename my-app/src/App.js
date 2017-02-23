import React, { Component } from 'react';
import './scss/App.css';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

class App extends Component {

    componentWillMount() {
        document.body.style.margin = "0px";
        // 这是防止页面被拖拽
        //document.body.addEventListener('touchmove', (ev) => {
        //    ev.preventDefault();
        //});
    }

    render() {
        return (
            <ReactCSSTransitionGroup
                transitionName="transitionWrapper"
                component="div"
                className='transitionWrapper'
                transitionEnterTimeout={300}
                transitionLeaveTimeout={300}>
                <div key={this.props.location.pathname}
                     style={{position:"absolute", width: "100%"}}>
                    {
                        this.props.children
                    }
                </div>
            </ReactCSSTransitionGroup>
        );
    }
}

export default App;
