export function debounce(func, time = 500){
  let timer = null;
  //返回最后一个裹着时间外衣的函数
   return function (...args) {
    //清除前一个裹着时间外衣的函数
     if(timer) clearTimeout(timer);
     timer = setTimeout(() => {
       //内部是要执行的函数
       func.apply(this,...args)
     }, time);
  }
}

//格式化时间
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};
