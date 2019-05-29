import moment from "moment";
moment.locale("zh-cn");

function relativeNow(date) {
  return moment(date, "YYYYMMDD").fromNow();
}

export default {
  relativeNow
}