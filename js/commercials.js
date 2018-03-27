(function($) {
	'use strict';
	var page = 0;

	$(document).ready(function() {
		var content = $('.content');

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

		$('.fullscreen-container video').on('click', function() {
			toggleVideo('');
		});
		
	});

	var commercials = [
		{
			'caption': '',
			'video': '',
			'format': 'mp4'
		},
		{
			'caption': '',
			'video': '',
			'format': 'mp4'
		},
		{
			'caption': '',
			'video': '',
			'format': 'mp4'
		},
		{
			'caption': '',
			'video': '',
			'format': 'mp4'
		},
		{
			'caption': '',
			'video': '',
			'format': 'mp4'
		},
		{
			'caption': '',
			'video': '',
			'format': 'mp4'
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
				video.unbind('click');
				//video.attr('poster', 'assets/' + commercials[index].thumb);
				$('#video-' + i + ' source').attr('src', 'commercials/' + commercials[index].video + '.' + commercials[index].format);
				$('#video-' + i).attr('poster', 'assets/commercials/' + commercials[index].video + '.jpg');
				video.get(0).load();
				$('.video-' + i + ' h3').text(commercials[index].caption);

				video.on('click', function(e) {
					var vidSource = $('source', this).attr('src');
					// $('.fullscreen-container source').attr('src', vidSource);
					// $('.fullscreen-container video').get(0).load();
					// $('.fullscreen-container video').get(0).play();
					// $('.commercials-wrapper').css('display', 'none');
					// $('.fullscreen-container').css('display', 'flex');
					toggleVideo(vidSource);
					//var filename = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf(')'));
					//largeIndex = photos.indexOf(filename);
					//enterFullscreen($(this));
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
	  	$('video').each(function(i) {
	  		var index = page * 6 + i;
    		$(this).get(0).pause();
    		if (index < 1)
    			$('source', this).attr('src', 'commercials/' + commercials[index].video + '.webm');
    		else
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

  function toggleVideo(videoSource) {
  	if ($('.fullscreen-container').css('display') == 'none') {
  		var vidType = videoSource.substring(videoSource.lastIndexOf('.')).substring(1);
  		$('.fullscreen-container source').attr('type', 'video/' + vidType);
	  	$('.fullscreen-container source').attr('src', videoSource);
			$('.fullscreen-container video').get(0).load();
			$('.fullscreen-container video').get(0).play();
			$('.commercials-wrapper').css('display', 'none');
			$('.fullscreen-container').css('display', 'flex');
		} else {
			$('.fullscreen-container video').get(0).pause();
			$('.fullscreen-container source').attr('src', '');
			$('.commercials-wrapper').css('display', 'flex');
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
    		$('source', this).attr('src', 'commercials/' + commercials[index].video + '.webm');
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
	}*/
}(jQuery));