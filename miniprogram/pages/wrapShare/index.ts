import { onShareAppMessage } from './share'
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    console.log('inform detail onShareAppMessage');

    let title = `班级助手`;;
    let path = '/pages/index/index'
    let shareCallBack = () => {
        console.log('share call back suc')
    };
    //此处调用封装好的分享代码
    return onShareAppMessage(title, path);
  },
})