var pre_index = 1
var curr_index = 1
var number_status = 4
var on_running = false

function up() {
    if (on_running) {
        console.log('不能动，等待粒子变化')
        return
    }
    on_running = true
    pre_index = curr_index
    curr_index = pre_index + 1
    if (curr_index > number_status) {
        curr_index = 1
    }
    console.log('变换',pre_index, curr_index)
}


function down() {
    if (on_running) {
        console.log('不能动，等待粒子变化')
        return
    }
    on_running = true
    pre_index = curr_index
    curr_index = pre_index - 1
    if (curr_index <= 0) {
        curr_index = number_status
    }
    console.log('变换',pre_index, curr_index)
}

$(document).ready(function(){
    setSteps();
    init();
    JxHome.init()
});

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
    curr_index = response.index + 1

    switch (curr_index) {
        case 1:
            if (response.direction == 'down') {
                pre_index = 1
            } else {
                pre_index = 2
            }
             break;
        case 2:
            if (response.direction == 'down') {
                pre_index = 1
            } else {
                pre_index = 3
            }
             break;
        case 3:
            if (response.direction == 'down') {
                pre_index = 2
            } else {
                pre_index = 4
            }
             break;
        case 4:
            if (response.direction == 'down') {
                pre_index = 3
            } else {
                pre_index = 1
            }
            break;

    }
    console.log('enter');
    // add to color to current step
    //down()
    response.element.classList.add('is-active');
    
}

function handleStepExit(response) {
    // response = { element, direction, index }
    console.log('exit');
    console.log(response);
    // remove color from current step
    //up()
    response.element.classList.remove('is-active');
}

function init() {
    // set random padding for different step heights (not required)
    step.forEach(function (step) {
        var v = 100 + Math.floor(Math.random() * window.innerHeight / 4);
        step.style.padding = v + 'px 0px';
    });

    // 1. setup the scroller with the bare-bones options
    // 		this will also initialize trigger observations
    // 2. bind scrollama event handlers (this can be chained like below)
    scroller.setup({
        step: '#demoscroll article .step',
        // debug: true,
        offset: 0.9
    })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit);

    // 3. setup resize event
    window.addEventListener('resize', scroller.resize);
}


