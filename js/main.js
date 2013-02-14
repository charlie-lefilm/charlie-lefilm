
function launch_bo(){

	var bo_link = $('#launch_bo'),
			charlie = $('h1'),
			real = $('h2'),
			ballon = $('header'),
			close_bo = $('#close_trailer');

  $('#main').append('<iframe id="vimeo_trailer" src="http://player.vimeo.com/video/59502561?title=0&amp;byline=0&amp;badge=0&amp;color=e33947" width="960" height="540" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');

	bo_link.fadeOut(200, function(){
		ballon.animate({'margin-top': -$(window).height(), 'opacity': 0}, 1000);
		charlie.animate({'top': 2000}, 1000);
		real.animate({'top': 2200}, 1000);

		setTimeout(function(){
			$('#vimeo_trailer').fadeIn();
			close_bo.fadeIn();
			$('header').hide();
		}, 500);

	});

	_gaq.push(['_trackEvent', 'View Trailer', 'Clic watch trailer']);

}

function close_bo(){

	var bo_link = $('#launch_bo'),
			charlie = $('h1'),
			real = $('h2'),
			ballon = $('header'),
			close_bo = $('#close_trailer');

	$('header').show();

	close_bo.fadeOut();

	$('#vimeo_trailer').fadeOut(200, function(){
		$('#vimeo_trailer').remove();
		ballon.animate({'margin-top': -260, 'opacity': 1}, 1000);
		charlie.animate({'top': 120}, 1000);
		real.animate({'top': 300}, 1000);

		setTimeout(function(){
			bo_link.fadeIn();
		}, 1000);

	});

	_gaq.push(['_trackEvent', 'View Trailer', 'Clic close trailer']);

}

function initSlider(){
	//get img tweet 
	$.getJSON('http://tweet.charlie-lefilm.fr')
	.success(function(data) {
		$.each(data, function(i,item){
			$('#concours .slider ul').append('<li><img src="'+item.image+'"></li>');
		});
		// slider content width
		$('#concours .slider ul img').each(function(index){
			$(this).load(function() {
				widthSlider += $(this).width()+10;
				console.log(widthSlider);
				$('#concours .slider ul').css({'width': widthSlider});
			});
		}); 
		//widthSlider = 10000;
		//$('#concours .slider ul').css({'width': widthSlider});
		$('#concours .slider .nav').fadeIn(300);
	}).error(function() {
		 $('#concours .slider').html('<p>Galerie bientôt disponible !</p>');
	});
	
	// animation slider 
	$('#concours .nav a.previous').on('click', function(e){
		e.preventDefault();
		if($('#concours .slider ul').position().left<=-200){
			$('#concours .slider ul').stop().animate({'left': '+=400px'}, 500, 'easeInOutExpo');
		}
	});
	$('#concours .nav a.next').on('click', function(e){
		e.preventDefault();	
		limitWidth = $('#concours .slider ul').position().left + widthSlider;
		if(limitWidth > $(window).width()){
			$('#concours .slider ul').stop().animate({'left': '-=400px'}, 500, 'easeInOutExpo');
		}
	});
}

function displayScroll(){
	if($(window).height() < 650){
		$('body').css({'overflow-y': 'auto'});
	}
	if($(window).width() < 960){
		$('body').css({'overflow-x': 'auto'});
	}
}

function resizeBg(){

	$("#back").css({
		"position":"fixed",
		"top":"0px",
		"left":"0px",
		"overflow":"hidden",
		"z-index": "-1",
		"width":$(window).width() + "px",
		"height":$(window).height() + "px"
	});

	var iw = 1400;
	var ih = 900;

	if ($(window).width() > $(window).height()) {

		if (iw > ih) {
			var fRatio = iw/ih;
			$("#back").children('img').css("width",$(window).width() + "px");
			$("#back").children('img').css("height",Math.round($(window).width() * (1/fRatio)));

			var newIh = Math.round($(window).width() * (1/fRatio));

			if(newIh < $(window).height()) {
				var fRatio = ih/iw;
				$("#back").children('img').css("height",$(window).height());
				$("#back").children('img').css("width",Math.round($(window).height() * (1/fRatio)));
			}
		} else {
			var fRatio = ih/iw;
			$("#back").children('img').css("height",$(window).height());
			$("#back").children('img').css("width",Math.round($(window).height() * (1/fRatio)));
		}

	} else {
		var fRatio = ih/iw;
		$("#back").children('img').css("height",$(window).height());
		$("#back").children('img').css("width",Math.round($(window).height() * (1/fRatio)));
	}

	if ($("#back").children('img').width() > $(window).width()) {
		var this_left = ($("#back").children('img').width() - $(window).width()) / 2;
		$("#back").children('img').css({
			"top"  : 0,
			"left" : -this_left
		});
	}
	if ($("#back").children('img').height() > $(window).height()) {
		var this_height = ($("#back").children('img').height() - $(window).height()) / 2;
		$("#back").children('img').css({
			"left" : 0,
			"top" : -this_height
		});
	}
}

function resizeContent(){
	if($("#main").height() > 650){
		var middleWindow = ($(window).height()-90)/2;
		var middleContent = $("#main .subcontent.current").height()/2;
		console.log(middleWindow-middleContent, 'position');
		$("#main .subcontent.current").css({
			"margin-top": (parseInt(middleWindow-middleContent))+"px"
		});
	}
}

$(document).ready(function(){

	// $('body').addClass('loading');

	$(window).on('resize', function(){
		resizeBg();
		resizeContent();
	});
	
	// init 
	resizeBg();
	resizeContent();
	$videoVimeo=$('#ba iframe');
	widthSlider = 0;
	initSlider();
	
	// display scroll
	//displayScroll();
	
	// animation navigation 
	$('nav a').on('click', function(e){
		e.preventDefault();
		$this = $(this);
		if($this.parent().hasClass('current')){
			return false;
		}else{
			$content = $this.attr('href');
			// if display ba, stop video bg || if last display was ba, play video bg
			if($this.parent().hasClass('ba_link')){
				$('#ba').html($videoVimeo);
				$('.video-background').videobackground('play');
			}else if($('section').find('nav li.current').hasClass('ba_link')){
				$('.video-background').videobackground('play');
				$('#ba iframe').remove();
			}
			// change menu active item
			$('section').find('nav li.current').removeClass('current');
			$this.parent().addClass('current');
			// display new content
			$oldContent = $('section').find('.subcontent.current');
			$newContent = $('section').find($content);
			$oldContent.parent().stop().animate({'top': '-100px'});
			$oldContent.removeClass('current').fadeOut(500, function(){
				$newContent.parent().css({'top':'100px'});
				$newContent.parent().stop().animate({'top': '0px'});
				$newContent.fadeIn(500).addClass('current');
				resizeContent();
			});
			// resize widthSlider concours
			if($this.parent().hasClass('concours')){
				$('#concours .slider ul img').each(function(index){
					widthSlider += $(this).width()+10;
					$('#concours .slider ul').css({'width': widthSlider});
				});
			}
		}
	});

	// animation baloon
	setInterval(function(){
		$('header > span').animate({'background-position-y': '+=150'}, 0);
	}, 150);

});
