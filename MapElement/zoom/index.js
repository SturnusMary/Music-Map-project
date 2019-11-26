export function zoom() {
    const svgImage = document.getElementById("map");
    const svgContainer = document.getElementById("svgContainer");
    const groupPath = document.getElementById('groupCountry');
    let move = false;
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
    };
    let scale = 1;

    svgContainer.addEventListener('mousewheel', mouseWheel, false)
    svgContainer.addEventListener('mousedown', mouseDown, false);
    svgContainer.addEventListener('mouseup', mouseUp, false);
    svgContainer.addEventListener('mouseleave', mouseLeave, false);

    function mouseWheel(e) {
        e.preventDefault();

        let w = viewBox.w;
        let h = viewBox.h;
        let mx = e.x; //mouse x
        let my = e.y;

        if (scale >= 1) {
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

        } else {
            viewBox = {
                x: 0,
                y: 0,
                w: 1920,
                h: 764
            };
        }
        scale = svgSize.w / viewBox.w;
        zoomValue.innerText = `${Math.round(scale * 100) / 100}`;
        svgImage.setAttribute(
            'viewBox',
            `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`
        );

    }

    function mouseDown(e) {

        isPanning = true;
        startPoint = {
            x: e.x,
            y: e.y
        };

        svgContainer.addEventListener('mousemove', mouseMoveMap, false)
    }

    function mouseMoveMap(e) {
        let groupPathBox = groupPath.getBoundingClientRect();
        let svgImageBox = svgImage.getBoundingClientRect();

        let limits = {
            left: 50,
            top: 50,
            right: svgImageBox.width - groupPathBox.width,
            bottom: svgImageBox.height / 2 + 50,
            scale: 5
        }

        if (isPanning) {
            endPoint = {
                x: e.x,
                y: e.y
            };
            let dx = 0;
            let dy = 0;
            let movedViewBox;

            if (scale <= 1) {
                if (limits.left > groupPathBox.x) {
                    isPanning = false;
                } else if (limits.right < groupPathBox.x) {
                    isPanning = false;
                } else if (limits.top > groupPathBox.y) {
                    isPanning = false;
                } else if (limits.bottom < groupPathBox.y) {
                    isPanning = false;
                } else {
                    isPanning = true;
                    dx = (startPoint.x - endPoint.x) / scale;
                    dy = (startPoint.y - endPoint.y) / scale;
                }
            } else {
                dx = (startPoint.x - endPoint.x) / scale;
                dy = (startPoint.y - endPoint.y) / scale;
            }

            movedViewBox = {
                x: viewBox.x + dx,
                y: viewBox.y + dy,
                w: viewBox.w,
                h: viewBox.h
            };

            svgImage.setAttribute(
                'viewBox',
                `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`
            );
        }

    }

    function mouseUp(e) {
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

            svgContainer.removeEventListener('mousemove', mouseMoveMap)
            isPanning = false;
        }
    }

    function mouseLeave(e) {
        isPanning = false;
    }
}