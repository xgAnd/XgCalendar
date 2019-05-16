/**
 *  Class: index
 *  Author: zhangpeng
 *  Date: 2019/4/17.
 *  Description: 都使用箭头函数 funNmae = () =>{}
 *  component: 调用组件 先定义 ref = {name => this.name = name} 使用this.name获取组件发方法和变量
 *  子组件   : 参考demo
 */
import React, {Component} from 'react';
import './styles.less';
// 变量定义

// import {Modal} from 'antd-mobile';


import {getShowCalendarInfo, getBeforeShowData, getAfterShowData, getNeedTime} from '../utils/Utils';

import Test from './WebCalendar';
import Modal from "../compoents/Modal";

const down = window.Commons.getImg('down');

// import CalendarMoudle from './CalendarMoudle/CalendarMoudle';

// import {}

// mobx.configure({enforceActions: true});

// console.log('global.Commons',Commons)

class CalendarCompoent extends Component {


        constructor(props) {
            super(props);
            // 初始化
            this.state = {
                data: [],
                show: false,
                modal:false,
                showDate:'', // 大日历的显示日期
            };
            this.preGroupClickIndex = -1; // 上一次的组jiaobiao
            this.preClickIndex = -1; // 上一次组之中的index角标
            this.beginTouchScreenX = 0;
            this.scrollDirection = -1;
            this.moveIndex = 0; // 移动了几页
            this.index = 0;
            this.leftIndex = 0;
            this.rightIndex = 0;
            this.moveleft = 0;
            this.moveright = 0;
            this.date = new Date();
            this.day = this.date.getDay();
            this.clickDayStr = '';
            this.moveStatus = -1; // 0 是滑动 1是点击
            // 返回给父组件的数据
            this.callbackValue = () => {
                // TODO code
            };

            this.onTouchStartHandler = (evt) => {
                this.beginTouchScreenX = evt.touches[0].screenX;
            };

            this.onTouchMoveHandler = (evt) => {
                if(Math.abs(this.beginTouchScreenX - evt.touches[0].screenX) < 30) {
                    return;
                }
                if (this.beginTouchScreenX - evt.touches[0].screenX < 0) {
                    this.scrollDirection = 0; // 右滑是负的
                } else {
                    this.scrollDirection = 1; // 左滑是正的
                }
            };

            this.onTouchEnd = () => {
                if(this.scrollDirection < 0) {
                    return;
                }
                const innerWidth = window.innerWidth;
                if(this.scrollDirection) {
                    // <-------------- 向左滑动


                    // if(this.moveIndex === 0) {
                    //     // 此时没有发生过滑动显示的是默认的第二项的值
                    // }else {
                    //     // 已经发生了滑动
                    // }
                    const data = this.state.data;


                    // data[preGroupClickIndex].num[preClickIndex].str;

                    if(this.state.data.length - this.index - 1 === 1) {
                        // 通过数组的长度减去 index 来做操作
                        const numberindex = this.state.data.length - 1;
                        const datessstr = this.state.data[numberindex].num[6].str;
                        const useDate = new Date(datessstr);
                        const day = useDate.getDay();

                        // this.moveleft += 1;

                        data.push(getAfterShowData(useDate, [], day));
                    }


                    this.setState({data: [...data]}, () => {
                        // this.rootBar.scrollLeft = -innerWidth;
                        this.index += 1;
                        this.rootBar.scrollLeft = innerWidth * (this.index);
                    });
                }else {
                    const data = this.state.data;
                    // <----------- 向右滑动
                    if(this.index === 1) {
                        // 前面只有一天数据 此时需要增加数据了
                        this.moveright -= 1;

                        const dateStr = this.state.data[0].num[0].str;

                        const ddd = new Date(dateStr);
                        const day2 = ddd.getDay();

                        data.unshift(getBeforeShowData(ddd, [], day2));
                        if(this.preGroupClickIndex !== -1) {
                            this.preGroupClickIndex += 1;
                        }

                        this.setState({data: [...data]}, () => {
                            this.index = 1;
                            this.rootBar.scrollLeft = innerWidth * (this.index);
                        });
                    }else {
                        this.index -= 1;
                        this.setState({data: [...data]}, () => {
                            this.rootBar.scrollLeft = innerWidth * (this.index);
                        });
                    }
                }
                this.moveStatus = 0;
                this.scrollDirection = -1;
            };

            // othe
        }


