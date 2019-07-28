window.onload = function() {

/*	document.write(Math.atan2(10, 20) + "<br />")
	document.write(Math.atan2(20, 20) + "<br />")*/

	var lineCanvas = document.getElementById("line-canvas");
	var sparkCanvas = document.getElementById("animation-canvas");
	
	var arc = new Arc(lineCanvas); //弧线
	var fmgr = new Scene(sparkCanvas);
	fmgr.start();

	for(var i = 0; i < 1; i++) {

		arc.drawArc(start, testArray[i], testArray[i][3]); //画线
		var sparkArc1 = new SparkArc(); //动画弧线
//		var sparkArc2 = new SparkArc(); //动画弧线
		var tempObj = { color: testArray[i][3] };

		sparkArc1.setLocation(start, testArray[i], tempObj);
		arc.drawArc( start,testArray[i] , testArray[i][3]); //画线
//		sparkArc2.setLocation(start,testArray[i], tempObj);
		
		fmgr.addShape(sparkArc1);
//		fmgr.addShape(sparkArc2);
		sparkArc1.play(); //线动画
//		sparkArc2.play(); //线动画
		
		/*setTimeout(function(){//清除动画
			fmgr.clear();
		},3000);*/
	}
}



/**
 * 原来版本
 * window.onload = function() {

	document.write(Math.atan2(10, 20) + "<br />")
	document.write(Math.atan2(20, 20) + "<br />")

	var lineCanvas = document.getElementById("line-canvas");
	var sparkCanvas = document.getElementById("animation-canvas");
	
	var arc = new Arc(lineCanvas); //弧线
	var fmgr = new Scene(sparkCanvas);
	fmgr.start();

	for(var i = 0; i < 1; i++) {

		arc.drawArc(start, testArray[i], testArray[i][3]); //画线
		var sparkArc1 = new SparkArc(); //动画弧线
		var sparkArc2 = new SparkArc(); //动画弧线
		var tempObj = { color: testArray[i][3] };

		sparkArc1.setLocation(start, testArray[i], tempObj);
		arc.drawArc( start,testArray[i] , testArray[i][3]); //画线
		sparkArc2.setLocation(start,testArray[i], tempObj);
		
		fmgr.addShape(sparkArc1);
		fmgr.addShape(sparkArc2);
		sparkArc1.play(); //线动画
		sparkArc2.play(); //线动画
		
		setTimeout(function(){
			fmgr.clear();
		},3000);
		//清除动画
	}
}
 */