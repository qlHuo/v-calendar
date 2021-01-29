// 设置当前的时间等信息
const setDate = (date) => {
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  const solar2lunarData = solarlunar.solar2lunar(year, month, day); // 输入的日子为公历
  const { monthCn, dayCn, ncWeek, term } = solar2lunarData;

  const weekCnArr = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
  const weekEnArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let weekEn;
  weekCnArr.some((item, index) => {
    if (item === ncWeek) {
      weekEn = weekEnArr[index];
      return true;
    }
  })

  const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthEnArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let monthEn;
  monthArr.some((item, index) => {
    if (item === month) {
      monthEn = monthEnArr[index];
      return true;
    }
  })

  fetch('https://v1.hitokoto.cn/?c=d&c=e&c=i&c=j&c=k&c=l')
    .then(response => response.json())
    .then(data => {
      $('.footer').text(data.hitokoto)
    })


  $('.header-date').text(year + '年' + month + '月' + day + '日');
  $('.main-lunar').text(monthCn + dayCn);
  $('.week-chinese').text(ncWeek);
  $('.week-english').text(weekEn);
  $('.main-solar-terms').text(term);
  $('.main-center').text(day);
  $('.month-english').text(monthEn);
  $('.month-chiness').text(month + '月');
}
// 初始化当前时间
setDate(new Date());


let domContent = document.querySelector('#container');
// 左滑，后一天
function handleLeft () {
  let currentDate = $('.header-date').text();
  let arr = currentDate.match(/\d+/g).map(item => parseInt(item));
  setDate(new Date(arr[0], arr[1] - 1, arr[2] + 1));

}
// 右滑，前一天
function handleRight () {
  let currentDate = $('.header-date').text();
  let arr = currentDate.match(/\d+/g).map(item => parseInt(item));
  setDate(new Date(arr[0], arr[1] - 1, arr[2] - 1));
}

// 绑定左滑事件
EventUtil.bindEvent(domContent, 'swipeleft', handleLeft);
//绑定右滑事件
EventUtil.bindEvent(domContent, 'swiperight', handleRight);
