//**************************************************************
// jQZoom allows you to realize a small magnifier window,close
// to the image or images on your web page easily.
//
// jqZoom version 2.1
// Author Doc. Ing. Renzi Marco(www.mind-projects.it)
// First Release on Dec 05 2007
// i'm searching for a job,pick me up!!!
// mail: renzi.mrc@gmail.com
//**************************************************************

(function($){
	// 放大镜的大小
	// jQuery.prototype = jQuery.fn
	$.fn.jqueryzoom = function(options){
		var settings = {
			// 放大的图片的盒子的宽高
			xzoom: 200,//zoomed width default width
			yzoom: 200,//zoomed div default width
			offset: 10,	//zoomed div default offset  我：放大的图片的显示位置距离原来的图片的显示位置
			// 我：默认放大的图片显示在右边
			position: "right",//zoomed div default position,offset position is to the right of the image
			// 我：如果注释掉是不影响放大效果的，但是放大镜变成了 “+” 号
			lens:1, //zooming lens over the image,by default is 1;
			// 我：注释掉也是不影响的
			preload: 1
		};

		if(options) {
			// 将 options 合并到 settings 中,返回值为合并后的 settings
			$.extend(settings, options);
		}

		var noalt='';
		$(this).hover(function(){// 鼠标经过待放大的图片时
			// this 是 待放大 的图片的span
		    var imageLeft = this.offsetLeft;
		    var imageRight = this.offsetRight;// this.offsetRight 这个是undefined，不懂有什么用

		    // $(this).get(0)将jquery对象转换成原生js对象
		    //var imageTop =  $(this).get(0).offsetTop;// 原来的
		    var imageTop = this.offsetTop; // 我改的
		    var imageWidth = $(this).children('img').get(0).offsetWidth;
		    var imageHeight = $(this).children('img').get(0).offsetHeight;
			
			// alt是鼠标移到图片去的时候提示的字
            noalt = $(this).children("img").attr("alt");

		    var bigimage = $(this).children("img").attr("jqimg");

            $(this).children("img").attr("alt",'');
			// 我：如果没有鼠标移上去之后没有放大镜的话就生成放大镜（jqZoomPup）
			// 我：zoomdiv是放大之后的图片的盒子 .bigimg是放大的图片
			// 我：其实是否判断都是可以的
		    if($("div.zoomdiv").get().length == 0){

			    $(this).after("<div class='zoomdiv'><img class='bigimg' src='"+bigimage+"'/></div>");
		
			    $(this).append("<div class='jqZoomPup'>&nbsp;</div>");

		    }
			
			// 我：显示在右边的情况
		    if(settings.position == "right"){
	            if(imageLeft + imageWidth + settings.offset + settings.xzoom > screen.width){
	
	           		leftpos = imageLeft  - settings.offset - settings.xzoom;
	
	            }else{
	
			    	leftpos = imageLeft + imageWidth + settings.offset;
	            }
		    }else{
			    leftpos = imageLeft - settings.xzoom - settings.offset;
			    
			    if(leftpos < 0){
	            	leftpos = imageLeft + imageWidth  + settings.offset;
		    	}
		    }
		    
		    $("div.zoomdiv").css({ top: imageTop,left: leftpos });

		    $("div.zoomdiv").width(settings.xzoom);

		    $("div.zoomdiv").height(settings.yzoom);

            $("div.zoomdiv").show();

            if(!settings.lens){
            	$(this).css('cursor','crosshair');
			}
			$(document.body).mousemove(function(e){

                mouse = new MouseEvent(e);

			    var bigwidth = $(".bigimg").get(0).offsetWidth;
			    var bigheight = $(".bigimg").get(0).offsetHeight;

			    var scaley ='x';
			    var scalex ='y';

			    if(isNaN(scalex)|isNaN(scaley)){

				    var scalex = (bigwidth/imageWidth);
	
				    var scaley = (bigheight/imageHeight);

				    $("div.jqZoomPup").width((settings.xzoom)/scalex );
	
		    		$("div.jqZoomPup").height((settings.yzoom)/scaley);
	
	                if(settings.lens){
	                	$("div.jqZoomPup").css('visibility','visible');
					}
			    }
                xpos = mouse.x - $("div.jqZoomPup").width()/2 - imageLeft;
                ypos = mouse.y - $("div.jqZoomPup").height()/2 - imageTop ;

                if(settings.lens){

                    xpos = (mouse.x - $("div.jqZoomPup").width()/2 < imageLeft ) ? 0 : (mouse.x + $("div.jqZoomPup").width()/2 > imageWidth + imageLeft ) ?  (imageWidth -$("div.jqZoomPup").width() -2)  : xpos;

					ypos = (mouse.y - $("div.jqZoomPup").height()/2 < imageTop ) ? 0 : (mouse.y + $("div.jqZoomPup").height()/2  > imageHeight + imageTop ) ?  (imageHeight - $("div.jqZoomPup").height() -2 ) : ypos;
                }

                if(settings.lens){
               		$("div.jqZoomPup").css({ top: ypos,left: xpos });
                }

				scrolly = ypos;
				$("div.zoomdiv").get(0).scrollTop = scrolly * scaley;

				scrollx = xpos;
				$("div.zoomdiv").get(0).scrollLeft = (scrollx) * scalex ;


			});
		},function(){// 我：鼠标移开之后执行的代码
            $(this).children("img").attr("alt",noalt);
	        $(document.body).unbind("mousemove");
	        if(settings.lens){
	        	$("div.jqZoomPup").remove();
	        }
	        $("div.zoomdiv").remove();

	    });

        count = 0;

		if(settings.preload){

			$('body').append("<div style='display:none;' class='jqPreload"+count+"'>sdsdssdsd</div>");
	
			$(this).each(function(){		
		        var imagetopreload= $(this).children("img").attr("jqimg");
		
		        var content = jQuery('div.jqPreload'+count+'').html();
		
		        jQuery('div.jqPreload'+count+'').html(content+'<img src=\"'+imagetopreload+'\">');
			});
		}
	}
})(jQuery);

function MouseEvent(e) {
	// pageX() 属性是鼠标指针的位置，相对于文档的左边缘
	// 没有这两个值的话放大镜不能 左右上下 移动
	this.x = e.pageX; 
	this.y = e.pageY;
}


