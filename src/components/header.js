import React, { Component } from 'react';


class Header extends Component {
    render() {
        return(
            <div className="header">
                <img src={"../style/images/todoLogo.png"} height={"45px"}></img>
                <span>TODO</span>
            </div>
        );
    }
}

export default Header;
