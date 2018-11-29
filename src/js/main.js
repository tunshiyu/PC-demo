
import firstView from './firstView';


export default function () {

    //获取dom
    const navLiNodes = document.querySelectorAll('.nav li');
    const arrowNode = document.querySelector('.arrow');
    const ulNode=document.querySelector('#content>ul');
    const content=document.getElementById('content');
    const asideLiNodes = document.querySelectorAll('#asideNav li');
    const musicNode = document.querySelector('.music');
    const audioNode = document.querySelector('.music audio');

    const homeCarousel=document.querySelector('.home_carousel');
    const plane1= document.querySelector('.plane1');
    const plane2= document.querySelector('.plane2');
    const plane3= document.querySelector('.plane3');
    const pencel1= document.querySelector('.pencel1');
    const pencel2= document.querySelector('.pencel2');
    const pencel3= document.querySelector('.pencel3');
    const aboutLists= document.querySelectorAll('.about-lists');
    const teamTittle= document.querySelector('.team-tittle');
    const teamText= document.querySelector('.team-text');
    const openNode = document.querySelector('#open');
    const line = document.querySelector('#open .line');
    const up = document.querySelector('#open .up');
    const down = document.querySelector('#open .down');

    var imgArr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];

        //变量的缓存优化
        let contentHeight=content.offsetHeight;
        let imgLength = imgArr.length;
        let loadedImg = 0;


        let nowindex=0;
        let lastindex=0;
        let timer=null;

    //    出入场动画
        const animation = [
        {
            anIn () {
                homeCarousel.style.transform = 'translateY(0)';
                homeCarousel.style.opacity = 1;
            },
            anOut () {
                homeCarousel.style.transform = 'translateY(-200px)';
                homeCarousel.style.opacity = 0.2;
            }
        },
        {
            anIn () {
                plane1.style.transform = 'translate(0,0)';
                plane2.style.transform = 'translate(0,0)';
                plane3.style.transform = 'translate(0,0)';

            },
            anOut () {
                plane1.style.transform = 'translate(-100px,-100px)';
                plane2.style.transform = 'translate(-100px,100px)';
                plane3.style.transform = 'translate(100px,-100px)';
            }
        },
        {
            anIn () {
                pencel1.style.transform = 'translate(0,0)';
                pencel2.style.transform = 'translate(0,0)';
                pencel3.style.transform = 'translate(0,0)';

            },
            anOut () {
                pencel1.style.transform = 'translate(-100px,-100px)';
                pencel2.style.transform = 'translate(-100px,100px)';
                pencel3.style.transform = 'translate(100px,-100px)';
            }
        },
        {
            anIn () {
                aboutLists[0].style.transform = 'rotate(0)';
                aboutLists[1].style.transform = 'rotate(-0)';
            },
            anOut () {
                aboutLists[0].style.transform = 'rotate(30deg)';
                aboutLists[1].style.transform = 'rotate(-30deg)';
            }
        },
        {
            anIn () {
                teamTittle.style.transform = 'translateX(0)';
                teamText.style.transform = 'translateX(0)';
            },
            anOut () {
                teamTittle.style.transform = 'translateX(-100px)';
                teamText.style.transform = 'translateX(100px)';
            }
        },
    ];

        //初始化
         animation.forEach((item) => {
          item.anOut();
         });

        //开机动画
          open();
        function open() {
            imgArr.forEach((item) => {
                const img=new Image();
                img.onload = function () {
                    loadedImg++;
                    line.style.width = loadedImg/imgLength*100+'%';

                    if(loadedImg === imgLength){
                        up.style.height = 0;
                        down.style.height = 0;
                        line.style.display = 'none';
                        up.addEventListener('transitionend',() => {
                            //入场动画
                            animation[0].anIn();
                            openNode.remove();

                            //开启自动轮播
                            firstView();
                        })
                    }
                };
                img.src = `./images/${item}`;
            })

        };







        //音乐事件
        musicNode.onclick = function(){
            if(audioNode.paused){
                audioNode.play();
                 musicNode.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAIABAAB8Z////yH/C05FVFNDQVBFMi4wAwEAAAAh/wtYTVAgRGF0YVhNUDw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkI4M0ZGM0UzNEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkI4M0ZGM0U0NEU5NjExRTg5Nzc2QzhCNDhDNTcxM0VBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QjgzRkYzRTE0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QjgzRkYzRTI0RTk2MTFFODk3NzZDOEI0OEM1NzEzRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4B//79/Pv6+fj39vX08/Lx8O/u7ezr6uno5+bl5OPi4eDf3t3c29rZ2NfW1dTT0tHQz87NzMvKycjHxsXEw8LBwL++vby7urm4t7a1tLOysbCvrq2sq6qpqKempaSjoqGgn56dnJuamZiXlpWUk5KRkI+OjYyLiomIh4aFhIOCgYB/fn18e3p5eHd2dXRzcnFwb25tbGtqaWhnZmVkY2JhYF9eXVxbWllYV1ZVVFNSUVBPTk1MS0pJSEdGRURDQkFAPz49PDs6OTg3NjU0MzIxMC8uLSwrKikoJyYlJCMiISAfHh0cGxoZGBcWFRQTEhEQDw4NDAsKCQgHBgUEAwIBAAAh+QQJKAABACwAAAAADgAOAAACHoyPqasAjBw8ksm67rMPB6x9nTOKJlmG6JmSLKu2BQAh+QQJKAABACwAAAAADgAOAAACHoyPqcvtCMCKhyobKM7S6O6BHyRKY3Saaspx7PeqBQAh+QQFKAABACwAAAAADgAOAAACHYyPqcvtDxUAcC5rcKZaBwtO3PiNYYmK5KmmK1AAADs=")';
            }else {
                audioNode.pause();
                 musicNode.style.backgroundImage = 'url("data:image/gif;base64,R0lGODlhDgAOAJEAAAAAAP///wB8Z////yH5BAEAAAMALAAAAAAOAA4AAAIenI+pqyKMHDySybrusw8PrH2dM4omWYbomZIsq7YFADs=")';
            }
        };

        //小三角初始化位置
         arrowNode.style.left=navLiNodes[0].getBoundingClientRect().left+navLiNodes[0].offsetWidth/2-arrowNode.offsetWidth/2+'px';
        //绑定点击头部事件和侧边点击事件
            for (let i = 0; i < navLiNodes.length; i++) {
                asideLiNodes[i].onclick = function () {
                    nowindex=i;
                    move(nowindex);
                };
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
                                flag = 'down';
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
                        //将上一个的class清空
                       navLiNodes[lastindex].className = '';
                       asideLiNodes[lastindex].className = '';

                        //将当前点击的元素添加active class  navli样式
                        navLiNodes[nowindex].className = 'active';
                        asideLiNodes[nowindex].className = 'active';
                        //小三角位置
                        arrowNode.style.left=navLiNodes[nowindex].getBoundingClientRect().left+navLiNodes[nowindex].offsetWidth/2-arrowNode.offsetWidth/2+'px';
                        //页面滚动
                        ulNode.style.top = -nowindex*contentHeight + 'px';
                        //出入场动画
                       animation[lastindex].anOut();
                       animation[nowindex].anIn();



                        lastindex = nowindex;
                    }








}

