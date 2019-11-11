

export default function sideBarAnim () {


let sideBarCont = document.getElementById('sidebar-content');
let pathID = document.getElementById('path');
let diffX = 0;
let curX = 0;
let finalX = 0;
let frame = 1000 / 60;
let animTime = 600;
let sContTrans = 200;
let animating = false;
let startD = createD(50, 0, 1);
let midD = createD(125, 75, 0);
let finalD = createD(200, 0, 1);
let clickMidD = createD(300, 80, 0);
let clickMidDRev = createD(200, 100, 1);
let clickD = createD(300, 0, 1);
let currentPath = startD;
let easings = {
    smallElastic: function (t, b, c, d) {
        let ts = (t /= d) * t;
        let tc = ts * t;
        return b + c * (33 * tc * ts + -106 * ts * ts + 126 * tc + -67 * ts + 15 * t);
    },
    inCubic: function (t, b, c, d) {
        let tc = (t /= d) * t * t;
        return b + c * tc;
    }
};
const _events = {
    mousemove: [],
    touchmove: [],
};


function createD(top, ax, dir) {
    return 'M0,0 ' + top + ',0 a' + ax + ',250 0 1,' + dir + ' 0,500 L0,500';
}


function newD(num1, num2) {
    let d = path.getAttribute('d');
    num2 = num2 || 250;
    let nd = d.replace(/\ba(\d+),(\d+)\b/gi, 'a' + num1 + ',' + num2);
    return nd;
}

function animatePathD(pathID, d, time, handlers, callback, easingTop, easingX) {
    let steps = Math.floor(time / frame);
    let curStep = 0;
    let oldArr = currentPath.split(' ');
    let newArr = d.split(' ');
    let oldTop = +oldArr[1].split(',')[0];
    let topDiff = +newArr[1].split(',')[0] - oldTop;
    let nextTop;
    let nextX;
    let move;
    easingTop = easings[easingTop] || easings.smallElastic;
    easingX = easings[easingX] || easingTop;

    pathID.removeEventListener('mouseup', handlers1);
    pathID.removeEventListener('mousedown', handlers1);
    

    function animate() {
        curStep++;
        nextTop = easingTop(curStep, oldTop, topDiff, steps);
        nextX = easingX(curStep, curX, finalX - curX, steps);
        oldArr[1] = nextTop + ',0';
        oldArr[2] = 'a' + Math.abs(nextX) + ',250';
        oldArr[4] = nextX >= 0
            ? '1,1'
            : '1,0';

        path.setAttribute('d', oldArr.join(' '));

        if (curStep > steps) {
            curX = 0;
            diffX = 0;
            path.setAttribute('d', d);
            currentPath = d;
            if (handlers) 
                handlers1();
            if (callback) 
                callback();
            return;
        }
        requestAnimationFrame(animate);
    }
    animate();
}

function handlers1() {
    let startX;

    let mouseDownlistener = function (e) {
        startX = typeof e.pageX === 'number'
         ? e.pageX
         : e.touches[0].pageX 
         pathID.addEventListener('mousemove',Movelistener )
    }

    let Movelistener = function (e) {
        console.log(e.type)
        let x = typeof e.pageX === 'number'
        ? e.pageX
        : e.touches[0].pageX
        diffX = x - startX;
        if (diffX < 0) 
            diffX = 0;
        if (diffX > 300) 
            diffX = 300;
        curX = Math.floor(diffX / 2);
        pathID.setAttribute('d', newD(curX))
}

pathID.addEventListener('mousedown', mouseDownlistener)


document.addEventListener('mouseup', function (e){
    if (animating) 
            return;
        if (!diffX) 
            return;
        if (diffX < 40) {
            animatePathD(pathID, newD(0), animTime, true);
        } else {
            animatePathD(pathID, finalD, animTime, false, function () {
                sideBarCont.classList.add('sidebar-content--active');
                setTimeout(function () {
                    document.addEventListener('click', closeSidebar);
                }, sContTrans);
            });
        }
        pathID.removeEventListener('mousemove', Movelistener);
})



    delegate(document, ['touchstart'], '#path', true, function (e) {
        let startX = typeof e.pageX === 'number'
         ? e.pageX
         : e.touches[0].pageX
         delegate(document, ['touchmove'], '#path', true, function (e) {
            let x = typeof e.pageX === 'number'
            ? e.pageX
            : e.touches[0].pageX
             diffX = x - startX;
            if (diffX < 0) 
                diffX = 0;
            if (diffX > 300) 
                diffX = 300;
            curX = Math.floor(diffX / 2);
            pathID.setAttribute('d', newD(curX));
        })
    })

    delegate(document, ['touchend'], '#path', true, function (e) {
        delegate(document, ['touchmove'], '', false)
        if (animating) 
            return;
        if (!diffX) 
            return;
        if (diffX < 40) {
            animatePathD(pathID, newD(0), animTime, true);
        } else {
            animatePathD(pathID, finalD, animTime, false, function () {
                sideBarCont.classList.add('sidebar-content--active');
                setTimeout(function () {
                    document.addEventListener('click', closeSidebar);
                }, sContTrans);
            });
        }
    })
}
handlers1();

function closeSidebar(e) {
    if (e.target.closest('.sidebar-content')) 
        return;
    if (animating) 
        return;
    animating = true;
    sideBarCont
        .classList
        .remove('sidebar-content--active');
    finalX = -75;
    setTimeout(function () {
        animatePathD(pathID, midD, animTime / 3, false, function () {
            finalX = 0;
            curX = -75;
            animatePathD(pathID, startD, animTime / 3 * 2, true);
            animating = false;
        }, 'inCubic');
    }, sContTrans);

    document.removeEventListener('click', closeSidebar, false)
}

function delegate(el, evt, sel, listener, handler) {
    for (let i = 0; i < evt.length; i++) {
        if (listener) {
            if (_events[evt[i]]) {
                _events[evt[i]].push(handler);
            }
            el.addEventListener(evt[i], function (event) {
                var t = event.target;
                if (sel) {
                    while (t && t !== this) {
                        if (t.matches(sel)) {
                            handler.call(t, event);
                        }
                        t = t.parentNode;
                    }
                } else {
                    handler.call(t, event);
                }
                
            });
        } else {
            const listeners = _events[evt[i]];
            if (listeners) {
                for (let j = 0; j < listeners.length; j += 1) {
                    el.removeEventListener(evt[i], listeners[j],listener);
                }
            }
        }
    }
}

}