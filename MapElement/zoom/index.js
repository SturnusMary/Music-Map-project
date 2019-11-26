export function zoom() {
    const svgGroupImage = document.getElementById("groupCountry");
    const svgContainer = document.getElementById("svgContainer");
    let position = {
        x: 400,
        y: 300,
        w: 1009,
        h: 665,
        scale: 1,
    };

    svgGroupImage.setAttribute(
        'transform',
        `translate(${position.x},${position.y})`
    );

    let isPanning = false;
    let startPoint = {
        x: 0,
        y: 0
    };
    let endPoint = {
        x: 0,
        y: 0
    };

    svgContainer.addEventListener('mousewheel', mouseWheel, false)
    svgContainer.addEventListener('mousedown', mouseDown, false);
    svgContainer.addEventListener('mouseup', mouseUp, false);
    svgContainer.addEventListener('mouseleave', mouseLeave, false);

    function mouseDown(e) {
        isPanning = true;
        startPoint = {
            x: e.x,
            y: e.y
        };

        svgContainer.addEventListener('mousemove', mouseMoveMap, false)
    }

    function setTransform(pos) {
        svgGroupImage.setAttribute(
            'transform',
            `translate(${pos.x + pos.w / 2}, ${pos.y + pos.h / 2}) scale(${pos.scale}) translate(${-pos.w / 2}, ${-pos.h / 2})`
        );
    }

    function mouseWheel(e) {
        e.preventDefault();

        let scale = position.scale + Math.sign(e.deltaY) * 0.05;

        if (scale < 1) {
            scale = 1;
        }

        if (scale > 2) {
            scale = 2;
        }

        position.scale = scale;

        zoomValue.innerText = `${Math.round(scale * 100) / 100}`;
        setTransform(position);

    }

    function getNextCoords() {
        const scale = position.scale;
        const dx = (startPoint.x - endPoint.x) / scale;
        const dy = (startPoint.y - endPoint.y) / scale;
        let nx = position.x - dx;
        let ny = position.y - dy;

        if (scale < 764 / position.h) {
            if (ny < 0) {
                ny = 0;
            }
            if (ny + position.h > 764) {
                ny = 764 - position.h;
            }
        } else {
            if (ny + position.h < 764) {
                ny = 764 - position.h;
            }
            if (ny > 0) {
                ny = 0;
            }
        }

        if (scale < 1920 / position.w) {
            if (nx < 0) {
                nx = 0;
            }
            if (nx + position.w * scale > 1920) {
                nx = 1920 - position.w;
            }
        } else {
            if (nx + position.w * scale > 1920) {
                nx = 1920 - position.w * scale;
            }
            if (nx > 0) {
                nx = 0;
            }
        }

        return {
            x: nx,
            y: ny,
        };
    }

    function mouseMoveMap(e) {
        if (isPanning) {
            endPoint = { x: e.x, y: e.y };

            const { x, y } = getNextCoords();

            setTransform({
                ...position,
                x,
                y,
            });
        }

    }

    function mouseUp(e) {
        if (isPanning) {
            endPoint = {
                x: e.x,
                y: e.y
            };
            const { x, y } = getNextCoords();
            
            position.x = x;
            position.y = y;

            svgContainer.removeEventListener('mousemove', mouseMoveMap)
            isPanning = false;
        }
    }

    function mouseLeave(e) {
        isPanning = false;
    }
}