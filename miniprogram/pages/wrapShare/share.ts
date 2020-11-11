export function onShareAppMessage(title: string, path: string){

  

  return {
    title: title,
    path: path,
    imageUrl: 'http://image.woshipm.com/wp-files/2020/10/CLo75BihVQhWOeqt1rWl.jpg',
    success(res: any) {
      console.log("转发成功！");
      console.log(res)
      if (!res.shareTickets) {
        //分享到个人
        console.log("shareFriendSuccess!");
        // callback && callback();
      } else {
        //分享到群
        let st = res.shareTickets[0];
        wx.getShareInfo({
          shareTicket: st,
          success(res) {
            let iv = res.iv
            let encryptedData = res.encryptedData;
            console.log("groupShareSuccess!", iv, encryptedData);
            //执行转发成功以后的回调函数
            // callback && callback();
            
          }
        });
      }
    },
    fail: function (res: any) {
      console.log("转发失败！", res);
    }
  };
}