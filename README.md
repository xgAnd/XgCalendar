   此组件是基于Reactjs的日历组件
==
    包含了两个组件一个默认显示当月数据的日历组件WebCalendar</br>
![img](https://github.com/xgAnd/XgCalendar/blob/master/public/static/images/webcalendar.png)</br>
</br>
    WebCalendar的选中事件是onSele(date)=>{}返回的是选中日期的0点的13位时间戳</br>
    还有一个默认显示本周数据的CalendarCompoent</br>
![img](https://github.com/xgAnd/XgCalendar/blob/master/public/static/images/scrollcalendar.png)</br>
    CalendarCompoent的选中事件是onSeleData(dateStr)=>{}返回的是选中日期的字符串 例如 2019/4/23</br>
    CalendarCompoent支持滚动加载上下周的数据，此组件默认加载三周的数据，即上周，本周和下周的日期数据</br>
    并在滚动时进行判断滑动后的此周是否是数据中的最后一周，如果是会默认加载前/后一周的数据，即向前为最后一周会加载再之前的一周向后依然。</br>
    并且CalendarCompoent与WebCalendar进行了联动处理,在WebCalendar中选择了日期CalendarCompoent会滚动到选中的日期，并会默认加载前/后一周的数 据。</br>
    ![img](https://github.com/xgAnd/XgCalendar/blob/master/src/gif/demo.gif)</br>
    如果CalendarCompoent中选中了数据也会在WebCalendar之中进行体现,选中日期的背景会变为白色。源码中已经加了详细的注释，如果哪里不够清楚或者存在问题可以在issues中体现。如果此组件对你有帮助，帮忙点个star啊。
