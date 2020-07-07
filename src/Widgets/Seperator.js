import React from 'react';
import './Seperator.css';

class Seperator extends React.Component{
    render(){
        const style = {
            'backgroundColor': this.props.color
        }

        return(
            <div className="Seperator Component" style={style}></div>
        );
    }
}

export default Seperator;