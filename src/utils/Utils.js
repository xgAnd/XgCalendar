/* eslint-disable valid-jsdoc */
'use strict';

import CalendarMoudle from "../CalendarCompoent/CalendarMoudle/CalendarMoudle";

const toString = Object.prototype.toString;



/**
 * 获取时间戳
 // eslint-disable-next-line valid-jsdoc
 * @param date 包含Date string 时间戳
 * @returns {返回时间戳}
 */
export function getTimeStamp(date) {
    let dates = date || new Date();
    let times = null;
    if(!(dates instanceof Date)) {
        if(dates.constructor === String) {
            if(dates.indexOf('T') === -1) {
                // 没有时候需要替换一下子
                dates = new Date(dates.replace(/-/g, '/'));
            }else {
                dates = new Date(dates);
            }
            times = dates.getTime();
        } else if(dates.constructor === Number) {
            times = dates * 1000;
        }
    }else{
        times = dates.getTime();
    }
    return times;
}

/**
 * 获取过去时间
 * @param date 时间点
 * @param day 天数
 * @returns {Date}
 */
export function getSubtractDay(date = new Date(), day = 0) {
    const newDate = new Date(getTimeStamp(date) - day * 24 * 3600 * 1000);
    return newDate;
}

/**
 * 获取未来几天
 * @param date 时间点
 * @param day 天数
 * @returns {Date}
 */
export function getAddDay(date = new Date(), day = 0) {
    return new Date(getTimeStamp(date) + day * 24 * 3600 * 1000);
}


// let s={name:date.getDate(),status:0}
export function getBeforeShowData(date, list = [], day, index = 0) {
    // 获取上一周的展示的数据
    if(index < 0) {
        index = Math.abs(index);
    }
    const mylist = [];
    if(day === 0) {
        // 周日 向前获取7到13天的数据

        for (let i = 7; i <= 13; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.unshift(m);
        }
    }else if(day === 1) {
        // 周一向前获取1到7天的数据
        for (let i = 1; i <= 7; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.str = dateString;
            m.status = 0;
            mylist.unshift(m);
        }
    }else if(day === 2) {
        // 周二向前获取2到8天的数据
        for (let i = 2; i <= 8; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.unshift(m);
        }
    }else if(day === 3) {
        // 周三向前获取3到9天的数据
        for (let i = 3; i <= 9; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.unshift(m);
        }
    }else if(day === 4) {
        // 周四向前获取4到10天的数据
        for (let i = 4; i <= 10; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.unshift(m);
        }
    }else if(day === 5) {
        // 周五向前获取5到11天的数据
        for (let i = 5; i <= 11; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.unshift(m);
        }
    }else if(day === 6) {
        // 周五向前获取6到12天的数据
        for (let i = 6; i <= 12; i++) {
            const subtractDay = getSubtractDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.unshift(m);
        }
    }

    const moudle = {num:mylist};
    list.push(moudle);

    return moudle;
}


