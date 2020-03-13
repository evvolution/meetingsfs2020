var pre_index = 1
var curr_index = 1
var number_status = 18
var on_running = false
var move_speed = 500  //变形速度

var defaut_color = "rgb(0,0,250)"
var defaut_textAlign = "center"
var screen_width = window.screen.availWidth
var screen_height = window.screen.availHeight
var defaut_font = "14px 黑体"
var x_delay_px = 0  // 像素位移修正
var y_delay_px = 0  // 像素位移修正
if (window.screen.availWidth % 2 == 0){
    x_delay_px = 6
}
if (window.screen.availHeight % 2 == 0){
    y_delay_px = 6
}
console.log(screen_width,screen_height)
var texts = [
    [
        {'text':screen_height+'*'+screen_width, 'x':0, 'y':0,'font': '40px 黑体','color': 'rgb(0,0,255)'},
    ],
    [
        {'text':'佛山GDP 10751亿元', 'x':0, 'y':-150-x_delay_px,'font': '40px 黑体','color': 'rgb(99,5,10)'},
    ],
    [
        {'text': '| 2015年 8134', 'x':-160-x_delay_px, 'y':-112-y_delay_px,'color': 'rgb(80,10,50)', 'textAlign': 'left'},
        {'text': '| 2016年 8758', 'x':-160-x_delay_px, 'y':-112-y_delay_px+50,'color': 'rgb(80,10,50)', 'textAlign': 'left'},
        {'text': '| 2017年 9399', 'x':-160-x_delay_px, 'y':-112-y_delay_px+100,'color': 'rgb(80,10,50)', 'textAlign': 'left'},
        {'text': '| 2018年 9936', 'x':-160-x_delay_px, 'y':-112-y_delay_px+150,'color': 'rgb(80,10,50)', 'textAlign': 'left'},
        {'text': '| 2019年 10751', 'x':-160-x_delay_px, 'y':-112-y_delay_px+200,'color': 'rgb(80,10,50)', 'textAlign': 'left'},
    ],
    [
        {'text':'2019年佛山五区GDP对比', 'x':0, 'y':-165,'font': '30px 黑体','color': 'rgb(120,250,80)'},
    ],
    
    [
        {'text': '| 深圳市 26927', 'x':-153-x_delay_px, 'y':-155-y_delay_px,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 广州市 23629', 'x':-153-x_delay_px, 'y':-155-y_delay_px+36,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 佛山市 10751', 'x':-153-x_delay_px, 'y':-155-y_delay_px+72,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 东莞市 9482', 'x':-153-x_delay_px, 'y':-155-y_delay_px+108,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 惠州市 4177', 'x':-153-x_delay_px, 'y':-155-y_delay_px+144,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 珠海市 3436', 'x':-153-x_delay_px, 'y':-155-y_delay_px+180,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 江门市 3147', 'x':-153-x_delay_px, 'y':-155-y_delay_px+216,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 中山市 3101', 'x':-153-x_delay_px, 'y':-155-y_delay_px+252,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 肇庆市 2249', 'x':-153-x_delay_px, 'y':-155-y_delay_px+288,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
    ],
    [
        {'text':'第一产业', 'x':-125, 'y':200,'font': '18px 雅黑','color': 'rgb(12,25,80)'},
        {'text':'156.92', 'x':-125, 'y':220,'font': '16px 宋体','color': 'rgb(12,25,80)'},
        {'text':'第二产业', 'x':0, 'y':200,'color': 'rgb(0,0,0)','font': '18px 宋体'},
        {'text':'156.92', 'x':0, 'y':220,'font': '16px 宋体','color': 'rgb(12,25,80)'},
        {'text':'第三产业', 'x':125, 'y':200,'color': 'rgb(0,0,0)','font': '18px 宋体'},
        {'text':'156.92', 'x':125, 'y':220,'font': '16px 黑体','color': 'rgb(12,25,80)'},
    ],
    [
        {'text':'先进制造业', 'x':-90, 'y':200,'color': 'rgb(99,125,10)'},
        {'text':'先进制造业', 'x':90, 'y':200,'color': 'rgb(99,125,10)'},
    ],
    [
        {'text': '超千亿企业', 'x':-170-x_delay_px, 'y':-145-y_delay_px,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '16px 黑体'},
        {'text': '超百亿企业', 'x':-170-x_delay_px, 'y':-145-y_delay_px+90,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '16px 黑体'},
        {'text': '民营企业500强', 'x':-170-x_delay_px, 'y':-145-y_delay_px+255,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '16px 黑体'},
    ],
    [
        {'text':'出口', 'x':-60, 'y':200,'color': 'rgb(99,125,10)'},
        {'text':'156.92', 'x':-60, 'y':220,'font': '14px 宋体','color': 'rgb(12,25,80)'},
        {'text':'进口', 'x':65, 'y':200,'color': 'rgb(99,125,10)'},
        {'text':'156.92', 'x':65, 'y':220,'font': '14px 宋体','color': 'rgb(12,25,80)'},
    ],
    [
        {'text':'1', 'x':-155, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'2', 'x':-155+28, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'3', 'x':-155+56, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'4', 'x':-155+84, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'5', 'x':-155+112, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'6', 'x':-155+140, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'7', 'x':-155+168, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'8', 'x':-155+196, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'9', 'x':-155+224, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'10', 'x':-155+252, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'11', 'x':-155+280, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
        {'text':'12', 'x':-155+308, 'y':190,'font': '12px 宋体','color': 'rgb(12,25,80)'},
    ],
    [
        {'text':'个体户', 'x':-30, 'y':0,'font': '20px 黑体','color': 'rgb(99,5,10)'},
        {'text':'企业', 'x':40, 'y':0,'font': '20px 黑体','color': 'rgb(99,5,10)'},
    ],
    [
        {'text':'第一产业', 'x':130, 'y':200,'color': 'rgb(0,0,0)'},
        {'text':'第二产业', 'x':-15, 'y':0,'color': 'rgb(0,0,0)'},
        {'text':'第三产业', 'x':50, 'y':0,'color': 'rgb(0,0,0)'},
    ],
    [
        {'text':'预算收入', 'x':-90, 'y':200,'color': 'rgb(99,125,10)'},
        {'text':'预算支出', 'x':90, 'y':200,'color': 'rgb(99,125,10)'},
    ],
    [
        {'text': '| 深圳市 26927', 'x':-153-x_delay_px, 'y':-155-y_delay_px,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 广州市 23629', 'x':-153-x_delay_px, 'y':-155-y_delay_px+36,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 佛山市 10751', 'x':-153-x_delay_px, 'y':-155-y_delay_px+72,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 东莞市 9482', 'x':-153-x_delay_px, 'y':-155-y_delay_px+108,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 惠州市 4177', 'x':-153-x_delay_px, 'y':-155-y_delay_px+144,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 珠海市 3436', 'x':-153-x_delay_px, 'y':-155-y_delay_px+180,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 江门市 3147', 'x':-153-x_delay_px, 'y':-155-y_delay_px+216,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 中山市 3101', 'x':-153-x_delay_px, 'y':-155-y_delay_px+252,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
        {'text': '| 肇庆市 2249', 'x':-153-x_delay_px, 'y':-155-y_delay_px+288,'color': 'rgb(80,10,50)', 'textAlign': 'left','font': '12px 黑体'},
    ],
    [
        {'text':'15GDP', 'x':160, 'y':56,'font': '40px 黑体','color': 'rgb(99,5,10)'},
    ],
    [
        {'text':'16GDP', 'x':160, 'y':56,'font': '40px 黑体','color': 'rgb(99,5,10)'},
    ],  
    [
        {'text':'17GDP', 'x':160, 'y':56,'font': '40px 黑体','color': 'rgb(99,5,10)'},
    ], 
    [
        {'text':'18GDP', 'x':160, 'y':56,'font': '40px 黑体','color': 'rgb(99,5,10)'},
    ],   
    [
        {'text':'18GDP', 'x':160, 'y':56,'font': '40px 黑体','color': 'rgb(99,5,10)'},
    ],  
]
var text_index = 1

var p1_option = {
        xAxis: {
            type: 'category',
            show: false,
            data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
        },
        yAxis: {
            type: 'value',
            show: false,
        },
        series: [{
            data: [-1.6,-12.82,91.91,28.98,23.51,25.61,10.11,2.46,16.99,16.96,9.0,16.32],
            type: 'line',
            smooth: true
        }]
    };

var p2_option = {
    series: {
        type: 'pie',
        radius: ['6%', '20%'],
        roseType: 'area',
        tooltip: {
            show: true,
            formatter: '{b}: {c}%'
        },
        data: [{value: 14.7,name: '禅城'},{value: 10.4,name: '南海'},{value: 6.3,name: '顺德'},{value: 21.6,name: '三水'},{value: 7.6,name: '高明'}]
}}

//chart
var myChart = echarts.init(document.getElementById("chart"))
$(document).ready(function(){
    setSteps();
    init();
    JxHome.init()
});


window.onload = function(){
    setTimeout(() => window.scrollTo(0,0), 150); // 返回页面顶部
};


function setSteps(){
    var innerused = window.innerWidth*2;
    console.log(innerused)
    $(".step").css("height",innerused);
}

var scrolly = document.querySelector('#demoscroll');
var article = scrolly.querySelector('article');
var step = article.querySelectorAll('.step');

// initialize the scrollama
var scroller = scrollama();

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }
    console.log(response);
    console.log(curr_index, pre_index, on_running)
    tmp_index = response.index + 1
    curr_index = tmp_index
    if (response.direction == 'up') {
         pre_index = tmp_index + 1
    } else {
         pre_index = tmp_index - 1
    }


    response.element.classList.add('is-active');

}

function handleStepExit(response) {
    response.element.classList.remove('is-active');
}

function init() {
    // set random padding for different step heights (not required)
    step.forEach(function (step) {
        var v = 100 + Math.floor(Math.random() * window.innerHeight / 4);
        step.style.padding = v + 'px 0px';
    });

    scroller.setup({
        step: '#demoscroll article .step',
        // debug: true,
        offset: 0.5,
        order: true,
        threshold:1
    })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    window.addEventListener('resize', scroller.resize);
}


/*-------------*/
    Laro.register('JxHome', function (La) {
        var pkg = this;

        this.initStage = function () {
            var canvas = document.getElementById('maincanvas');
            canvas.width = window.screen.availWidth; //屏幕尺寸
            canvas.height = window.screen.availHeight;
            this.canvas = canvas;
            this.stage = new CVS.$stage(canvas);
            this.ctx = this.stage.ctx;
            this.vpx = canvas.width;
            this.vpy = canvas.height;
            this.normalN = 1; //噪点
            this.normalBalls = [];
            this.angleX = 0;
            this.angleY = 0;
            this.zstep = 0;
            this.zflag = 0;
        }

        this.range = function (a, b) {
            return Math.floor(Math.random()*(b-a) + a);
        }

        this.tween = function (ball, t) {
            if (!ball.end) {
                var _x = ball.xpos, _y = ball.ypos, _z = ball.zpos;
                var _t = (+new Date) - ball.startAnimTime;
                    ball.xpos = ball.f_xpos + (ball.t_xpos - ball.f_xpos)*Math.sin(Math.PI*_t/(2*t));
                    ball.ypos = ball.f_ypos + (ball.t_ypos - ball.f_ypos)*Math.sin(Math.PI*_t/(2*t));
                    ball.zpos = ball.f_zpos + (ball.t_zpos - ball.f_zpos)*Math.sin(Math.PI*_t/(2*t));

                 if (_t >= t) {
                    ball.end = true;
                }
            }
        }

        this.updateBalls = function (dt, name) {
            var balls = this.particleHash[name];
            for (var i = 0; i < balls.length; i ++) {
                var ball = balls[i];
                pos = ball.getScreenXY();
                ball.width = ball.logoPos.width;
                ball.x = pos.x;
                ball.y = pos.y;
            }
        };

        this.pushBalls = function (name) {
            var balls = this.particleHash[name];
            for (var i = 0; i < balls.length; i ++) {
                var ball = balls[i];
                JxHome.stage.addChild(ball);
                ball.end = false;
                ball.color = 'rgb('+ball.logoPos.r+', '+ball.logoPos.g+', '+ball.logoPos.b+')';
                ball.startAnimTime = (+ new Date);

            }
        }

        this.initParticles = function () {
            this.qqParticles = this.getParticles('qq', 100, 100);
            this.jxParticles = this.getParticles('jx', 100, 100);
            this.qplusParticles = this.getParticles('qplus', 100, 100);
            this.atParticles = this.getParticles('at', 100, 100, 100);
            this.t1Particles = this.getParticles('t1', 100, 100);
            this.t2Particles = this.getParticles('t2', 100, 100);
            this.t3Particles = this.getParticles('t3', 100, 100);
            this.t4Particles = this.getParticles('t4', 100, 100);
            this.t5Particles = this.getParticles('t5', 100, 100);
            this.t6Particles = this.getParticles('t6', 100, 100);
            this.t7Particles = this.getParticles('t7', 100, 100);
            this.t8Particles = this.getParticles('t8', 100, 100);
            this.t9Particles = this.getParticles('t9', 100, 100);
            this.t10Particles = this.getParticles('t10', 100, 100);
            this.t11Particles = this.getParticles('t11', 100, 100);
            this.t12Particles = this.getParticles('t12', 100, 100);
            this.t13Particles = this.getParticles('t13', 100, 100);
            this.t14Particles = this.getParticles('t14', 100, 100);

            this.particleHash = {
                'normal': this.normalBalls,
                'qq': this.qqParticles,
                'jx': this.jxParticles,
                'qplus': this.qplusParticles,
                'at': this.atParticles,
                't1': this.t1Particles,
                't2': this.t2Particles,
                't3': this.t3Particles,
                't4': this.t4Particles,
                't5': this.t5Particles,
                't6': this.t6Particles,
                't7': this.t7Particles,
                't8': this.t8Particles,
                't9': this.t9Particles,
                't10': this.t10Particles,
                't11': this.t11Particles,
                't12': this.t12Particles,
                't13': this.t13Particles,
                't14': this.t14Particles,
            }
        }
        this.getParticles = function (id, w, h, z) {
            z = 0
            var image = document.getElementById(id);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, w*2, h*2, this.canvas.width/2-w/2, this.canvas.height/2-h/2, w, h);
            
            var imageData = this.ctx.getImageData(this.canvas.width/2-w/2, this.canvas.height/2-h/2, w, h);
            var ret = [];
            for (var x = 0; x < imageData.width; x ++) {
                for (var y = 0; y < imageData.height; y ++) {
                    //var i = 4*(x * imageData.height + y);
                    var i = 4*(y * imageData.width + x);
                    if (imageData.data[i + 3] > 128) { // 半透以上就算
                        var r = imageData.data[i],
                            g = imageData.data[i + 1],
                            b = imageData.data[i + 2];
                        ret.push(new JxHome.Particle(this.stage, this.canvas, id, w, h, x, y, z, r, g, b));
                    }
                }
            }
            return ret;
        }

        this.init = function () {
            this.initStage();
            JxHome.$fsm.init();
            JxHome.$loop.init();
        }
    });

    Laro.register('JxHome', function (La) {
        var pkg = this,
            range = JxHome.range,
            vpx = JxHome.vpx,
            vpy = JxHome.vpy;

        this.Particle = function (stage, canvas, id, w, h, x, y, z, r, g, b) {
            this.canvas = canvas;

            var vpx = canvas.width/2,
                vpy = canvas.height/2;

            var ball =  CVS.createPoint3D(stage.ctx, function () {
                var color = 'rgb('+ range(200, 255) +', '+ range(200, 255) +', '+ range(200, 255) +')';
                var a = Math.PI * 2 * Math.random();
                var b = Math.PI * 2 * Math.random();
                var r = range(vpx, vpy);

                this.xpos = Math.sin(a) * Math.sin(b) * r;
                this.ypos = Math.cos(a) * Math.sin(b) * r;
                this.zpos = -Math.abs(Math.cos(b) * r);

                this.width = range(3, 15);
                this.color = color;
                this.draw = function () {
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
                    this.ctx.closePath();
                    this.ctx.fillStyle = this.color;
                    this.ctx.fill();
                }
            });

            ball.logoPos = {
                x: (x-w/4)*12,
                y: (y-h/4)*12,
                z: 0,
                width: 6,
                r: r,
                g: g,
                b: b
            };
            ball.f_xpos = ball.xpos;
            ball.f_ypos = ball.ypos;
            ball.f_zpos = ball.zpos;
            ball.t_xpos = ball.logoPos.x;
            ball.t_ypos = ball.logoPos.y;
            ball.t_zpos = ball.logoPos.z;
            ball.startAnimTime = (+new Date);
            ball.end = true;
            ball.type = id;

            ball.setVanishPoint(canvas.width/2, canvas.height/2);
            ball.setCenterPoint(0, 0, z);
            return ball;
        }
    });

    //图的变化
    Laro.register('JxHome.$states', function (La) {
        var pkg = this;
        this.QQ = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('qq'); //带有图片本来颜色

                this._t = 0;  //初始化时间
                this.explosion = false;
                this.has_show = false;
                // 清理上一次的粒子
                var ball_type = 'qq'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                
                
                
                on_running = false

            },
            leave: function () {
               
            },
            update: function (dt) {

                this._t += dt;
                for (var i = 0; i < JxHome.qqParticles.length; i ++) {
                    var ball = (JxHome.qqParticles[i]);
                    JxHome.tween(ball, move_speed*5);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                if (!this.has_show && this._t*1000  > move_speed*3){ //出现图片
                    this.has_show = true
                    home_pic = document.getElementById('t0') 
                    if ((home_pic.style.display = "none") && (curr_index == 1)){
                        home_pic.style.display = 'block'
                    }
                    for (var i = 0; i < JxHome.stage.children.length; i ++) {
                        var ball = JxHome.stage.children[i];
                        if (ball.type == 'qq') {
                            JxHome.stage.children.splice(i, 1);
                            i --;
                        }
                    } 
                }
            },
            transition: function () {

                // 闪开动画
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;

                // if (this._t > 5 && !this.explosion) {
                   if (curr_index != 1 && !this.explosion) {
                    
                    JxHome.pushBalls('qq'); 

                    for (var i = 0; i < JxHome.qqParticles.length; i ++) {
                        var ball = JxHome.qqParticles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                    document.getElementById('t0').style.display = "none"  // 图片出现
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed*2) {

                    
                    if (curr_index == 2){
                        this.host.setState(2);
                    }

                    if (curr_index == 4){
                        this.host.setState(4);
                    }

                }
            },
            draw: function () {
            }
        });

        this.Jx = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('jx');
                this._t = 0;
                this.explosion = false;
                var ball_type = 'jx'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false
            },
            leave: function () {
            },
            update: function (dt) {
                this._t += dt;
                for (var i = 0; i < JxHome.jxParticles.length; i ++) {
                    var ball = (JxHome.jxParticles[i]);

                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                // }

                // explosion
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                // if (this._t > 5 && !this.explosion) {
                if (curr_index != 2 && !this.explosion) {
                    for (var i = 0; i < JxHome.jxParticles.length; i ++) {
                        var ball = JxHome.jxParticles[i];

                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);

                        ball.end = false;
                        // ball.width = range(8, 15);
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 3){
                        this.host.setState(3);
                    }

                    if (curr_index == 1){
                        this.host.setState(1);
                    }
                }
            },
            draw: function () {

            }
        });

        this.QPlus = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('qplus');
                this._t = 0;
                this.explosion = false;
                var ball_type = 'qplus'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                // myChart.setOption(p1_option, true);
                on_running = false
            },
            leave: function () {
                // myChart.setOption({}, true);
            },
            update: function (dt) {
                this._t += dt;
                for (var i = 0; i < JxHome.qplusParticles.length; i ++) {
                    var ball = (JxHome.qplusParticles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();

            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                //画面停留时间
                // if (this._t > 8 && !this.explosion) {
                if (curr_index != 3 && !this.explosion) {
                    for (var i = 0; i < JxHome.qplusParticles.length; i ++) {
                        var ball = JxHome.qplusParticles[i];

                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);

                        ball.end = false;
                        // ball.width = range(8, 15);
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 4){
                        this.host.setState(4);
                    }
                    if (curr_index == 2){
                        this.host.setState(2);
                    };
                }
            },
            transition: function () {

            },
            draw: function () {

            }
        });

        this.AT = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('at');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 'at'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.atParticles.length; i ++) {
                    var ball = (JxHome.atParticles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 4 && !this.explosion) {
                    for (var i = 0; i < JxHome.atParticles.length; i ++) {
                        var ball = JxHome.atParticles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 5){
                        this.host.setState(5);
                    }
                    if (curr_index == 3){
                        this.host.setState(3);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

        this.T1 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t1');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't1'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t1Particles.length; i ++) {
                    var ball = (JxHome.t1Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 5 && !this.explosion) {
                    for (var i = 0; i < JxHome.t1Particles.length; i ++) {
                        var ball = JxHome.t1Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {

                    if (curr_index == 6){
                        this.host.setState(6);
                    }

                    if (curr_index == 4){
                        this.host.setState(4);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

        this.T2 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t2');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't2'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t2Particles.length; i ++) {
                    var ball = (JxHome.t2Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 6 && !this.explosion) {
                    for (var i = 0; i < JxHome.t2Particles.length; i ++) {
                        var ball = JxHome.t2Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 5){
                        this.host.setState(5);
                    }

                    if (curr_index == 7){
                        this.host.setState(7);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

        this.T3 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t3');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't3'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t3Particles.length; i ++) {
                    var ball = (JxHome.t3Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 7 && !this.explosion) {
                    for (var i = 0; i < JxHome.t3Particles.length; i ++) {
                        var ball = JxHome.t3Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 6){
                        this.host.setState(6);
                    }

                    if (curr_index == 8){
                        this.host.setState(8);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

        this.T4 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t4');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't4'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t4Particles.length; i ++) {
                    var ball = (JxHome.t4Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 8 && !this.explosion) {
                    for (var i = 0; i < JxHome.t4Particles.length; i ++) {
                        var ball = JxHome.t4Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 7){
                        this.host.setState(7);
                    }
                    if (curr_index == 9){
                        this.host.setState(9);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

        this.T5 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t5');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't5'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t5Particles.length; i ++) {
                    var ball = (JxHome.t5Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 9 && !this.explosion) {
                    for (var i = 0; i < JxHome.t5Particles.length; i ++) {
                        var ball = JxHome.t5Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 8){
                        this.host.setState(8);
                    }
                    if (curr_index == 10){
                        this.host.setState(10);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

        this.T6 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t6');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't6'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                myChart.setOption(p1_option,true)
                on_running = false

            },

            leave: function () {
                myChart.setOption({},true)
            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t6Particles.length; i ++) {
                    var ball = (JxHome.t6Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 10 && !this.explosion) {
                    for (var i = 0; i < JxHome.t6Particles.length; i ++) {
                        var ball = JxHome.t6Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 9){
                        this.host.setState(9);
                    }
                    if (curr_index == 11){
                        this.host.setState(11);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T7 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t7');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't7'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t7Particles.length; i ++) {
                    var ball = (JxHome.t7Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 11 && !this.explosion) {
                    for (var i = 0; i < JxHome.t7Particles.length; i ++) {
                        var ball = JxHome.t7Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 10){
                        this.host.setState(10);
                    }
                    if (curr_index == 12){
                        this.host.setState(12);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T8 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t8');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't8'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t8Particles.length; i ++) {
                    var ball = (JxHome.t8Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 12 && !this.explosion) {
                    for (var i = 0; i < JxHome.t8Particles.length; i ++) {
                        var ball = JxHome.t8Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 11){
                        this.host.setState(11);
                    }
                    if (curr_index == 13){
                        this.host.setState(13);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T9 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t9');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't9'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t9Particles.length; i ++) {
                    var ball = (JxHome.t9Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 13 && !this.explosion) {
                    for (var i = 0; i < JxHome.t9Particles.length; i ++) {
                        var ball = JxHome.t9Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 12){
                        this.host.setState(12);
                    }
                    if (curr_index == 14){
                        this.host.setState(14);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T10 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t10');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't10'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t10Particles.length; i ++) {
                    var ball = (JxHome.t10Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 14 && !this.explosion) {
                    for (var i = 0; i < JxHome.t10Particles.length; i ++) {
                        var ball = JxHome.t10Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 13){
                        this.host.setState(13);
                    }
                    if (curr_index == 15){
                        this.host.setState(15);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T11 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t11');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't11'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t11Particles.length; i ++) {
                    var ball = (JxHome.t11Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 15 && !this.explosion) {
                    for (var i = 0; i < JxHome.t11Particles.length; i ++) {
                        var ball = JxHome.t11Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 14){
                        this.host.setState(14);
                    }
                    if (curr_index == 16){
                        this.host.setState(16);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T12 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t12');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't12'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t12Particles.length; i ++) {
                    var ball = (JxHome.t12Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 16 && !this.explosion) {
                    for (var i = 0; i < JxHome.t12Particles.length; i ++) {
                        var ball = JxHome.t12Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 15){
                        this.host.setState(15);
                    }
                    if (curr_index == 17){
                        this.host.setState(17);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T13 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t13');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't13'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t13Particles.length; i ++) {
                    var ball = (JxHome.t13Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 17 && !this.explosion) {
                    for (var i = 0; i < JxHome.t13Particles.length; i ++) {
                        var ball = JxHome.t13Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 16){
                        this.host.setState(16);
                    }

                    if (curr_index == 18){
                        this.host.setState(18);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });
        this.T14 = La.BaseState.extend(function () {

        }).methods({
            enter: function (msg, fromState) {
                // document.getElementById("chart1").style.display=""
                on_running = true
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('t14');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 't14'
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type !== ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false

            },

            leave: function () {

            },
            update: function (dt) {
                this._t += dt;

                for (var i = 0; i < JxHome.t14Particles.length; i ++) {
                    var ball = (JxHome.t14Particles[i]);
                    JxHome.tween(ball, move_speed);
                    pos = ball.getScreenXY();
                    ball.width = ball.logoPos.width;
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                if (curr_index != 18 && !this.explosion) {
                    for (var i = 0; i < JxHome.t14Particles.length; i ++) {
                        var ball = JxHome.t14Particles[i];
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        ball.end = false;
                        ball.width = ball.logoPos.width;
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= move_speed) {
                    if (curr_index == 17){
                        this.host.setState(17);
                    }

                }
            },
            transition: function () {
            },
            draw: function () {

            }
        });

    });

    Laro.register('JxHome.$fsm', function (La) {
        var pkg = this;

        this.init = function () {
            this.getStatesList();
            this.$ = new La.AppFSM(this, this.statesList);
            this.$.setState(1);
        }
        this.getStatesList = function () {
            this.statesList = [
                1, JxHome.$states.QQ,
                2, JxHome.$states.Jx,
                3, JxHome.$states.QPlus,
                4, JxHome.$states.AT,
                5, JxHome.$states.T1,
                6, JxHome.$states.T2,
                7, JxHome.$states.T3,
                8, JxHome.$states.T4,
                9, JxHome.$states.T5,
                10, JxHome.$states.T6,
                11, JxHome.$states.T7,
                12, JxHome.$states.T8,
                13, JxHome.$states.T9,
                14, JxHome.$states.T10,
                15, JxHome.$states.T11,
                16, JxHome.$states.T12,
                17, JxHome.$states.T13,
                18, JxHome.$states.T14,
            ];
        }

        this.setState = function (state, msg, suspendCurrent) {
            this.$.setState(state, msg, suspendCurrent);
            text_index = state
        }
    });

    Laro.register('JxHome.$loop', function (La) {
        var pkg = this;

        this.init = function () {
            this.$ = new La.Loop(this.looper, this);
        }

        this.looper = function (dt) {
            this.update(dt);
            this.draw();
        }
        this.update = function (dt) {
            JxHome.$fsm.$.update(dt);
        }
        this.draw = function () {
            JxHome.ctx.clearRect(0, 0, JxHome.canvas.width, JxHome.canvas.height);
            JxHome.stage.render();
            JxHome.$fsm.$.draw();
            //写字
            for (var i=0; i <= texts[text_index-1].length - 1; i++) {
                // 格式配置，如果有参数就用，没有就用默认参数
                if (texts[text_index-1][i].textAlign !== undefined){
                    JxHome.ctx.textAlign = texts[text_index-1][i].textAlign;    
                } else {
                    JxHome.ctx.textAlign = defaut_textAlign
                }
                if (texts[text_index-1][i].font !== undefined){
                    JxHome.ctx.font = texts[text_index-1][i].font;   
                } else {
                    JxHome.ctx.font = defaut_font
                }
                if (texts[text_index-1][i].color !== undefined){
                    JxHome.ctx.fillStyle = texts[text_index-1][i].color;    
                } else {
                    JxHome.ctx.fillStyle = defaut_color
                }
                //把字写上
                 JxHome.ctx.fillText(
                    texts[text_index-1][i].text,
                    screen_width/2+texts[text_index-1][i].x,
                    screen_height/2+texts[text_index-1][i].y,    
                );

             } 

            

        }
    });