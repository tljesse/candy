(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');
		var player = $('#commercial-2_html5_api');
		var commercial3 = $('#commercial-3');

		var commercials = [
			{
				'caption': '1958',
				'video': 'commercials/1958 - Homeowners Tent_60 [QNAM0000125].mp4',
				'thumb': '350x180.png' 
			}
		];

		content.removeClass('fade-in');

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});

		player.on('click', function(e) {
			var vid = player[0];
			vid.requestFullscreen();
		});

		for (var i = 0; i < commercials.length; i++) {
			$('#video-' + i + ' source').setAttribute('src', 'commercials/' + commercials[i].video);
			$('.video-' + i + ' h3').text(commercials[i].caption);
		}


		var video = $("#video");
		video.on('click', function(e){
	    var vid = video[0];
	    vid.play();
	    if (vid.requestFullscreen) {
	      vid.requestFullscreen();
	    } else if (vid.mozRequestFullScreen) {
	      vid.mozRequestFullScreen();
	    } else if (vid.webkitRequestFullscreen) {
	      vid.webkitRequestFullscreen();
	    }
		});
		
	});
}(jQuery));