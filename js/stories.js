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
			page = (page < stories.length/6 - 1) ? page+1 : 0;
			
			setTimeout(function() {
				loadVideos(page);
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.left').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			page = (page > 0) ? page-1 : stories.length/6 - 1;

			setTimeout(function() {
				loadVideos(page);
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.fullscreen-container video').on('click', function() {
			toggleVideo('');
		})
	});

	var stories = [
		{
			'caption': '',
			'video': '',
			'thumb': '',
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '',
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '',
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '',
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '',
			'timecode': 12
		},
		{
			'caption': '',
			'video': '',
			'thumb': '',
			'timecode': 12
		},
	];

	function loadVideos(page) {
		for (var i = 0; i < 6; i++) { 
			var index = page * 6 + i;
			$('.video-' + i).css('display', 'flex')
			if (stories[index].caption == '')
				$('.video-' + i).css('display', 'none');
			else {
				var video = $('#video-' + i);
				video.unbind('click');
				//video.attr('poster', 'assets/' + stories[index].thumb);
				$('#video-' + i + ' source').attr('src', 'stories/' + stories[index].video + '.mp4');
				$('#video-' + i).attr('poster', 'assets/stories/' + stories[index].video + '.jpg');
				video[0].load();
				$('.video-' + i + ' h3').text(stories[index].caption);

				video.on('click', function(e) {
					// var vid = $(this)[0];
					// enterFullscreen($(this));
					var vidSource = $('source', this).attr('src');
					toggleVideo(vidSource);
				});
			}
		}
	}

	function enterFullscreen(videoElement) {
		var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (!isInFullScreen) {
    	videoElement.attr('controls', '');
	  	videoElement.get(0).play();
	    if (videoElement.get(0).requestFullscreen){
	    	videoElement.get(0).requestFullscreen()
	    } else if (videoElement.get(0).mozRequestFullScreen) {
	      videoElement.get(0).mozRequestFullScreen();
	    } else if (videoElement.get(0).webkitRequestFullscreen) {
	      videoElement.get(0).webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
	    }
	  } else {
	  	videoElement.removeAttr('controls');
	  	$('video').each(function(index) {
    		$(this).get(0).pause();
    		$('source', this).attr('src', 'stories/' + stories[index].video + '.mp4');
				$(this).attr('poster', 'assets/stories/' + stories[index].video + '.jpg');
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

  function toggleVideo(videoSource) {
  	if ($('.fullscreen-container').css('display') == 'none') {
  		var vidType = videoSource.substring(videoSource.lastIndexOf('.')).substring(1);
  		$('.fullscreen-container source').attr('type', 'video/' + vidType);
	  	$('.fullscreen-container source').attr('src', videoSource);
			$('.fullscreen-container video').get(0).load();
			$('.fullscreen-container video').get(0).play();
			$('.stories-wrapper').css('display', 'none');
			$('.fullscreen-container').css('display', 'flex');
		} else {
			$('.fullscreen-container video').get(0).pause();
			$('.fullscreen-container source').attr('src', '');
			$('.stories-wrapper').css('display', 'flex');
			$('.fullscreen-container').css('display', 'none');
		}
  }

  /*
   * Legacy, this is built into other function
   *
  function exitFullscreen() {
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

    if (isInFullScreen){
    	$('video').each(function(index) {
    		$(this).get(0).pause();
    		$('source', this).attr('src', 'stories/' + stories[index].video + '.webm');
				$(this).attr('poster', 'assets/stories/' + stories[index].video + '.jpg');
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
	}*/
}(jQuery));