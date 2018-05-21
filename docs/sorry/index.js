/*

*/
var ready = false;
var m = 1;
var images = ["https://i.imgur.com/C74VGIz.png"];
$(document).ready(function() {
	$("body").on("click",".matryoshkas",function() {
		if (ready) {
			ready = false;
			$(this).children(".matryoshka_top").stop().animate({
				"top":"-270px"
			},{
				duration:700,
				complete: function() {
				}
			});
			$(this).children(".matryoshka_bottom").stop().animate({
				"bottom":"-200px"
			},{
				duration:700,
				complete: function() {
					$(this).parent().remove();
					m++;
					$("#m_"+m).removeClass("inside");
					if (m>9) {
						$("#subtitle").html("");
						$("#texts").show().css({
							"-ms-transform":"scale(1,1)",
							"-webkit-transform":"scale(1,1)",
							"transform":"scale(1,1)"
						});
					} else {
						$("#subtitle").html("(PLEASE TOUCH AGAIN)");
						$("#m_"+(m+1)).show();
						ready = true;
					}
				}
			});
		}
	});
	$.imgpreloader({
		paths: images
	}).done(function($allImages) {
		$("#loading").hide();
		$("#texts").show();
		create();
		$("#subtitle").html("(TOUCH TO OPEN)");
	}).progress(function($image,$allImages,$properImages,$brokenImages,isBroken,percentage){
	});
});
function create() {
	for (var i=9;i>0;i--) {
		var bg_posX = (i-1)*252;
		var html = "<div class='matryoshkas "+(i==1?"":"inside")+"' id='m_"+i+"' style='display:"+(i>2?"none":"")+";'><div class='matryoshka_top' style='background-position:-"+bg_posX+"px 0px;'></div><div class='matryoshka_bottom' style='background-position:-"+bg_posX+"px -191px;'></div></div>";
		$("#main").append(html);
	}
	ready = true;
}
