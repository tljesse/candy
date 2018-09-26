(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');
		var vid = $('.fullscreen-container video');
		var mousetimeout;
		var idletime = 120;

		content.removeClass('fade-in');
		mousetimeout = setTimeout(function(){
      toggleVideo('screensaver/Screensaver', 'mp4');
    }, 1000 * idletime);

		$('.commercials').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './commercials.html';
			}, 1200);
		});

		$('.photo').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './photos.html';
			}, 1200);
		});

		$('.stories').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './stories.html';
			}, 1200);
		});

		vid.on('click', function() {
			toggleVideo('');
		});

		// Screensaver
		$(document).click(function(){
	    clearTimeout(mousetimeout);

	    mousetimeout = setTimeout(function(){
        toggleVideo('screensaver/Screensaver', 'mp4');
	    }, 1000 * idletime); // 5 secs			
		});
	});

	function toggleVideo(videoSource, format) {
  	if ($('.fullscreen-container').css('display') == 'none') {
  		$('.fullscreen-container source').attr('type', 'video/' + format);
	  	$('.fullscreen-container source').attr('src', videoSource + '.' + format);
			$('.fullscreen-container video').get(0).load();
			$('.fullscreen-container video').get(0).play();
			$('.index-inner').css('display', 'none');
			$('.page-dots').css('display', 'none');
			$('.index-container').css('background', 'black');
			$('.fullscreen-container').css('display', 'flex');
		} else {
			$('.fullscreen-container video').get(0).pause();
			$('.fullscreen-container source').attr('src', '');
			$('.index-inner').css('display', 'flex');
			$('.page-dots').css('display', 'flex');
			$('.index-container').css('background', '');
			$('.fullscreen-container').css('display', 'none');
		}
  }

}(jQuery));