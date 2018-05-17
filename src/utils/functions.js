const utils = {
  /**
   * @description 获取日期
   * @param
   * @return
   */
  getDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getHours();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    if (hour < 10) {
      hour = `0${hour}`;
    }
    if (minute < 10) {
      minute = `0${minute}`;
    }
    return (`${year}-${month}-${day} ${hour}:${minute}`);
  },
  /**
   * @description 检查邮箱
   * @param
   * @return
   */
  verifyEmail(emailAddr) {
    const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+\.){1,63}[a-z0-9]+$/;
    return reg.test(emailAddr);
  },
};
export default utils;
