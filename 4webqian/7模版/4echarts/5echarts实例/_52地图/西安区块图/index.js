$(function(){
	var myChart = echarts.init(document.getElementById('map'));
	// $.get('./one.json',function(geoJson){
		echarts.registerMap('one',one444,{});
		var option = {
		    // tooltip: {
		    //     trigger: 'item',
            	// formatter: '{b}<br/>{c} (p / km2)'
		    // },
		    visualMap:{
	            min: 500,
	            max: 50000,
	            // text:['High','Low'],
	            left: 'right',
	            realtime: false,
	            calculable: false,
	            inRange: {
	                color: ['#313695','#4575b4', '#74add1','#abd9e9','#e0f3f8']
	            }
	        },
            geo: {
                show: false,
                map: 'one',
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false,
                    }
                },
                roam: true,
                itemStyle: {
                    normal: {
                        areaColor: '#1824ca',
                        borderColor: '#3B5077',
                    },
                    emphasis: {
                        areaColor: '#2B91B7',
                    }
                }
            },
		    series: [
		        {
		        	name: '西城',
		            type: 'map',
		            mapType: 'one',
		            aspectScale: 0.85,  //地图长度比
		            label: {
		                normal: {
		                    show: true,
		                    textStyle: {
		                        color: '#fff'
		                    }
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        color: '#333'
		                    }
		                }
		            },
                    roam: true,
		            data: [
	                    {name: '你好', value: 28000}
		            ]
		        }                              
		    ]
		};
		myChart.setOption(option);
	// });
});