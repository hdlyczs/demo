$(function(){
	$('#fullpage').fullpage({
		anchors:['page1','page2','page3','page4','page4'],
		verticalCentered:false,
		resize:true,
		css3:true,
		fixedElements:'.header',
		navigation:true,
		navigationTooltips:['section1','section2','section3','section4'],
		afterLoad:function(link,index){
			switch(index){
				case 1:
					break;
				case 2:
					$('.title hr').css('transform','scaleX(1)')
					$('.about_list2_left').css('left','0')
					$('.about_list2_right').css('right','0')
					$('.about_list2 ul li').eq(0).delay(700).animate({top:'0'},function(){
						$('.about_list2 ul li').eq(1).animate({top:'0'},function(){
							$('.about_list2 ul li').eq(2).animate({top:'0'},function(){
								$('.about_list2 ul li').eq(3).animate({top:'0'});
							})
						})
					})
					break;
				case 3:
					$('.title hr').css('transform','scaleX(1)')
					$('.skill_content').eq(0).animate({opacity:'1'},function(){
						$('.skill_content').eq(1).animate({opacity:'1'},function(){
							$('.skill_content').eq(2).animate({opacity:'1'},function(){
								$('.skill_content').eq(3).animate({opacity:'1'})
							})
						})
					})
					break;
				case 4:
					$('.title hr').css('transform','scaleX(1)')
					$('.list1 li').eq(0).animate({opacity:'1'},function(){
						$('.list1 li').eq(1).animate({opacity:'1'},function(){
							$('.list1 li').eq(2).animate({opacity:'1'},function(){
								$('.list1 li').eq(3).animate({opacity:'1'})
							})
						})
					})
					$('.list2 li').eq(0).delay(1000).animate({left:'0',opacity:'1'},function(){
						$('.list2 li').eq(1).animate({left:'0',opacity:'1'},function(){
							$('.list2 li').eq(2).animate({left:'0',opacity:'1'},function(){								
								$('.list2 li').eq(3).animate({left:'0',opacity:'1'})								
							})
						})
					})
					break;
			}
		},
		onLeave:function(index,nextIndex,direction){
			switch(index){
				case 1:
					break;
				case 2:
					$('.title hr').css('transform','scaleX(0)')
					$('.about_list2_left').css('left','-10%')
					$('.about_list2_right').css('right','-10%')
					$('.about_list2 ul li').css('top','110%')
					break;
				case 3:
					$('.title hr').css('transform','scaleX(0)')
					$('.skill_content').css('opacity','0')
					break;
				case 4:
					$('.title hr').css('transform','scaleX(0)')
					$('.list1 li').css('opacity','0')
					break;
			}
		}
	})
	$('.firstimg').hover(function(){
		$('.secondimg').fadeIn().css('box-shadow','0px 0px 25px #666')
	},function(){
		$('.secondimg').fadeOut().css('box-shadow','')
	})
	$('.list1_img span').hover(function(){
		$(this).parent().css('background','white').css('border','3px solid black')
		$(this).stop().animate({left:'100%'},function(){
			$(this).css('left','-100%').stop().animate({left:'0%'})
		})
	},function(){
		$(this).parent().css('background','#A0A0B4').css('border','3px solid white')
	})
})