$(document).ready(function(){

	$(window).on('resize', function(){
		resizeBg();
	});

	resizeBg();

	$('#launch_bo').on('click', function(){
		launch_bo();		
	});

});

function launch_bo(){

	var bo_link = $('#launch_bo'),
			charlie = $('h1'),
			real = $('h2'),
			ballon = $('header');

	bo_link.fadeOut(200, function(){
		ballon.animate({'margin-top': -$(window).height(), 'opacity': 0}, 1000);
		charlie.animate({'top': 2000}, 1000);
		real.animate({'top': 2200}, 1000);

		setTimeout(function(){
			$('#vimeo_trailer').fadeIn();
			$('header').hide();
		}, 500);

	});

	_gaq.push(['_trackEvent', 'View Trailer', 'Clic watch trailer']);

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
