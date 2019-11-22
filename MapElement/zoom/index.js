export function zoom() {
    const svgImage = document.getElementById("map");
    const svgContainer = document.getElementById("svgContainer");
    const groupPath = document.getElementById('groupPath')

    let viewBox = {
        x: 0,
        y: 0,
        w: svgImage.getAttribute("width"),
        h: svgImage.getAttribute("height")
    };
    svgImage.setAttribute(
        'viewBox',
        `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
    );
    const svgSize = {
        w: svgImage.getAttribute("width"),
        h: svgImage.getAttribute("height")
    };
    let isPanning = false;
    let startPoint = {
        x: 0,
        y: 0
    };
    let endPoint = {
        x: 0,
        y: 0
    };;
    let scale = 1;

    svgContainer.onmousewheel = function (e) {
        e.preventDefault();

        
        let w = viewBox.w;
        let h = viewBox.h;
        let mx = e.x; //mouse x
        let my = e.y;
        let dw = w * Math.sign(e.deltaY) * 0.05;
        let dh = h * Math.sign(e.deltaY) * 0.05;
        let dx = dw * mx / svgSize.w;
        let dy = dh * my / svgSize.h;
        viewBox = {
            x: viewBox.x + dx,
            y: viewBox.y + dy,
            w: viewBox.w - dw,
            h: viewBox.h - dh
        };
        scale = svgSize.w / viewBox.w;
        zoomValue.innerText = `${Math.round(scale * 100) / 100}`;
        svgImage.setAttribute(
            'viewBox',
            `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
        );
    }

    svgContainer.onmousedown = function (e) {

        let groupPath = document.getElementById('groupCountry');
        groupPath = groupPath.getBoundingClientRect();

        isPanning = true;
        startPoint = {
            x: e.x,
            y: e.y,
        };
    }

    svgContainer.addEventListener('mousemove', mouseMoveMap, false)
    
    
    function mouseMoveMap (e) {
        let groupPath = document.getElementById('groupCountry');
        groupPath = groupPath.getBoundingClientRect();

        // console.log(groupPath)
       // console.log(e)
        

        if(groupPath.left < 50 || groupPath.top < 100 || groupPath.right < 50 || groupPath.bottom < 100){
            
            isPanning = false;
            svgImage.setAttribute(
                'viewBox',
                `60 101 ${viewBox.w} ${viewBox.h}`
            );
          
        }

        if (isPanning) {
    
    
            endPoint = {
                x: e.x,
                y: e.y
            };
            let dx = (startPoint.x - endPoint.x) / scale;
            let dy = (startPoint.y - endPoint.y) / scale;

            
            
       
            let movedViewBox = {
                x: viewBox.x + dx,
                y: viewBox.y + dy,
                w: viewBox.w,
                h: viewBox.h
            };
            let el = e.path[1].getBoundingClientRect();
            // console.log(el)
            if(el.x+el.width<window.innerWidth){
                svgImage.setAttribute(
                    'viewBox',
                    `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
                );
            }

            if(el.y+el.height<window.innerHeight){
                svgImage.setAttribute(
                    'viewBox',
                    `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
                );
            }

            
        }
        
    }

    svgContainer.onmouseup = function (e) {
        if (isPanning) {
            endPoint = {
                x: e.x,
                y: e.y
            };
            let dx = (startPoint.x - endPoint.x) / scale;
            let dy = (startPoint.y - endPoint.y) / scale;
            viewBox = {
                x: viewBox.x + dx,
                y: viewBox.y + dy,
                w: viewBox.w,
                h: viewBox.h
            };
            svgImage.setAttribute(
                'viewBox',
                `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
            );
            isPanning = false;
        }
    }

    svgContainer.onmouseleave = function (e) {
        isPanning = false;
    }
}
