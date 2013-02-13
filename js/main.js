$(document).ready(function(){

	$(window).on('resize', function(){
		resizeBg();
	});
	
	// init 
	resizeBg();
	
	// animation navigation 
	$('nav a').on('click', function(e){
		e.preventDefault();
		$this = $(this);
		$content = $this.attr('href');
		// change menu active item
		$('section').find('nav li.current').removeClass('current');
		$this.parent().addClass('current');
		// display new content
		$oldContent = $('section').find('.subcontent.current');
		$newContent = $('section').find($content);
		$oldContent.parent().animate({'top': '-100px'});
		$oldContent.removeClass('current').fadeOut(500, function(){
			$newContent.parent().css({'top':'100px'});
			$newContent.parent().animate({'top': '0px'});
			$newContent.fadeIn(500).addClass('current');
		});
		
	});

	$('#launch_bo').on('click', function(e){
		e.preventDefault();
		launch_bo();
	});

	$('a#close_trailer').on('click', function(e){
		e.preventDefault();
		close_bo();
	});

	// animation baloon
	setInterval(function(){
		$('header > span').animate({'background-position-y': '+=150'}, 0);
	}, 150);
	
	// TweenLite.to($('header > span'), 0, {css:{backgroundPosition:'0px +=150px', autoAlpha: 1}});

});

function launch_bo(){

	var bo_link = $('#launch_bo'),
			charlie = $('h1'),
			real = $('h2'),
			ballon = $('header'),
			close_bo = $('#close_trailer');

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

		ballon.animate({'margin-top': -260, 'opacity': 1}, 1000);
		charlie.animate({'top': 120}, 1000);
		real.animate({'top': 300}, 1000);

		setTimeout(function(){
			bo_link.fadeIn();
		}, 1000);

	});

	_gaq.push(['_trackEvent', 'View Trailer', 'Clic close trailer']);

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

  var iw = 1624;
  var ih = 1124;
  
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
