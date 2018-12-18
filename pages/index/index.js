//index.js 获取应用实例
var app = getApp();
Page({
  data: {
    animationlist: [],
    isAnimation: false,
    zindex: [
      1, 2, 3, 4
    ],
    animationlistyet: [],
    cardInfoList: [
      {
        id: 1,
        cardUrl: 'http://pic.yupoo.com/enthu/326898da/3eccef12.jpg',
        cardInfo: {
          cardTitle: '传统的贵族精神',
          cardInfoMes: ['并非极尽奢侈与权势', '而是推崇英勇、正义的高贵人格']
        }
      }, {
        id: 2,
        cardUrl: 'http://pic.yupoo.com/enthu/a77f06af/32e10416.jpg',
        cardInfo: {
          cardTitle: '优雅的芭蕾舞蹈',
          cardInfoMes: ['通过轻巧的跳跃，与人建立内心的交流', '它的高雅与美妙堪称人类文明的精华']
        }
      }, {
        id: 3,
        cardUrl: 'http://pic.yupoo.com/enthu/ecdc1e92/5c9b31be.jpg',
        cardInfo: {
          cardTitle: '结合礼仪的高尔夫运动',
          cardInfoMes: ['倡导修补果岭上的落痕，平整沙坑上的足印', '于细节体现绅士精神']
        }
      },{
        id:4,
        cardUrl:'http://pic.yupoo.com/enthu/d3701283/5a8a788f.jpg',
        cardInfo:{
          cardTitle: '结合礼仪的高尔夫运动',
          cardInfoMes: ['倡导修补果岭上的落痕，平整沙坑上的足印', '于细节体现绅士精神']
        }
      }
    ]
  },
  //事件处理函数
  slidethis: function (e) {
    console.log(e);
    var self = this;
    if (this.data.isAnimation) {
      return false;
    }
    this.setData({isAnimation: true});
    var animation1 = wx.createAnimation({ duration: 600, timingFunction: 'ease'});
    this.animation1 = animation1;
    // this.animation1.translateY(-320).rotate(-5).translateX(0).scale(0.52).step();
    this
      .animation1
      .opacity(0)
      .step()
      .translateY(28)
      .translateX(51)
      .step()
      .opacity(1)
      .step();
    var animation2 = wx.createAnimation({ duration: 600, timingFunction: 'ease-in'});
    this.animation2 = animation2;
    this
      .animation2
      .translateY(62)
      .translateX(25)
      .step();
    var animation3 = wx.createAnimation({ duration: 600, timingFunction: 'ease-in'});
    this.animation3 = animation3;
    this
      .animation3
      .translateY(44)
      .translateX(41)
      .step();
    if (this.data.animationlistyet.length <= 0) {
      this.data.animationlistyet = [
        this
          .animation1
          .export(),
        this
          .animation2
          .export(),
        this
          .animation3
          .export()
      ];
    }
    this.setData({animationlist: this.data.animationlistyet});
    var animationlistyet = self.data.animationlistyet;
    var animation = self
      .data
      .animationlistyet
      .pop();
    self
      .data
      .animationlistyet
      .unshift(animation);
    self.setData({
      animationlist: [], animationlistyet: self.data.animationlistyet // 用来寄存下一次动画的排序
    });
    setTimeout(function () {
      var zindex = self.data.zindex;
      var slidethis = self
        .data
        .zindex
        .shift();
      self
        .data
        .zindex
        .push(slidethis);
      self.setData({isAnimation: false, zindex: self.data.zindex});
    }, 300);
  },
  buythis: function (e) {
    console.log(e);
    app.buyDetail = this.data.cardInfoList[e.target.id];
    wx.navigateTo({url: '../detail/detail'});
  },
  onLoad: function () {
    console.log('onLoad');
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({userInfo: userInfo});
    });
  },
  /**
   * [微信小程序分享]
   * @return {[type]} [description]
   */
  onShareAppMessage: function () {
    return {title: '自定义分享标题', desc: '自定义分享描述', path: '/index/index'};
  }
});
