'use strict';
(function () {
    var width, height, largeHeader, canvas, ctx, points, target, animateHeader = true;
    initHeader();
    initAnimation();
    //addListeners();
	
	
    function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = {
            x: width / 2,
            y: height / 2
        };
        largeHeader = document.getElementById('large-header');
        largeHeader.style.height = height+10 + 'px';
        canvas = document.getElementById('demo-canvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        points = [];
        for (var x = 0; x < width; x = x + width / 10) {
            for (var y = 0; y < height; y = y + height / 10) {
                var px = x + Math.random() * width / 20;
                var py = y + Math.random() * height / 20;
                var p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };
                points.push(p);
            }
        }
        for (var i = 0; i < points.length; i++) {
            var closest = [];
            var p1 = points[i];
            for (var j = 0; j < points.length; j++) {
                var p2 = points[j];
                if (!(p1 == p2)) {
                    var placed = false;
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                    for (var k = 0; k < 5; k++) {
                        if (!placed) {
                            if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }
        for (var i in points) {
            var c = new Circle(points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
            points[i].circle = c;
        }
    }
	/*
    function addListeners() {
        if (!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('scroll', scrollCheck);
        window.addEventListener('resize', resize);
    }
	
	*/
    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
    }
	
    function scrollCheck() {
        if (document.body.scrollTop > height)
            animateHeader = false;
        else
            animateHeader = true;
    }
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height +10 + 'px';
        canvas.width = width;
        canvas.height = height;
    }
    function initAnimation() {
        animate();
        for (var i in points) {
            shiftPoint(points[i]);
        }
    }
    function animate() {
        if (animateHeader) {
            ctx.clearRect(0, 0, width, height);
            for (var i in points) {
                if (Math.abs(getDistance(target, points[i])) < 4000) {
                    points[i].active = 0.3;
                    points[i].circle.active = 0.6;
                } else if (Math.abs(getDistance(target, points[i])) < 20000) {
                    points[i].active = 0.1;
                    points[i].circle.active = 0.3;
                } else if (Math.abs(getDistance(target, points[i])) < 400000) {
                    points[i].active = 0.02;
                    points[i].circle.active = 0.1;
                } else {
                    points[i].active = 0;
                    points[i].circle.active = 0;
                }
                drawLines(points[i]);
                points[i].circle.draw();
            }
        }
        requestAnimationFrame(animate);
    }
    function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            ease: Circ.easeInOut,
            onComplete: function () {
                shiftPoint(p);
            }
        });
    }
    function drawLines(p) {
        if (!p.active)
            return;
        for (var i in p.closest) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p.closest[i].x, p.closest[i].y);
            ctx.strokeStyle = 'rgba(156,217,249,' + p.active + ')';
            ctx.stroke();
        }
    }
    function Circle(pos, rad, color) {
        var _this = this;
        (function () {
            _this.pos = pos || null;
            _this.radius = rad || null;
            _this.color = color || null;
        }());
        this.draw = function () {
            if (!_this.active)
                return;
            ctx.beginPath();
            ctx.arc(_this.pos.x, _this.pos.y, _this.radius, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(156,217,249,' + _this.active/1.5 + ')';
            ctx.fill();
        };
    }
    function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
    }
}());

//------------------------------------------------------------------------------

// Listen to the scroll event
window.addEventListener('scroll', function() {
    var scrolledHeight = window.pageYOffset;

    var cover = document.querySelector('.cover');
    var cover2 = document.querySelector('.cover2');

    // Calculate the offset position of each element
    var coverOffset = getOffsetTop(cover);
    var cover2Offset = getOffsetTop(cover2);

    // Adjust the background position
    var coordsCover = '50%' + calculatePosition(scrolledHeight, coverOffset) + 'px';
    cover.style.backgroundPosition = coordsCover;

    var coordsCover2 = '50%' + calculatePosition(scrolledHeight, cover2Offset+120) + 'px';
    cover2.style.backgroundPosition = coordsCover2;
});

// Function to calculate an element's top offset
function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while(elem = elem.offsetParent);
    return offsetTop;
}

// Function to calculate background position
function calculatePosition(scrolledHeight, elementOffset) {
    // Adjust the multiplier (-0.5) based on desired parallax speed
    return (scrolledHeight - elementOffset) * +0.5;
}

/*
document.addEventListener("DOMContentLoaded", function() {
    var screenHeight = window.innerHeight;
    var divWithBackground = document.querySelector('.cover');
    divWithBackground.style.height = screenHeight + 'px';
});

*/



