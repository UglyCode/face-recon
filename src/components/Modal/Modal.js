import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

const modalRoot = document.getElementById('modal_root');

class Modal extends React.Component{
    constructor(props){
        super();
        this.el = document.createElement('div');
    }


    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(this.props.children, this.el)
    }

}

export default Modal;