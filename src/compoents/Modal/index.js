import React from 'react';
import ReactDOM from 'react-dom';

// import styles from './style/index.css';

import './styles.less';

let windowInstance = null;
let modalInstance = null;
const duration = 300;

class _Modal extends React.PureComponent {
    constructor(props) {
        super(props);
        modalInstance = this;
        this.modalContainer = React.createRef();
        this.has_show = false;

        this._onClickMaskHandler = (e) => {
            if(e){
                e.stopPropagation();
            }
            // e && e.stopPropagation(); // 阻止事件传递
            if(this.props.maskClosable) {
                Modal.hide();
                this.props.onClose();
            }
        };
    }
    animatingOpen() {
        const {position} = this.props;
        if (!this.has_show) {
            this.has_show = true;
            const modalContainer = this.modalContainer.current;
            const modalContainerStyle = window.getComputedStyle(modalContainer);
            const modalContainerFromStyle = {transition: 'none'};
            const modalContainerToStyle = {transition: duration + 'ms ease-out'};
            if (position === 'top') {
                modalContainerFromStyle.top = '-' + parseFloat(modalContainerStyle.height) + 'px';
                modalContainerToStyle.top = '0px';
                modalContainerFromStyle.opacity = 0.5;
                modalContainerToStyle.opacity = 1;
            } else if (position === 'bottom') {
                modalContainerFromStyle.bottom = '-' + parseFloat(modalContainerStyle.height) + 'px';
                modalContainerToStyle.bottom = '0px';
                modalContainerFromStyle.opacity = 0.5;
                modalContainerToStyle.opacity = 1;
            }else if(position === 'special_center') {
                // RN里内嵌web 距离底部50% 会显示不全 所以特殊设置了一个
                modalContainerToStyle.bottom = '35%';
                modalContainerFromStyle.opacity = 0;
                modalContainerToStyle.opacity = 1;
                modalContainerFromStyle.transform = 'scale(0.9)';
                modalContainerToStyle.transform = 'scale(1)';
            }else if(position === 'xn_special_center') {
                // 存在虚拟按键的
                modalContainerToStyle.bottom = '30%';
                modalContainerFromStyle.opacity = 0;
                modalContainerToStyle.opacity = 1;
                modalContainerFromStyle.transform = 'scale(0.9)';
                modalContainerToStyle.transform = 'scale(1)';
            } else {
                modalContainerToStyle.bottom = '50%';
                modalContainerFromStyle.opacity = 0;
                modalContainerToStyle.opacity = 1;
                modalContainerFromStyle.transform = 'scale(0.9)';
                modalContainerToStyle.transform = 'scale(1)';
            }

            /* eslint guard-for-in:0*/
            for (const key in modalContainerFromStyle) {
                modalContainer.style[key] = modalContainerFromStyle[key];
            }
            setTimeout(() => {
                for (const key in modalContainerToStyle) {
                    modalContainer.style[key] = modalContainerToStyle[key];
                }
            }, 0);
        }
    }
    animatingClose() {
        const {position} = this.props;
        const modalContainer = this.modalContainer.current;
        const modalContainerStyle = window.getComputedStyle(modalContainer);
        const modalContainerFromStyle = {transition: 'none'};
        const modalContainerToStyle = {transition: duration + 'ms ease-out'};
        if (position === 'top') {
            modalContainerToStyle.top = '-' + parseFloat(modalContainerStyle.height) + 'px';
        } else if (position === 'bottom') {
            modalContainerToStyle.bottom = '-' + parseFloat(modalContainerStyle.height) + 'px';
        } else {
            modalContainerToStyle.opacity = 0;
        }

        for (const key in modalContainerFromStyle) {
            modalContainer.style[key] = modalContainerFromStyle[key];
        }
        setTimeout(() => {
            for (const key in modalContainerToStyle) {
                modalContainer.style[key] = modalContainerToStyle[key];
            }
        }, 0);
    }

    componentDidMount() {
        this.animatingOpen();
    }

    renderModal() {
        return (
            <div ref={this.modalContainer} className={'modal'}>
                {this.props.children}
            </div>
        );
    }
    render() {
        if(this.props.showMask) {
            return (
                <div className={'containers'}>
                    <div className={'mask'} style={{background: this.props.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.5)'}} onClick={this._onClickMaskHandler.bind(this)}/>
                    {this.renderModal()}
                </div>
            );
        }
        return this.renderModal();
    }
}

export const modalDefaultProps = {
    content: null, // 弹出内容
    transparent: false, // 遮罩是否透明
    showMask: true, // 是否显示遮罩
    maskClosable: true, // 点击遮罩是否能关闭
    position: 'bottom', // PropTypes.oneOf(["top", "center", "bottom"]), // 内容出现位置
    onClose: () => {}, // 关闭回调
    reBuild:true // 是否重汇
};
export default class Modal {
    static show(props = {}) {
        const _props = {
            ...modalDefaultProps,
            ...props,
        };
        delete _props.content;

        if(windowInstance) {
            ReactDOM.unmountComponentAtNode(windowInstance);
            if(windowInstance && windowInstance.parentNode) {
                windowInstance.parentNode.removeChild(windowInstance);
            }
            // windowInstance && windowInstance.parentNode &&
            windowInstance = null;
        }
        windowInstance = document.createElement('div');
        document.body.appendChild(windowInstance);

        ReactDOM.render(<_Modal {..._props}>{props.content}</_Modal>, windowInstance);
    }
    static hide() {
        // if(_props.reBuild) {
        if(windowInstance) {
            if(modalInstance) {
                modalInstance.animatingClose();
            }
            setTimeout(() => {
                ReactDOM.unmountComponentAtNode(windowInstance);
                if(windowInstance && windowInstance.parentNode) {
                    windowInstance.parentNode.removeChild(windowInstance);
                }
                // windowInstance && windowInstance.parentNode &&
                modalInstance = null;
                windowInstance = null;
            }, duration);
        }
        // }
    }
    static error(text, durations = 3) {
        Modal.show({
            showMask: false,
            position: 'bottom',
            content: (
                <div className={'error_modal'}>
                    <span>{text}</span>
                </div>
            ),
        });
        setTimeout(() => {
            Modal.hide();
        }, durations * 1000);
    }
    static info(text, durationss = 3) {
        Modal.show({
            showMask: false,
            position: 'center',
            content: (
                <div className={'info_modal'}>
                    <span>{text}</span>
                </div>
            ),
        });
        setTimeout(() => {
            Modal.hide();
        }, durationss * 1000);
    }
}
