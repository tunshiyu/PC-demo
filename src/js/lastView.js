
export  default  function () {

    const ulNode=document.querySelector('.team-bubble');
    const lis=document.querySelectorAll('.team-bubble li');

    const width= lis[0].offsetWidth;
    const height= lis[0].offsetHeight;

    let canvas = null;
    let createTimer = null;
    let runTimer = null;

    //    鼠标移入，透明度处理
    for (let i = 0; i < lis.length; i++) {
        lis[i].onmouseenter = function () {
            for (let j = 0; j < lis.length; j++) {
                lis[j].style.opacity = 1;
            }
            this.style.opacity = 0.6;

        //    生成画布
            getCanvas(i);
        }
    }

    ulNode.onmouseleave = function () {
        for (let j = 0; j < lis.length; j++) {
            lis[j].style.opacity = 1;
        }

    //    清除canvas
        canvas.remove();
        canvas = null;
    //    清除定时器
        clearInterval(createTimer);
        clearInterval(runTimer);

    };



//    方法

    function  getCanvas(i) {
        if(!canvas){
            canvas=document.createElement('canvas');
            canvas.style.position = 'absolute';
            canvas.width = width;
            canvas.height = height;
            canvas.style.left = i * canvas.width + 'px';
            bubble();
            ulNode.appendChild(canvas);
        }else{
            canvas.style.left = i * canvas.width + 'px';
        }

    }
    
    function bubble() {
        let circleArr = [];

        //生成随机圆
         createTimer = setInterval(() => {
            //颜色随机
            const r = Math.round(Math.random() * 255);
            const g = Math.round(Math.random() * 255);
            const b = Math.round(Math.random() * 255);
            //半径随机
            const circle_r = Math.round(Math.random() * 8 + 2);
            //位置随机
            const x = Math.round(Math.random() * width);
            const y = height + circle_r;
            //初始化弧度
            const rad = 0;
            //缩放系数
            const s = Math.round(Math.random() * 50 + 20);

            circleArr.push({
                r,
                g,
                b,
                circle_r,
                x,
                y,
                rad,
                s
            })
        }, 40);

        //画圆
           runTimer = setInterval(() => {
            if (canvas.getContext) {
                //获取画笔
                const ctx = canvas.getContext('2d');
                //在画之前，清除上一次画布
                ctx.clearRect(0, 0, width, height);
                //开始画圆
                circleArr.forEach(item => {
                    //每次弧度递增, 速度
                    item.rad += 0.1;

                    //item.s决定摆动幅度

                    const y = Math.round(item.y - item.rad * item.s);
                    const x = Math.round(item.x - Math.sin(item.rad) * item.s);

                    //设置颜色
                    ctx.fillStyle = `rgb(${item.r}, ${item.g}, ${item.b})`;

                    ctx.beginPath();

                    ctx.arc(x, y, item.circle_r, 0, 2 * Math.PI);

                    ctx.fill();

                })
            }
        }, 1000 / 60)
    }
}