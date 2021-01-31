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
  $('.month-chinese').text(month + '月');
}
// 初始化当前时间数据
setDate(new Date());

/**
 * 根据 window.devicePixelRatio 获取像素比
 * @returns {number}
 * @constructor
 */
function getDpr () {
  if (window.devicePixelRatio && window.devicePixelRatio > 1) {
    return window.devicePixelRatio;
  }
  return 1;
}

/**
 * 将传入值转为整数
 * @param value
 * @returns {number}
 */
function parseValue (value) {
  return parseInt(value, 10);
}

/**
 * 生成图片
 */
function generateImage () {
  $('.generate-image').hide(400);
  setTimeout(function () {
    // 获取想要转换的dom节点
    let dom = document.querySelector('body');
    // dom节点计算后宽高
    let width = parseValue(dom.offsetWidth);
    let height = parseValue(dom.offsetHeight);
    console.log(width, height);
    // 获取像素比
    let scaleBy = getDpr();

    // 创建自定义的canvas元素
    let canvas = document.createElement('canvas');

    // 设置canvas元素属性宽高为 DOM 节点宽高 * 像素比
    canvas.width = width * scaleBy;
    canvas.height = height * scaleBy;

    // 设置canvas css 宽高为DOM节点宽高
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    // 获取画笔
    let context = canvas.getContext('2d');

    // 将所有绘制内容放大像素比倍
    context.scale(scaleBy, scaleBy);

    // 设置需要生成的图片的大小，不限于可视区域（即可保存长图）
    let w = document.querySelector('body').offsetWidth;
    let h = document.querySelector('body').offsetHeight;
    console.log(w, h);
    html2canvas(dom, {
      allowTaint: true,
      width: w,
      height: h,
      useCORS: true
    }).then(function (canvas) {
      // 将canvas转换成图片渲染到页面上
      let url = canvas.toDataURL('image/png');// base64数据
      let image = new Image();
      image.src = url;
      document.getElementById('shareImg').appendChild(image);
      $.toast({
        text: '图片已生成，请长按保存到本地！',
        position: 'mid-center',
        stack: false,
        loader: false,
        hideAfter: 1000,
        allowToastClose: false,
        textAlign: 'center'
      })
    });
  }, 400);
}
// 生成图片
$('.generate-image').click(generateImage);

let domContent = document.querySelector('body');
// 左滑，后一天
function handleLeft () {
  $('#shareImg img').remove();
  $('.generate-image').show();
  let currentDate = $('.header-date').text();
  let arr = currentDate.match(/\d+/g).map(item => parseInt(item));
  setDate(new Date(arr[0], arr[1] - 1, arr[2] + 1));

}
// 右滑，前一天
function handleRight () {
  $('#shareImg img').remove();
  $('.generate-image').show();
  let currentDate = $('.header-date').text();
  let arr = currentDate.match(/\d+/g).map(item => parseInt(item));
  setDate(new Date(arr[0], arr[1] - 1, arr[2] - 1));
}

// 绑定左滑事件
EventUtil.bindEvent(domContent, 'swipeleft', handleLeft);
// 绑定右滑事件
EventUtil.bindEvent(domContent, 'swiperight', handleRight);
