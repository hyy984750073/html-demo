
// getStyle：获取对象样式对应属性的值
	// 参数：
	//     对象， obj
	//     属性， attr
	//  返回值： 对应属性的值
	
function getStyle(obj, attr) {
	
	var objStyle = null;
	if (window.getComputedStyle) {
		objStyle = getComputedStyle(obj);
	} else {
		objStyle = obj.currentStyle;
	}
	
	return objStyle[attr];
}




// 
// 参数： oAttr 对象：
//      例如 {"left": 200,  "width": 500}
function startMoveEx(obj, oAttr, fn) {

	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		// 【练习】 判断多个属性的情况
		
		var flag = true;
		
		for (var attr in oAttr) {
			
			// 属性名 attr 
			// 属性值 oAttr[attr]
			
			// 目标值
			var iTarget = oAttr[attr];
			
			// 1. 获取当前值
			var current = parseInt(getStyle(obj, attr));
			if (attr == "opacity") {
				// 0.3 ==> 0
				current = parseFloat(getStyle(obj, attr));
				current *= 100;
				current = Math.round(current);
			}
			
			// 2. 计算速度
			var speed = (iTarget - current) / 8;
			speed = (speed > 0) ? Math.ceil(speed) : Math.floor(speed);
			
			// 3. 判断执行完毕
			//   【注意】 这里是判断没有执行完的情况
			if (current != iTarget) {
				// 定时器的清除，
				// 必须是在所有动画都完成之后才执行
				
				// 有一个没有执行完，就将标记设置为false
				flag = false;
				
			}
			
			
			
			// 4. 更新当前的位置
			obj.style[attr] = current + speed + "px";
			if (attr == "opacity") {
				obj.style.opacity = (current + speed) / 100;
				obj.style.filter = "alpha(opacity="+current + speed+")";
			}
		}
		
		if (flag == true) {
			clearInterval(obj.timer);
			fn && fn();
		}
		
	}, 50);
}


function startMove(obj, attr, iTarget, fn) {
	
	
	clearInterval(obj.timer);

	obj.timer = setInterval(function() {
		
		// 1. 得到当前的值
		var current = parseInt(getStyle(obj, attr));
		if (attr == "opacity") {
			// 0.3 ==> 0
			current = parseFloat(getStyle(obj, attr));
			current *= 100;
			current = Math.round(current);
		}
		
		// 2. 计算速度
		//     缓冲速度
		var speed = (iTarget - current) / 8;
		
		//   0.3 ===> 0
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		
		// 3. 判断终止条件
		if (current == iTarget) {
			clearInterval(obj.timer);
			
			// 动作完成，调用回调函数
//			if (fn) {
//				fn();
//			}
			
			// 与上面的if等价转换，相当于 fn 存在才执行fn()
			fn && fn();
			
			return ;
		}
		
		console.log(current, iTarget);
		
		// 4. 更新当前的位置
		obj.style[attr] = current + speed + "px";
		if (attr == "opacity") {
			obj.style.opacity = (current + speed) / 100;
			obj.style.filter = "alpha(opacity="+current + speed+")";
		}
	}, 50);

}