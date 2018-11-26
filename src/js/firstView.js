
export  default  function () {
    const pointNode=document.querySelectorAll('.home_points li');
    const carouselNode = document.querySelectorAll('.home_carousel li');
    const homeNode = document.querySelector('.home');

    let nowindex=0;
    let lastindex=0;
    let nowtime=0;
    let lasttime=0;
    let timer = null;

    for (let i = 0; i < pointNode.length ; i++) {
        pointNode[i].onclick = function () {

            nowtime = Date.now();
            if(nowtime - lasttime < 2000) return;
            nowindex=i;
            //如果点击同一个
            if(nowindex === lastindex) return;
            //点击右边的
            if(nowindex > lastindex){
                carouselNode[nowindex].className = 'common-title rightShow';
                carouselNode[lastindex].className = 'common-title leftHide';
            }else {
                //点击左边的
                carouselNode[nowindex].className = 'common-title leftShow';
                carouselNode[lastindex].className = 'common-title rightHide';
            }

            //更新小圆点
            pointNode[lastindex].className = '';
            pointNode[nowindex].className = 'active';


            lastindex = nowindex;
            lasttime = nowtime;
        }
    }
    autoMove();
    function autoMove () {
       timer = setInterval(() => {
            nowindex++;
            //边缘判断
            if(nowindex === 4) nowindex = 0;
            //轮播
            carouselNode[nowindex].className = 'common-title rightShow';
            carouselNode[lastindex].className = 'common-title leftHide';
            //更新小圆点
            pointNode[lastindex].className = '';
            pointNode[nowindex].className = 'active';
            lastindex = nowindex;
        },3000)

    }

    homeNode.onmouseenter = function () {
        //清除轮播
        clearInterval(timer);
    }
    homeNode.onmouseleave = autoMove;


}