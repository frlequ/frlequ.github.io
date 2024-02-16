       // Step 3: JavaScript to initialize the chart
		
		var apexConfig = {
			
			colors: ['var(--primary-chart-back)'],
			
			plotOptions: { 
			  bar: { 
				columnWidth: '100%' 
			  } 
			},
		  chart: {
		    type: 'bar', // Change to 'line', 'area', etc. for different chart types
            

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
			offsetY: -8,
			style: {
			  fontSize: '10px',
			  fontFamily: 'Segoe UI'
			},
			background: {
			  enabled: false
			}
		  },
		  tooltip: {
			enabled: false,
			followCursor: true,
			fixed: {
			  enabled: true,
			  position: 'topLeft',
			  offsetY: 180
			},
			x: {
			  format: 'dddd, d MMMM'
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
                data: [14.26, 14.80, 16.92, 12.59, 12.23, 11.58, 11.93, 13.88, 11.82] // Random kWh data
			}],
		};

        var options2 = {

			series: [{
				name: 'kWh Energy',
				data: Array.from({ length: 96 }, () => parseFloat((Math.random() * (100 - 10) + 10).toFixed(2)))
			}]
        };

        var chart = new ApexCharts(document.querySelector("#chart"), apexConfig );
        chart.render();
		
		apexConfig.series = options2.series;
		
		var chart = new ApexCharts(document.querySelector("#chart2"), apexConfig );
        chart.render();