        changeCurrView(day) {
            // 修改在本屏幕上的数据
            const data = this.state.data;
            if(day === 0) {
                // 周日
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 6);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 6);
                }
            }else if(day === 1) {
                // 周一
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 0);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 0);
                }
            }else if(day === 2) {
                // 周二
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 1);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 1);
                }
            } else if(day === 3) {
                // 周三
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 2);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 2);
                }
            } else if(day === 4) {
                // 周四
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 3);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 3);
                }
            } else if(day === 5) {
                // 周五
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 4);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 4);
                }
            } else if(day === 6) {
                // 周六
                if(data.length === 3) {
                    // 滚动的日历没有发生过滑动直接修改index1 即可
                    this.innerCompoentClickThings(1, 5);
                }else {
                    // 发生过移动
                    this.innerCompoentClickThings(this.index, 5);
                }
            }
        }


        // moveleft 向后面添加过几组数据
        changeOtherScrollData(dir, num, indexSele) {
            if(dir === 1) {
                console.log('<-------------------  num  this.state.data.length  this.index', num, this.state.data.length, this.index);
            }else {
                console.log('-------------------> num  this.moveleft  this.index', num, this.state.data.length, this.index);
            }
            const data = this.state.data;
            const yuanLength = data.length;// 原来的长度 如果向后加了元素那么index 就是元长度加上加上的长度减去1
            const innerWidth = window.innerWidth;
            if(dir) {
                // const ss = this.moveleft;
                const length = this.state.data.length;
                // let uselength = this.state.data.length-1;
                const endStrs = this.state.data[length - 1].num[6].str;
                const dddd = new Date(endStrs);
                const dayssss = dddd.getDay();
                this.index = yuanLength + num - 1;
                for (let i = 0; i <= num; i++) {
                    data.push(getAfterShowData(dddd, [], dayssss, i * 7));
                }
                this.setState({
                    data:[...data]
                }, () => {
                    // this.index += (num + 1);
                    console.log('this.index fdfdf', this.index);
                    this.rootBar.scrollLeft = innerWidth * (this.index);
                    this.innerCompoentClickThings(this.index, indexSele);
                });
            }else {
                // 向右滑 ------------------->
                const dateStr = this.state.data[0].num[0].str;
                const dddd = new Date(dateStr);
                const dayssss = dddd.getDay();
                for (let i = 0; i <= num; i++) {
                    data.unshift(getBeforeShowData(dddd, [], dayssss, i * 7));
                }
                if(this.preGroupClickIndex !== -1) {
                    this.preGroupClickIndex += (num + 1);
                }
                this.setState({data: [...data]}, () => {
                    this.index = 1;
                    this.rootBar.scrollLeft = innerWidth * (this.index);
                    this.innerCompoentClickThings(this.index, indexSele);
                });
            }
        }


        changeOtherView(day, num, dir) {
            // 修改不在本屏幕上的数据   dir  1向左  0向右
            if(day === 0) {
                this.changeOtherScrollData(dir, num, 6);
            }else if(day === 1) {
                this.changeOtherScrollData(dir, num, 0);
            }else if(day === 2) {
                this.changeOtherScrollData(dir, num, 1);
            }else if(day === 3) {
                this.changeOtherScrollData(dir, num, 2);
            }else if(day === 4) {
                this.changeOtherScrollData(dir, num, 3);
            }else if(day === 5) {
                this.changeOtherScrollData(dir, num, 4);
            }else if(day === 6) {
                this.changeOtherScrollData(dir, num, 5);
            }
        }


        judgeDayChangeCal(isCurr, day, num, dir) {
            // isCurr 是否是在当前的屏幕  day  周几  num  数值  dir 需要滚动的方向   向左滑是  1 <-   向右滑是 0 ->
            if(isCurr) {
                this.changeCurrView(day);
            }else {
                this.changeOtherView(day, num, dir);
            }
        }


        judgeInnerisCurr(calDate) {
            // 判断在数据之中时是否在咋当前的页面  calDate 大日历选中的日期
            const data = this.state.data;
            const innerWidth = window.innerWidth;
            const smallstr = this.state.data[this.index].num[0].str;
            const smDate = new Date(smallstr);
            const dastr = this.state.data[this.index].num[6].str;
            const bigDate = new Date(dastr);
            if(calDate.getTime() >= smDate.getTime() && calDate.getTime() <= bigDate.getTime()) {
                // 此时在当前的页面
                this.changeCurrView(calDate.getDay());
            }else {
                // 在数组中但是不在当前页面中
                for(let i = 0; i < data.length; i++) {
                    const dastrs = data[i].num[6].str;
                    const daDate = new Date(dastrs);
                    const xiaostr = data[i].num[0].str;
                    const xiaoDate = new Date(xiaostr);
                    if(calDate.getTime() >= xiaoDate.getTime() && calDate.getTime() <= daDate.getTime()) {
                        // 此时在这里屏幕上面
                        const number = Math.abs(this.index - i);// 此时index需要偏离的位置

                        if(i === 0) {
                            // 此时选择的第一条 需要前面加载一条
                            this.changeOtherView(calDate.getDay(), 0, 0);
                        }else if(i === data.length - 1) {
                            // 此时是最后一条 需要加载
                            this.changeOtherView(calDate.getDay(), 0, 1);
                        }else {
                            if(this.index > i) {
                                // 此时要减去number
                                this.index -= number;
                            }else {
                                // 此时要加上number
                                this.index += number;
                            }
                            if (calDate.getDay() === 0) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 6);
                            } else if (calDate.getDay() === 1) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 0);
                            } else if (calDate.getDay() === 2) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 1);
                            } else if (calDate.getDay() === 3) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 2);
                            } else if (calDate.getDay() === 4) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 3);
                            } else if (calDate.getDay() === 5) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 4);
                            } else if (calDate.getDay() === 6) {
                                this.rootBar.scrollLeft = innerWidth * (this.index);
                                this.innerCompoentClickThings(this.index, 5);
                            }
                        }
                    }
                }
            }
        }


        // 取得时间不对 不一定是当前的可能已经移动过了

        onConfirmData(dateStr) {
            // 这里计算倍数的时候出现了问题  怎么计算当前的倍数
            if(dateStr) {
                const date = new Date(dateStr); // 大日历选择的时间
                if (date) {
                    console.log(date.getTime());
                    const clickDateTimeStemp = getNeedTime(date); // 大日历的点击的日期 10位的时间戳
                    let d;
                    const datssss = this.state.data;


                    const smallDateStr = datssss[0].num[0].str;// 数据中最小的数据

                    const smallDate = new Date(smallDateStr);
                    smallDate.setHours(0);
                    smallDate.setMinutes(0);
                    smallDate.setSeconds(0);
                    smallDate.setMilliseconds(0);

                    const bigDateStr = datssss[datssss.length - 1].num[6].str;// 数据中最大的数据

                    const bigDate = new Date(bigDateStr);
                    bigDate.setHours(0);
                    bigDate.setMinutes(0);
                    bigDate.setSeconds(0);
                    bigDate.setMilliseconds(0);

                    if (date.getTime() >= bigDate.getTime()) {
                        // 大日历的日期大于滚轮中最大的数据
                        d = bigDate;
                        const needTime = getNeedTime(d);
                        this.getScroolNumber(date, clickDateTimeStemp, needTime, 1);
                    } else if (date.getTime() <= smallDate.getTime()) {
                        // 大日历的日期小于滚轮中最小的数据
                        d = smallDate;
                        const needTime = getNeedTime(d);
                        this.getScroolNumber(date, clickDateTimeStemp, needTime, 0);
                    } else {
                        // 在数据之中

                        this.judgeInnerisCurr(date);
                    }
                }
            }
            this.hideWebModal();
        }


        // 获得移动额外的数据
        getScroolNumber(date, clickDateTimeStemp, gunDataTimeStemp, dir) {
            // gunDataTimeStemp 从那天的日期计算开始的时间戳
            if(clickDateTimeStemp > gunDataTimeStemp) {
                const day = date.getDay();
                // 选择的是未来的时间 因为是
                const number = parseInt((clickDateTimeStemp - gunDataTimeStemp) / (7 * 24 * 60 * 60), 10);
                this.judgeDayChangeCal(false, day, number, 1);
            }else if(clickDateTimeStemp < gunDataTimeStemp) {
                // 选择的是以前的时间
                const day = date.getDay();
                const number = parseInt((gunDataTimeStemp - clickDateTimeStemp) / (7 * 24 * 60 * 60), 10);
                this.judgeDayChangeCal(false, day, number, 0);
            } else {
                // 选择的日期是当前的最后一周 需要添加一条
                const day = date.getDay();
                this.judgeDayChangeCal(false, day, 0, dir);// 当天 isCurr 为true 时 后两个参数无效
            }
        }


        showWebCal() {
            console.log('this.state.showDate', this.state.showDate);
            Modal.show({
                position:'top',
                content: (
                    <div className={'ver_modal'}>
                        <Test onSele={this.onConfirmData.bind(this)} key={1} showDate={this.state.showDate}/>
                    </div>

                )
            });
        }

        hideWebModal() {
            Modal.hide();
        }


        getDateString(date) {
            const nowYear = date.getFullYear(); // 获取年份
            const nowMonth = date.getMonth() + 1; // 获取月份
            let day = date.getDate();
            day = day < 10 ? '0' + day : day;
            return `${nowYear}/${nowMonth}/${day}`;
        }

        // endregion
        // region 生命周期
        componentWillMount() {

        }

        initData() {
            const innerWidth = window.innerWidth;
            const showCalendarInfo = getShowCalendarInfo();// 返回的是包含上一周和下一周的数据
            const dateString = this.getDateString(new Date());
            const showListData = showCalendarInfo[1];
            const numlist = showListData.num;
            if(numlist && numlist.length > 0) {
                const tempuselist = numlist.map((item) => {
                    if(item.str === dateString) {
                        item.isdefault = 1; // 是默认的
                    }
                    return item;
                });
                const infos = {num:tempuselist};
                const spliceList = showCalendarInfo.splice(1, 1, infos);
                console.log('spliceList', spliceList, 'showCalendarInfo', showCalendarInfo);
                this.setState({
                    data:showCalendarInfo
                }, () => {
                    this.rootBar.scrollLeft = innerWidth;
                    this.index = 1; // 切换到后一屏角标+1
                });
            }
        }

        componentDidMount() {
            // this.rootBar.
            this.initData();
        }

        componentWillUnmount() {
            this.preGroupClickIndex = -1; // 上一次的组jiaobiao
            this.preClickIndex = -1;
            this.moveIndex = 0; // 移动了几页
            this.index = 0;
            this.moveleft = 0;
            this.moveright = 0;
        }


        innerCompoentClickThings(groupIndex, index) {
            if(this.preGroupClickIndex === -1) {
                // 此时没有上一次点击直接赋值
                this.preGroupClickIndex = groupIndex;// 组的index
                this.preClickIndex = index;// 点击的角标
                const datas = this.state.data;
                datas[groupIndex].num[index].status = 1;
                // this.clickDayStr = datas[groupIndex].num[index].str;
                const onSeleData = this.props.onSeleData;
                if(onSeleData && typeof onSeleData === 'function') {
                    onSeleData(datas[groupIndex].num[index].str);
                }
                this.setState({
                    data:[...datas],
                    showDate:datas[groupIndex].num[index].str
                });
            }else {
                if(groupIndex === this.preGroupClickIndex && index === this.preClickIndex) {
                    // 点击同一组的同一个
                    return;
                }
                if(groupIndex === this.preGroupClickIndex) {
                    console.log('groupIndex', groupIndex, 'this.preGroupClickIndex', this.preGroupClickIndex);
                    console.log('yigezu');
                    const preClickIndex = this.preClickIndex;
                    const data = this.state.data;
                    data[groupIndex].num[index].status = 1;
                    data[groupIndex].num[preClickIndex].status = 0;
                    const onSeleData = this.props.onSeleData;
                    if(onSeleData && typeof onSeleData === 'function') {
                        onSeleData(data[groupIndex].num[index].str);
                    }
                    this.setState({
                        data:[...data],
                        showDate:data[groupIndex].num[index].str
                    });

                    this.preClickIndex = index;
                    this.clickDayStr = data[groupIndex].num[index].str;
                }else {
                    console.log('buyigezu');
                    console.log('groupIndex', groupIndex, 'this.preGroupClickIndex', this.preGroupClickIndex);
                    // 需要这两个组中的数据去修改
                    const preGroupClickIndex = this.preGroupClickIndex;
                    const preClickIndex = this.preClickIndex;
                    const data = this.state.data;
                    data[groupIndex].num[index].status = 1;
                    data[preGroupClickIndex].num[preClickIndex].status = 0;
                    const onSeleData = this.props.onSeleData;
                    if(onSeleData && typeof onSeleData === 'function') {
                        onSeleData(data[groupIndex].num[index].str);
                    }
                    this.setState({
                        data:[...data],
                        showDate: data[groupIndex].num[index].str
                    });
                    this.preGroupClickIndex = groupIndex;
                    this.preClickIndex = index;
                    this.clickDayStr = data[groupIndex].num[index].str;
                }
            }
        }


        render() {
            console.log('renderrenderrender', this.state.data);
            return (
                <div className={'childrenBar'}>
                    <div className={'ver_box'} style={{paddingLeft:10, paddingRight:10}}>
                        <div className={'zhou_style'} onClick={() => {
                            this.showWebCal();
                        }}>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周一'}</span>
                            </div>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周二'}</span>
                            </div>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周三'}</span>
                            </div>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周四'}</span>
                            </div>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周五'}</span>
                            </div>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周六'}</span>
                            </div>
                            <div className={'zhou_style_zi'}>
                                <span className={'zhou_span'}>{'周日'}</span>
                            </div>

                        </div>
                        <div className={'right'}>
                            <img src={down} className={'down_pic'}/>
                        </div>
                    </div>

                    <div className={'rootBar'}
                        ref={(com) => (this.rootBar = com)}
                        id={'DataDiv'}
                        onTouchStart={this.onTouchStartHandler.bind(this)}
                        onTouchMove={this.onTouchMoveHandler.bind(this)}
                        onTouchEnd={this.onTouchEnd.bind(this)}

                    >
                        <CalendarErgodic info={this.state.data} innerCompoentClickThings={this.innerCompoentClickThings.bind(this)}/>


                    </div>

                </div>
            );
        }
}


