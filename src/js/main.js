    export default function () {

    //获取dom
    const navLiNodes = document.querySelectorAll('.nav li');
    const arrowNode = document.querySelector('.arrow');
    const ulNode=document.querySelector('#content>ul');
    const content=document.getElementById('content');

    //变量的缓存优化
    let contentHeight=content.offsetHeight;

    let nowindex=0;
    let timer=null;


    //小三角初始化位置
    arrowNode.style.left=navLiNodes[0].getBoundingClientRect().left+navLiNodes[0].offsetWidth/2-arrowNode.offsetWidth/2+'px';
    //绑定点击头部事件
            for (let i = 0; i < navLiNodes.length; i++) {
                navLiNodes[i].onclick = function () {
                    nowindex=i;
                    move(nowindex);
                };
            }

    //实时更新屏幕变化造成的影响
    window.onresize=function(){
        arrowNode.style.left=navLiNodes[nowindex].getBoundingClientRect().left+navLiNodes[nowindex].offsetWidth/2-arrowNode.offsetWidth/2+'px';
        contentHeight=content.offsetHeight;
        ulNode.style.top = -nowindex*contentHeight + 'px';
    }

    //绑定滚轮事件
    //ie/chrome
    document.onmousewheel = wheel;
    //firefox
    document.addEventListener && document.addEventListener('DOMMouseScroll', wheel);
            function wheel(event) {
                event = event || window.event;

                //函数反斗
                clearTimeout(timer);
                timer=setTimeout(() => {
                    var flag = '';
                    if (event.wheelDelta) {
                        //ie/chrome
                        if (event.wheelDelta > 0) {
                            flag = 'up';
                        } else {
                            flag = 'down'
                        }
                    } else if (event.detail) {
                        //firefox
                        if (event.detail < 0) {
                            flag = 'up';
                        } else {
                            flag = 'down'
                        }
                    }

                    switch (flag) {
                        case 'up' :
                            nowindex--;
                            if(nowindex <= 0){
                                nowindex = 0;
                            }
                            move(nowindex);
                            break;
                        case 'down' :
                            nowindex++;
                            if(nowindex >= 4){
                                nowindex = 4;
                            }
                            move(nowindex);
                            break;
                    }
                },200);

                //禁止默认行为
                event.preventDefault && event.preventDefault();
                return false;
            }


    //把所有因为index改变所造成的集合在一起
             function move(nowindex) {
                    //将所有的class清空
                    for (var j = 0; j < navLiNodes.length; j++) {
                        navLiNodes[j].className = '';
                    }
                    //将当前点击的元素添加active class  navli样式
                    navLiNodes[nowindex].className = 'active';
                    //小三角位置
                    arrowNode.style.left=navLiNodes[nowindex].getBoundingClientRect().left+navLiNodes[nowindex].offsetWidth/2-arrowNode.offsetWidth/2+'px';
                    //页面滚动
                    ulNode.style.top = -nowindex*contentHeight + 'px';
                }
}

