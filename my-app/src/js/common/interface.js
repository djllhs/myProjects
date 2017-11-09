/**
 * Created by 代佳玲 on 2016/8/16.
 */
//const DEVELOPMENT = 'www.daily.bookln.cn';
const DEVELOPMENT = '192.168.0.35';
//const DEVELOPMENT = '192.168.4.12:8080';
const PRODUCTION  = window.location.host;
const isDP        = !!~PRODUCTION.indexOf('localhost') || !!~PRODUCTION.indexOf('192.168.0.25');
const HOST        =  window.location.protocol + '//' + (isDP ? DEVELOPMENT : PRODUCTION);

const action = {

    bookShelf: HOST + '/personalService/userBooks.do',//我的书架
    bookInfo: HOST + '/book.htm?',//书籍详情
    spotBook: HOST + '/read.htm?',//点读书
    viewCourse: HOST + '/lesson.htm?',//课程
    favorites: HOST + '/personalService/favorites.do',//我的收藏
    playAudio: HOST + '/share/audio.htm?',//播放音频
    playVideo: HOST + '/share/video.htm?',//播放视频
    bought: HOST + '/personalService/bought.do',//已购买的
    eventUp: HOST + '/statisticsService/eventUp.do',//事件上报
    error: HOST + '/qr/error.htm',//错误页面
    course: HOST + '/personalService/lesson.do', // 我的课程
    coupon: HOST + "/couponService/list.do", // 优惠券
    confirm_receive: HOST +"/personalService/confirmOrder.do" , // 确认收货
    showBanner: HOST + "/personalService/banner.do", // 显示banner
    viewStudyPlan: HOST + "/studyplan/intro.htm?id=", // 学习计划'

    noticeTips: HOST + "/personalService/noticeTips.do", //消息红点提示
};

export {action as default} ;