class CalendarItem extends Component {
    constructor(props) {
        super(props);
        this._onScrollEvent = () => {
            console.log('_onScrollEvent');
        };
    }


    componentDidMount() {
        // window.addEventListener('scroll', this.scroll);
    }


    clickThings(index) {
        // this.props.index 是第几组的
        // index 是那组的第几个
        const click = this.props.click;
        if(click && typeof click === 'function') {
            click(this.props.index, index);
        }
    }

    render() {
        return(
            <div className={'cal_item'} style={{paddingLeft:10, paddingRight:23}}>
                {this.props.list && this.props.list.length > 0 ?
                    this.props.list.map((item, index) => (

                        <div className={'cal_item_item'} onClick={this.clickThings.bind(this, index)} key={index}>
                            <div className={'center_c'} style={{backgroundColor:item.status ? 'white' : null}}>
                                <span style={{textAlign:'center', color:item.status ? '#15BBDB' : item.isdefault ? 'green' : 'white'}} >{item.name}</span>
                            </div>
                        </div>
                    )) : null
                }


            </div>
        );
    }
}


class CalendarErgodic extends Component {
    componentDidMount() {

    }


    render() {
        const info = this.props.info;
        return(
            <div className={'item_less'}>
                {info && info.length > 0 ? info.map((item, index) => (
                    <CalendarItem list={item.num} index={index} click={this.props.innerCompoentClickThings} key={index}/>
                )) : null}
            </div>
        );
    }
}

export {CalendarItem, CalendarErgodic, CalendarCompoent};