/*-------------*/

    
    Laro.register('JxHome', function (La) {
        var pkg = this;
        
        this.initStage = function () {
            var canvas = document.getElementById('maincanvas');
            canvas.width = window.innerWidth; //屏幕尺寸
            canvas.height = window.innerHeight;
            
            this.canvas = canvas;
            this.stage = new CVS.$stage(canvas);
            this.ctx = this.stage.ctx;
            this.vpx = canvas.width/2;
            this.vpy = canvas.height/2;
            this.normalN = 300; //噪点
            this.normalBalls = [];
            this.angleX = 0.001;
            this.angleY = 0.001;
            
            this.zstep = 1;
            this.zflag = 1;
        }
        
        this.range = function (a, b) {
            return Math.floor(Math.random()*(b-a) + a);
        }
        
        this.tween = function (ball, t) {
            if (!ball.end) {
                var _x = ball.xpos, _y = ball.ypos, _z = ball.zpos;
                var _t = (+new Date) - ball.startAnimTime;
                // var _t = 1
                    ball.xpos = ball.f_xpos + (ball.t_xpos - ball.f_xpos)*Math.sin(Math.PI*_t/(2*t));
                    ball.ypos = ball.f_ypos + (ball.t_ypos - ball.f_ypos)*Math.sin(Math.PI*_t/(2*t));
                    ball.zpos = ball.f_zpos + (ball.t_zpos - ball.f_zpos)*Math.sin(Math.PI*_t/(2*t));
    
                 if (_t >= t) {
                    ball.end = true;
                    //stage.removeChild(ball);
                }
            }
        }
        
        this.addNormalBalls = function (n) {
            var vpx = this.vpx, vpy = this.vpy, range = this.range, stage = this.stage,
                _this = this;
            if (n) {
                this.normalN = n;
            }
            for (var i=0; i< this.normalN; i++) {
    
                var ball = CVS.createPoint3D(this.stage.ctx, function () {
                    var color = 'rgb('+range(0, 256)+', '+range(0, 256)+', '+range(0, 256)+')';
                    //var a = Math.PI * 2 * Math.random();
                    //var b = Math.PI * 2 * Math.random();
                    //var r = range(vpx, vpy);
    
                    //this.xpos = Math.sin(a) * Math.sin(b) * r;
                    //this.ypos = Math.cos(a) * Math.sin(b) * r;
                    //this.zpos = Math.cos(b) * r;
                    this.xpos = range(-vpx, vpx);
                    this.ypos = range(-vpy, vpy);
                    this.zpos = range(-vpx, vpx);
    
                    this.width = range(8, 15);
                    this.w = this.width;
                    this.draw = function () {
                        this.ctx.beginPath();
                        this.ctx.arc(0, 0, this.width/2, 0, Math.PI*2, true);
                        this.ctx.closePath();
                        this.ctx.fillStyle = color;
                        this.ctx.fill();
                    }
                });
                ball.type = 'normal';
                ball.setVanishPoint(vpx, vpy);
                ball.setCenterPoint(0, 0, 0);
                stage.addChild(ball);
                this.normalBalls.push(ball);
            }
        }
        
        this.updateBalls = function (dt, name) {
            var balls = this.particleHash[name];
            for (var i = 0; i < balls.length; i ++) {
                var ball = balls[i];
                
                ball.zpos += JxHome.zstep;
    
                ball.rotateX(this.angleX);
                ball.rotateY(this.angleY);
                var scale = ball.getScale(),
                    pos = ball.getScreenXY();
                ball.width = Math.max(10*scale, 2);
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
                ball.width = ball.logoPos.width;
                ball.color = 'rgb('+ball.logoPos.r+', '+ball.logoPos.g+', '+ball.logoPos.b+')';
                ball.startAnimTime = (+ new Date);
                
            }
        }
        
        this.bindStage = function () {
            var _this = this;
            this.stage.addEventListener('mousemove', function (x, y) {
                _this.angleY = (x - _this.vpx) * .00001;
                _this.angleX = (y - _this.vpy) * .00001;
            })
        }
        
        this.initParticles = function () {
            this.qqParticles = this.getParticles('qq', 100, 100);
            this.jxParticles = this.getParticles('jx', 100, 100);
            this.qplusParticles = this.getParticles('qplus', 100, 100, 130);
            this.atParticles = this.getParticles('at', 50, 50, 100);
            
            this.particleHash = {
                'normal': this.normalBalls,
                'qq': this.qqParticles,
                'jx': this.jxParticles,
                'qplus': this.qplusParticles,
                'at': this.atParticles
            }
        }
        this.getParticles = function (id, w, h, z) {
            // var step = 4
            z = 0
            // if (z == undefined) { z = 0; }
            var image = document.getElementById(id);
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.drawImage(image, 0, 0, w, h, this.canvas.width/2-w/4, this.canvas.height/2-h/4, w/2, h/2);
            
            var imageData = this.ctx.getImageData(this.canvas.width/2-w/4, this.canvas.height/2-h/4, w/2, h/2);
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
            // this.bindStage();
            // this.initParticles();
            this.addNormalBalls();
            
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
                //var color = 'rgb('+r+', '+g+', '+b+')';
                
                /*  this.xpos = range(-10*vpx, 10*vpx);
                    this.ypos = range(-10*vpy, 10*vpy);
                    this.zpos = 10*vpx;
                    */
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
                x: (x-w/4)*20,
                y: (y-h/4)*20,
                z: 0,
                width: 10,
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
            
            // ball.moveX = 1 - Math.random()*2;
            //stage.addChild(ball);
            
            return ball;
        }
    });
    
    //图的变化
    Laro.register('JxHome.$states', function (La) {
        var pkg = this;
        
        this.No = La.BaseState.extend(function () {
        //这个不要
        }).methods({
            enter: function (msg, fromState) {
                JxHome.initParticles();   //粒子重新归位
                this._t = 0;
                JxHome.addNormalBalls();  //添加噪声
                // 最后一页回来的时候
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type == 'at') {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
            },
            leave: function () {
            
            },
            update: function (dt) {
                this._t += dt;
                JxHome.updateBalls(dt, 'normal'); //一定要保留，更新粒子位置
            },
            transition: function () {
                if (this._t > 5) {
                 // if (view_index == 0) { 
                    this.host.setState(1);  //状态转换，这是是根据时间触发，_t是时间
                } 
            },
            draw: function () {
                
            }
        });
        
        this.QQ = La.BaseState.extend(function () {
        
        }).methods({
            enter: function (msg, fromState) {
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('qq'); //带有图片本来颜色
                //只保留形状
                // for (var i = 0; i < JxHome.qqParticles.length; i ++) {
                //  var ball = JxHome.qqParticles[i];
                //  JxHome.stage.addChild(ball);
                //  ball.end = false;
                //  ball.width = ball.logoPos.width;
                //  ball.startAnimTime = (+ new Date);
                    
                // }
                this._t = 0;  //初始化时间
                this.explosion = false;
                // 清理上一次的粒子
                var ball_type = 'at'
    
                if (pre_index == 2){
                    ball_type = 'jx'
                }
                if (pre_index == 4){
                    ball_type = 'at'
                }
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type == ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false
            },
            leave: function () {
                // for (var i = 0; i < JxHome.stage.children.length; i ++) {
                //  var ball = JxHome.stage.children[i];
                //  if (ball.type == 'normal') {
                //      JxHome.stage.children.splice(i, 1);
                //      i --;
                //  }
                // }
            },
            update: function (dt) {
                this._t += dt;
                // JxHome.updateBalls(dt, 'normal');
                
                for (var i = 0; i < JxHome.qqParticles.length; i ++) {
                    var ball = (JxHome.qqParticles[i]);
    
                    JxHome.tween(ball, 1000);
                    ball.zpos += JxHome.zstep;
                    
                    ball.rotateX(JxHome.angleX);
                    ball.rotateY(JxHome.angleY);
                    var scale = ball.getScale(),
                    pos = ball.getScreenXY();
                    
                    ball.width = Math.max(10*scale, 2);
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
            },
            transition: function () {
                // console.log('3',view_index);
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                // if (this._t > 5 && !this.explosion) {
                   if (curr_index != 1 && !this.explosion) {
                    for (var i = 0; i < JxHome.qqParticles.length; i ++) {
                        var ball = JxHome.qqParticles[i];
    
                        ball.f_xpos = ball.xpos;
                        ball.f_ypos = ball.ypos;
                        ball.f_zpos = ball.zpos;
                        ball.t_xpos = range(-vpx, vpx);
                        ball.t_ypos = range(-vpy, vpy);
                        ball.t_zpos = range(-vpx, vpx);
                        
                        ball.end = false;
                        ball.width = range(8, 15);
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= 1000) {
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
                //console.log('jx')
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('jx');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 'qq'
    
                if (pre_index == 3){
                    ball_type = 'qplus'
                }
                if (pre_index == 1){
                    ball_type = 'qq'
                }
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type == ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false
            },
            leave: function () {
                // for (var i = 0; i < JxHome.stage.children.length; i ++) {
                //  var ball = JxHome.stage.children[i];
                //  if (ball.type == 'qq') {
                //      JxHome.stage.children.splice(i, 1);
                //      i --;
                //  }
                // }
            },
            update: function (dt) {
                this._t += dt;
                //JxHome.updateBalls(dt, 'qq');
                // _t > n, 更新粒子时间点，pushBalls就是把新的点增加到画布
                // if (this._t > 0 && !this.push) {  
                //  JxHome.pushBalls('jx');
                //  this.push = true;
                // }
                // if (this.push) {
                    for (var i = 0; i < JxHome.jxParticles.length; i ++) {
                        var ball = (JxHome.jxParticles[i]);
    
                        JxHome.tween(ball, 1000);
                        ball.zpos += JxHome.zstep;
                        
                        ball.rotateX(JxHome.angleX);
                        ball.rotateY(JxHome.angleY);
                        var scale = ball.getScale(),
                        pos = ball.getScreenXY();
                        
                        ball.width = Math.max(10*scale, 2);
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
                        ball.width = range(8, 15);
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= 1000) {
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
                
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('qplus');
                this._t = 0;
                this.explosion = false;
                var ball_type = 'jx'
                if (pre_index == 4){
                    ball_type = 'at'
                }
                if (pre_index == 2){
                    ball_type = 'jx'
                }
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type == ball_type) {
                        JxHome.stage.children.splice(i, 1);
                        i --;
                    }
                }
                on_running = false
            },
            leave: function () {
                // for (var i = 0; i < JxHome.stage.children.length; i ++) {
                //  var ball = JxHome.stage.children[i];
                //  if (ball.type == 'jx') {
                //      JxHome.stage.children.splice(i, 1);
                //      i --;
                //  }
                // }
            },
            update: function (dt) {
                this._t += dt;
                //JxHome.updateBalls(dt, 'jx');
                
                // if (this._t > 0 && !this.push) {
                //  JxHome.pushBalls('qplus');
                //  this.push = true;
                // }
                
                // if (this.push) {
                for (var i = 0; i < JxHome.qplusParticles.length; i ++) {
                    var ball = (JxHome.qplusParticles[i]);
    
                    JxHome.tween(ball, 1000);
                    ball.zpos += JxHome.zstep;
                    
                    ball.rotateX(JxHome.angleX);
                    ball.rotateY(JxHome.angleY);
                    var scale = ball.getScale(),
                    pos = ball.getScreenXY();
                    
                    ball.width = Math.max(10*scale, 2);
                    ball.x = pos.x;
                    ball.y = pos.y;
                }
                // }
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
                        ball.width = range(8, 15);
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= 1000) {
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
                JxHome.initParticles();   //粒子重新归位
                JxHome.pushBalls('at');
                // this.push = false;
                this._t = 0;
                this.explosion = false;
                var ball_type = 'qplus'
                if (pre_index == 1){
                    ball_type = 'qq'
                } 
                if (pre_index == 3){
                    ball_type = 'qplus'
                } 
                for (var i = 0; i < JxHome.stage.children.length; i ++) {
                    var ball = JxHome.stage.children[i];
                    if (ball.type == ball_type) {
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
                // JxHome.updateBalls(dt, 'qplus');
                
                // if (this._t > 0 && !this.push) {
                //  JxHome.pushBalls('at');
                //  this.push = true;
                // }
                
                // if (this.push) {
                    for (var i = 0; i < JxHome.atParticles.length; i ++) {
                        var ball = (JxHome.atParticles[i]);
    
                        JxHome.tween(ball, 1000);
                        ball.zpos += JxHome.zstep;
                        
                        ball.rotateX(JxHome.angleX);
                        ball.rotateY(JxHome.angleY);
                        var scale = ball.getScale(),
                        pos = ball.getScreenXY();
                        
                        ball.width = Math.max(10*scale, 2);
                        ball.x = pos.x;
                        ball.y = pos.y;
                    }
                // }
                this.checkExplosion();
            },
            checkExplosion: function () {
                var range = JxHome.range,
                    vpx = JxHome.vpx,
                    vpy = JxHome.vpy;
                //画面停留时间
                // if (this._t > 5 && !this.explosion) {
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
                        ball.width = range(8, 15);
                        ball.startAnimTime = (+ new Date);
                    }
                    this.explosion = true;
                    this.explosionT = (+new Date);
                }
                if (this.explosion && (+new Date) - this.explosionT >= 1000) {
                    if (curr_index == 1){
                        this.host.setState(1);  
                    }
                    if (curr_index == 3){
                        this.host.setState(3);  
                    }
                    
                }
            },
    
            transition: function () {
                // if (view_index == 4) {
                // if (this._t > 6 && !this.tryJump) {
                    //window.location.href = 'home_nocanvas.html';
                    // this.tryJump = true;
                //  this.host.setState(1);
                // }
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
                0, JxHome.$states.No,
                1, JxHome.$states.QQ,
                2, JxHome.$states.Jx,
                3, JxHome.$states.QPlus,
                4, JxHome.$states.AT
            ];
        }
        
        this.setState = function (state, msg, suspendCurrent) {
            this.$.setState(state, msg, suspendCurrent);
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
            // if (JxHome.zstep > 2 || JxHome.zstep < -2) {
            //  JxHome.zflag *= -1;
            // }
            // JxHome.zstep += JxHome.zflag*0.01;
            //JxHome.updateNormalBalls(dt);
        }
        this.draw = function () {
            JxHome.ctx.clearRect(0, 0, JxHome.canvas.width, JxHome.canvas.height);
            JxHome.stage.render();
            JxHome.$fsm.$.draw();
        }
    });