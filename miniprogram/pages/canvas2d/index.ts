// const app = getApp()

Page({
  data: {
    position: {} as any,
    x: 0 as any,
    _img: '' as any,
    canvas: null as any,
    width: 0,
    height: 0
  },
  onLoad: function () {
    this.data.position = {
      x: 150,
      y: 150,
      vx: 2,
      vy: 2
    }
    this.data.x = -100

    // 通过 SelectorQuery 获取 Canvas 节点
    wx.createSelectorQuery()
      .select('#canvas')
      .fields({
        node: true,
        size: true,
      })
      .exec(this.init.bind(this))
  },

  init(res: any) {
    const width = res[0].width
    const height = res[0].height

    const canvas = res[0].node
    const ctx = canvas.getContext('2d')

    const dpr = wx.getSystemInfoSync().pixelRatio
    canvas.width = width * dpr
    canvas.height = height * dpr
    ctx.scale(dpr, dpr)

    const renderLoop = () => {
      this.render(canvas, ctx)
      canvas.requestAnimationFrame(renderLoop)
    }
    canvas.requestAnimationFrame(renderLoop)

    const img = canvas.createImage()
    img.onload = () => {
      this.data._img = img
    }
    img.src = './car.png'
  },

  render(canvas: any, ctx: any) {
    ctx.clearRect(0, 0, 300, 300)
    this.drawBall(ctx)
    this.drawCar(ctx)
  },

  drawBall(ctx: any) {
    const p = this.data.position
    p.x += p.vx
    p.y += p.vy
    if (p.x >= 300) {
      p.vx = -2
    }
    if (p.x <= 7) {
      p.vx = 2
    }
    if (p.y >= 300) {
      p.vy = -2
    }
    if (p.y <= 7) {
      p.vy = 2
    }

    function ball(x: any, y: any) {
      ctx.beginPath()
      ctx.arc(x, y, 5, 0, Math.PI * 2)
      ctx.fillStyle = '#1aad19'
      ctx.strokeStyle = 'rgba(1,1,1,0)'
      ctx.fill()
      ctx.stroke()
    }

    ball(p.x, 150)
    ball(150, p.y)
    ball(300 - p.x, 150)
    ball(150, 300 - p.y)
    ball(p.x, p.y)
    ball(300 - p.x, 300 - p.y)
    ball(p.x, 300 - p.y)
    ball(300 - p.x, p.y)
  },

  drawCar(ctx: any) {
    if (!this.data._img) return
    if (this.data.x > 350) {
      this.data.x = -100
    }
    ctx.drawImage(this.data._img, this.data.x++, 150 - 25, 100, 50)
    ctx.restore()
  },
  onPaint() {
    const _this = this
    wx.createSelectorQuery()
      .select('#myCanvas')
      .fields({
        node: true,
        size: true,
      })
      .exec((res: any) => {
        const width = res[0].width
        const height = res[0].height
      
        const canvas = res[0].node
        _this.setData({
          canvas,
          width,
          height
        })
        const ctx = canvas.getContext('2d')
      
        const dpr = wx.getSystemInfoSync().pixelRatio
        canvas.width = width * dpr
        canvas.height = height * dpr
        ctx.scale(dpr, dpr)
      
        
        const img = canvas.createImage()
        img.src = 'http://image.woshipm.com/wp-files/2020/04/iFjn4wzv70NfDk2l2OWR.jpg'
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 20, 60)
        }

        ctx.font = "bold 22px Arial";
        ctx.fillStyle = "red"
        ctx.fillText("Welcome to hangge.com", 10, 10)

        ctx.font = "normal 22px Arial";
        ctx.fillStyle = "blue"
        ctx.fillText("Welcome to hangge.com", 10, 20)

        _this._verticalText('我是竖123SF着的', 20, 20, ctx)

        const text = _this._fittingText('我是测试超出的字符串我是测试超出的字符串', 200, ctx)
        ctx.fillText(text, 10, 40)

        _this._autoWrap('测试换行测试换行测试换行测试换行测试换行', 20, 60, 200, 20, ctx)
      })
  },
  _autoWrap(message: string, x:number, y:number, maxWidth: number, lineHeight: number, ctx: any) {
      let arrText = message.split('');
      let line = '';
      for (let n = 0; n < arrText.length; n++) {
          let testLine = line + arrText[n];
          let metrics = ctx.measureText(testLine);
          let testWidth = metrics.width;
          if (testWidth > maxWidth && n > 0) {
              ctx.fillText(line, x, y);
              line = arrText[n];
              y += lineHeight;
           } else {
              line = testLine;
           }
      }
      ctx.fillText(line, x, y);
  },
  _fittingText(message: string, maxWidth: number, ctx: any) {
    let width = ctx.measureText(message).width;
    const ellipsis = '…';
    const ellipsisWidth = ctx.measureText(ellipsis).width;
    if (width<=maxWidth || width<=ellipsisWidth) {
        return message;
    } else {
        let len = message.length;
        while ((width >= maxWidth - ellipsisWidth) && len-->0) {
            message = message.substring(0, len);
            width = ctx.measureText(message).width;
        }
        return message+ellipsis;
    }
  },
  _verticalText(message: string, x: number, y: number, ctx: any) {
    let letterSpacing = 10; // 设置字间距
    for(let i = 0; i < message.length; i++){
      const str = message.slice(i,i+1).toString();
      if(str.match(/[A-Za-z0-9]/)&&(y<576)){ // 非汉字 旋转
          ctx.save();
          ctx.translate(x,y);
          ctx.rotate(Math.PI/180*90);
          ctx.textBaseline = 'bottom';
          ctx.fillText(str,0,0);
          ctx.restore();
          y+=ctx.measureText(str).width+letterSpacing; // 计算文字宽度
      }else if(str.match(/[\u4E00-\u9FA5]/)&&(y<576)){
        ctx.save();
        ctx.textBaseline = 'top';
        ctx.fillText(str,x,y);
        ctx.restore();
        y+=ctx.measureText(str).width+letterSpacing; // 计算文字宽度
    }
  }
  },
  onSave() {
    console.log('save')
    const _this = this
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: _this.data.width,
      height: _this.data.height,
      canvas: this.data.canvas, // 使用2D 需要传递的参数
      quality: 1,
      success(res) {
        console.log(res.tempFilePath)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success() {
            wx.showToast({
              title: '保存成功，请在相册中查看',
            })
          }
        })
      },
      fail(err) {
        console.log('error', err)
      }
    })
  }
})
