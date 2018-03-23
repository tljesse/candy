(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');
		var page = 0;

		content.removeClass('fade-in');

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});

		loadVideos(page);

		$('.arrow.right').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			page = (page < commercials.length/6 - 1) ? page+1 : 0;
			
			setTimeout(function() {
				loadVideos(page);
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.left').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			page = (page > 0) ? page-1 : commercials.length/6 - 1;

			setTimeout(function() {
				loadVideos(page);
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});
		
	});

	var commercials = [
			{
			'caption': '',
			'video': '',
			'thumb': '' ,
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '' ,
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '' ,
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '' ,
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '' ,
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '' ,
			'timecode': 12
		},
	];

	function loadVideos(page) {
		for (var i = 0; i < 6; i++) { 
			var index = page * 6 + i;
			$('.video-' + i).css('display', 'flex')
			if (commercials[index].caption == '')
				$('.video-' + i).css('display', 'none');
			else {
				var video = $('#video-' + i);
				//video.attr('poster', 'assets/' + commercials[index].thumb);
				$('#video-' + i + ' source').attr('src', 'commercials/' + commercials[index].video + '.mp4');
				$('#video-' + i).attr('poster', 'assets/commercials/' + commercials[index].video + '.jpg');
				video[0].load();
				$('.video-' + i + ' h3').text(commercials[index].caption);

				video.on('click', function(e) {
					var vid = $(this)[0];
					enterFullscreen(vid);
				});

				$(document).on('click', function(e) {
					exitFullscreen();
				})
			}
		}
	}

	function enterFullscreen(videoElement) {
    if (!document.mozFullScreen && !document.webkitFullScreen) {
	  	videoElement.play();
	    if (videoElement.requestFullscreen){
	    	videoElement.requestFullscreen()
	    } else if (videoElement.mozRequestFullScreen) {
	      videoElement.mozRequestFullScreen();
	    } else if (videoElement.webkitRequestFullscreen) {
	      videoElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	  }
  }

  function exitFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (isInFullScreen){
    	$('video').each(function(index) {
    		$(this).get(0).pause();
    		$('source', this).attr('src', 'commercials/' + commercials[index].video + '.mp4');
				$(this).attr('poster', 'assets/commercials/' + commercials[index].video + '.jpg');
				$(this).get(0).load();
    	});
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
	}
}(jQuery));