export function getAfterShowData(date, list, day, index = 0) {
    // 获取下一周展示的数据

    const mylist = [];
    if(day === 0) {
        // 周日向后获取7天
        for (let i = 1; i <= 7; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }else if(day === 1) {
        // 周一向后获取7天13天的数据
        for (let i = 7; i <= 13; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }else if(day === 2) {
        // 周二向后获取6天12天的数据
        for (let i = 6; i <= 12; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }else if(day === 3) {
        // 周三向后获取5天11天的数据
        for (let i = 5; i <= 11; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }else if(day === 4) {
        // 周四向后获取4天10天的数据
        for (let i = 4; i <= 10; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }else if(day === 5) {
        // 周五向后获取3天9天的数据
        for (let i = 3; i <= 9; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }else if(day === 6) {
        // 周六向后获取2天8天的数据
        for (let i = 2; i <= 8; i++) {
            const subtractDay = getAddDay(date, i + index);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            mylist.push(m);
        }
    }
    const moudle = {num:mylist};
    list.push(moudle);
    return moudle;
}


function getDateString(date) {
    const nowYear = date.getFullYear(); // 获取年份
    const nowMonth = date.getMonth() + 1; // 获取月份
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    return `${nowYear}/${nowMonth}/${day}`;
}

export function getShowCalendarInfo(date = new Date()) {
    //     获取日历本周的展示数据
    const list = [];
    const useist = [];
    const day = date.getDay(); //
    console.log('date.getDay()', date.getDate());
    getBeforeShowData(date, useist, day);
    if(day === 0) {
        // 周日 向前获取6天
        for (let i = 1; i <= 6; i++) {
            const subtractDay = getSubtractDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            list.unshift(m);
        }
        const s = new CalendarMoudle();
        s.name = date.getDate();
        s.status = 0;
        s.str = getDateString(date);
        list.push(s);
    }else if(day === 1) {
        // 向后获取6天
        const s = new CalendarMoudle();
        s.name = date.getDate();
        s.status = 0;
        s.str = getDateString(date);
        list.push(s);
        for (let i = 1; i <= 6; i++) {
            const subtractDay = getAddDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateString;
            list.push(m);
        }
    }else if(day === 2) {
        // 向后获取5天 向前一天
        const subtractDay = getSubtractDay(date, 1);
        const dateString = getDateString(subtractDay);
        const number = subtractDay.getDate();
        console.log('number', number);
        const ss = new CalendarMoudle();
        ss.name = number;
        ss.status = 0;
        ss.str = dateString;
        list.push(ss);
        const s = new CalendarMoudle();
        s.name = date.getDate();
        s.status = 0;
        s.str = getDateString(date);
        list.push(s);
        for (let i = 1; i <= 5; i++) {
            const subtractsDays = getAddDay(date, i);
            const dateStrings = getDateString(subtractsDays);
            const datStr = subtractsDays.getDate();
            const m = new CalendarMoudle();
            m.name = datStr;
            m.status = 0;
            m.str = dateStrings;
            list.push(m);
        }
    }else if(day === 3) {
        // 向后获取4天 向前2天
        const subtractDay = getSubtractDay(date, 2);
        const dateString = getDateString(subtractDay);
        const number = subtractDay.getDate();
        const s = new CalendarMoudle();
        s.name = number;
        s.status = 0;
        s.str = dateString;
        list.push(s);
        const subtractDay1 = getSubtractDay(date, 1);
        const dateStrings = getDateString(subtractDay1);
        const number1 = subtractDay1.getDate();
        const ss = new CalendarMoudle();
        ss.name = number1;
        ss.status = 0;
        ss.str = dateStrings;
        list.push(ss);

        const s2 = new CalendarMoudle();
        s2.name = date.getDate();
        s2.status = 0;
        s2.str = getDateString(date);
        list.push(s2);
        for (let i = 1; i <= 4; i++) {
            const subtractDa = getAddDay(date, i);
            const dateString1 = getDateString(subtractDa);
            const datStr = subtractDa.getDate();
            const r = new CalendarMoudle();
            r.name = datStr;
            r.status = 0;
            r.str = dateString1;
            list.push(r);
        }
    }else if(day === 4) {
        // 向后获取3天 向前3天
        for (let i = 1; i <= 3; i++) {
            const subtractDay = getSubtractDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const r = new CalendarMoudle();
            r.name = datStr;
            r.status = 0;
            r.str = dateString;
            list.unshift(r);
        }
        const rr = new CalendarMoudle();
        rr.name = date.getDate();
        rr.status = 0;
        rr.str = getDateString(date);
        list.push(rr);
        for (let i = 1; i <= 3; i++) {
            const subtractDay = getAddDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const rs = new CalendarMoudle();
            rs.name = datStr;
            rs.status = 0;
            rs.str = dateString;
            list.push(rs);
        }
    }else if(day === 5) {
        // 向后获取2天 向前4天
        for (let i = 1; i <= 4; i++) {
            const subtractDay = getSubtractDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const r = new CalendarMoudle();
            r.name = datStr;
            r.status = 0;
            r.str = dateString;
            list.unshift(r);
        }
        const rr = new CalendarMoudle();
        rr.name = date.getDate();
        rr.status = 0;
        rr.str = getDateString(date);
        list.push(rr);
        for (let i = 1; i <= 2; i++) {
            const subtractDay = getAddDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const rs = new CalendarMoudle();
            rs.name = datStr;
            rs.status = 0;
            rs.str = dateString;
            list.push(rs);
        }
    }else if(day === 6) {
        // 向后获取1天 向前5天
        for (let i = 1; i <= 5; i++) {
            const subtractDay = getSubtractDay(date, i);
            const dateString = getDateString(subtractDay);
            const datStr = subtractDay.getDate();
            const rs = new CalendarMoudle();
            rs.name = datStr;
            rs.status = 0;
            rs.str = dateString;
            list.unshift(rs);
        }
        const r = new CalendarMoudle();
        r.name = date.getDate();
        r.status = 0;
        r.str = getDateString(date);
        list.push(r);
        const subtractDay = getAddDay(date, 1);
        const dateString = getDateString(subtractDay);
        const number = subtractDay.getDate();
        const rr = new CalendarMoudle();
        rr.name = number;
        rr.str = dateString;
        rr.status = 0;
        list.push(rr);
    }
    const m = {num:list};
    useist.push(m);
    getAfterShowData(date, useist, day);

    return useist;
}

export function getNeedTime(date) {
    // 转换成本周一的时间戳
    if(date) {
        let number;
        const day = date.getDay();
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);
        date.setMilliseconds(0);
        if(day === 0) {
            // 周日获取6天之前的时间

            number = date.getTime() - 6 * 24 * 60 * 60 * 1000;
        }else if(day === 2) {
            // 周二获取1天之前的时间

            number = date.getTime() - 1 * 24 * 60 * 60 * 1000;
        }else if(day === 3) {
            // 周三获取2天之前的时间

            number = date.getTime() - 2 * 24 * 60 * 60 * 1000;
        } else if(day === 4) {
            // 周四获取3天之前的时间

            number = date.getTime() - 3 * 24 * 60 * 60 * 1000;
        } else if(day === 5) {
            // 周五获取4天之前的时间

            number = date.getTime() - 4 * 24 * 60 * 60 * 1000;
        } else if(day === 6) {
            // 周六获取5天之前的时间

            number = date.getTime() - 5 * 24 * 60 * 60 * 1000;
        }else {
            number = date.getTime() - 0 * 24 * 60 * 60 * 1000;
        }
        return number / 1000; // 返回秒的时间戳
    }

    return -1;
}


// module.exports = {
//     getShowCalendarInfo:getShowCalendarInfo,
//     getAfterShowData:getAfterShowData,
//     getBeforeShowData:getbeforeShowData,
//     getNeedTime:getNeedTime
//
// };