//------------------------------------------------------------------------------




       // Step 3: JavaScript to initialize the chart
		
		var apexConfig = {
			
			colors: ['var(--primary-chart-back)'],
			
			plotOptions: { 
			  bar: { 
				columnWidth: '100%' 
			  } 
			},
		  theme: {
			  mode: 'dark', 
			  palette: 'palette1', 
			  monochrome: {
				  enabled: false,
				  color: '#255aee',
				  shadeTo: 'light',
				  shadeIntensity: 0.65
			  },
		  },
		  chart: {
		    type: 'bar', // Change to 'line', 'area', etc. for different chart types
            

			background: 'none',

			height: '180px',
			width: '100%',
			animations: {
			  enabled: false
			},
			toolbar: {
				show: false
			}
		  },
		  dataLabels: {
			enabled: false,
			offsetY: 0,
			style: {
			  fontSize: '10px',
			  fontFamily: 'Segoe UI'
			},
			background: {
			  enabled: false
			}
		  },
		  tooltip: {
			enabled: true,
			followCursor: true,
			fixed: {
			  enabled: true,
			  position: 'topLeft',
			  offsetY: 180
			},
			x: {
			  format: 'dddd, d MMMM'
			},
			y: {
				  formatter: undefined,
				  title: {
					  formatter: (seriesName) => seriesName,
					},
			},
			items: {
			  display: 'flex'
			}
		  },

		  stroke: {
			colors: ['transparent'],
			width: 1
		  },
		  xaxis: {
			type: 'categories',
			
			categories: Array.from({ length: 15 }, (_, i) => new Intl.DateTimeFormat('en-US', { weekday: 'long', day: '2-digit', month: 'long' }).format(new Date(new Date().setDate(new Date().getDate() - 14 + i)))),
			
			floating: true,
			labels: {
			  show: false
			},
			axisTicks: {
			  show: false
			},
			axisBorder: {
			  show: false
			},
			tooltip: {
			  enabled: false
			},
			crosshairs: {
			  show: true,
			  width: 25,
			  position: 'front',
			  opacity: 0.2
			}
		  },
		  yaxis: {
			min: 0,
			decimalsInFloat: 2,
			tickAmount: 2,
			floating: true,
			labels: {
			  show: true,
			  offsetX: 31,
			  offsetY: -6
			}
		  },
		  grid: {
			strokeDashArray: 2,
			borderColor: '#666666',
			padding: {
			  left: 0,
			  right: 0
			}
		  },
		  series: [{
                name: 'kWh Energy',
                data: Array.from({ length: 14 }, () => parseFloat((Math.random() * (11.90 - 0.001) ).toFixed(2)))
			}],
		};

        var options2 = {

			series: [{
				name: '15 min interval',
				data: Array.from({ length: 96 }, () => parseFloat((Math.random() * (0.90 - 0.001) ).toFixed(2)))

			}],
			

			xaxis: {
				type: 'categories',
				categories: Array.from({ length: 96 }, (_, i) => new Date(new Date().setHours(0, 0, 0, 0) + i * 15 * 60 * 1000).toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })),
				floating: true,
				
			}
		};
			
			


        var chart = new ApexCharts(document.querySelector("#chart"), apexConfig );
        chart.render();
		
		apexConfig.series = options2.series;
		apexConfig.xaxis = options2.xaxis;
		
		var chart = new ApexCharts(document.querySelector("#chart2"), apexConfig );
        chart.render();
		
		


function init(){
	new SmoothScroll(document,120,12)
}

function SmoothScroll(target, speed, smooth) {
	if (target === document)
		target = (document.scrollingElement 
              || document.documentElement 
              || document.body.parentNode 
              || document.body) // cross browser support for document scrolling
      
	var moving = false
	var pos = target.scrollTop
  var frame = target === document.body 
              && document.documentElement 
              ? document.documentElement 
              : target // safari is the new IE
  
	target.addEventListener('mousewheel', scrolled, { passive: false })
	target.addEventListener('DOMMouseScroll', scrolled, { passive: false })

	function scrolled(e) {
		e.preventDefault(); // disable default scrolling

		var delta = normalizeWheelDelta(e)

		pos += -delta * speed
		pos = Math.max(0, Math.min(pos, target.scrollHeight - frame.clientHeight)) // limit scrolling

		if (!moving) update()
	}

	function normalizeWheelDelta(e){
		if(e.detail){
			if(e.wheelDelta)
				return e.wheelDelta/e.detail/40 * (e.detail>0 ? 1 : -1) // Opera
			else
				return -e.detail/3 // Firefox
		}else
			return e.wheelDelta/120 // IE,Safari,Chrome
	}

	function update() {
		moving = true
    
		var delta = (pos - target.scrollTop) / smooth
    
		target.scrollTop += delta
    
		if (Math.abs(delta) > 0.5)
			requestFrame(update)
		else
			moving = false
	}

	var requestFrame = function() { // requestAnimationFrame cross browser
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(func) {
				window.setTimeout(func, 1000 / 50);
			}
		);
	}()
}
init();
