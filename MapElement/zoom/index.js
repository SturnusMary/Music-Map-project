export function zoom(){
const NF = 16, 
			NAV_MAP = {
				187: { dir:  1, act: 'zoom', name: 'in' } /* + */, 
                 61: { dir:  1, act: 'zoom', name: 'in' } /* + WTF, FF? */, 
                107: { dir:  1, act: 'zoom', name: 'in' } /* + WTF, FF? */,
				189: { dir: -1, act: 'zoom', name: 'out' } /* - */, 
                173: { dir: -1, act: 'zoom', name: 'out' } /* - WTF, FF? */, 
                109: { dir: -1, act: 'zoom', name: 'out' } /* - WTF, FF? */, 
				 37: { dir: -1, act: 'move', name: 'left', axis: 0 } /* ⇦ */, 
				 38: { dir: -1, act: 'move', name: 'up', axis: 1 } /* ⇧ */, 
				 39: { dir:  1, act: 'move', name: 'right', axis: 0 } /* ⇨ */, 
				 40: { dir:  1, act: 'move', name: 'down', axis: 1 } /* ⇩ */
			}, 
			_SVG = document.getElementById('map'), 
			VB = _SVG.getAttribute('viewBox').split(' ').map(c => +c), 
			DMAX = VB.slice(2), WMIN = 8, 
			_MSG = document.getElementById('msg');

let rID = null, f = 0, nav = {}, tg = Array(4);

function stopAni() {
  cancelAnimationFrame(rID);
  rID = null;  
};

function update() {	
	let k = ++f/NF, j = 1 - k, cvb = VB.slice();
	
	if(nav.act === 'zoom') {		
		for(let i = 0; i < 4; i++)
			cvb[i] = j*VB[i] + k*tg[i]
	}
	
	if(nav.act === 'move')	
		cvb[nav.axis] = j*VB[nav.axis] + k*tg[nav.axis];
	
	_SVG.setAttribute('viewBox', cvb.join(' '));
	
	if(!(f % NF)) {
		f = 0;
		VB.splice(0, 4, ...cvb);
		nav = {};
		tg = Array(4);
		stopAni();
		return;
	}
  
  rID = requestAnimationFrame(update)
};

addEventListener('keydown', e => { e.preventDefault()}, false);
addEventListener('keypress', e => { e.preventDefault()}, false);
addEventListener('keyup', e => {
	e.preventDefault();
	_MSG.classList.add('attention-hide')
	//_MSG.textContent = '';
		
	if(!rID && e.keyCode in NAV_MAP) {
		nav = NAV_MAP[e.keyCode];
		
		if(nav.act === 'zoom') {
			if((nav.dir === -1 && VB[2] >= DMAX[0]) || 
				 (nav.dir ===  1 && VB[2] <= WMIN)) {
				_MSG.textContent = `Cannot ${nav.act} ${nav.name} more`;
				_MSG.classList.remove('attention-hide')
				return
			}
			
			for(let i = 0; i < 2; i++) {
				tg[i + 2] = VB[i + 2]/Math.pow(2, nav.dir);
				tg[i] = .5*(DMAX[i] - tg[i + 2]);
			}
		}
		
		else if(nav.act === 'move') {
			if((nav.dir === -1 && VB[nav.axis] <= 0) || 
				 (nav.dir ===  1 && VB[nav.axis] >= DMAX[nav.axis] - VB[2 + nav.axis])) {
				_MSG.textContent = `At the edge, cannot go ${nav.name}`;
				_MSG.classList.remove('attention-hide')
				return
			}
			
			tg[nav.axis] = VB[nav.axis] + .5*nav.dir*VB[2 + nav.axis];
		}
		
		update()
	}
}, false);

addEventListener('mousewheel', e => {
    let emulateKeyCode;
    if(e.wheelDelta > 0){
        emulateKeyCode = 107
    } else{
        emulateKeyCode = 109
    };
	_MSG.classList.add('attention-hide')
	//_MSG.textContent = '';
		
	if(!rID && emulateKeyCode in NAV_MAP) {
		nav = NAV_MAP[emulateKeyCode];
		
		if(nav.act === 'zoom') {
			if((nav.dir === -1 && VB[2] >= (DMAX[0]*2)) || 
				 (nav.dir ===  1 && VB[2] <= WMIN)) {
				_MSG.textContent = `Cannot ${nav.act} ${nav.name} more`;
				_MSG.classList.remove('attention-hide')
				return
			}
			
			for(let i = 0; i < 2; i++) {
				tg[i + 2] = VB[i + 2]/Math.pow(2, nav.dir);
				tg[i] = .5*(DMAX[i] - tg[i + 2]);
			}
		}
		
		update()
	}
}, false);

map.addEventListener('mousedown', e => {
	map.addEventListener('mousemove', e => {
		let emulateKeyCode;
		let palfPastPageX = window.innerWidth/2;
		let palfPastPageY = window.innerHeight/2;
		e.preventDefault();
		_MSG.classList.add('attention-hide')
		//_MSG.textContent = '';
	
		if(palfPastPageX < e.pageX){
			emulateKeyCode = 37;
		} else {
			emulateKeyCode = 39;
		}
			
		if(!rID && emulateKeyCode in NAV_MAP) {
			nav = NAV_MAP[emulateKeyCode];
			
			if(nav.act === 'move') {
				if((nav.dir === -1 && VB[nav.axis] <= 0) || 
					 (nav.dir ===  1 && VB[nav.axis] >= DMAX[nav.axis] - VB[2 + nav.axis])) {
					_MSG.textContent = `At the edge, cannot go ${nav.name}`;
					_MSG.classList.remove('attention-hide')
					return
				}
				
				tg[nav.axis] = VB[nav.axis] + .5*nav.dir*VB[2 + nav.axis];
				console.log(tg[nav.axis])
			}
			
			update()
		}
	}, false);
	
}, false)
}


