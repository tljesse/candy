(function($) {
	'use strict';
	var page = 0;
	var vidActive = false;
	var mousetimeout;
	var idletime = 120;

	$(document).ready(function() {
		var content = $('.content');
		var vid = $('.fullscreen-container video');	

		content.removeClass('fade-in');
		mousetimeout = setTimeout(function(){
      toggleVideo('screensaver/Screensaver', 'mp4');
    }, 1000 * idletime);

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});

		for (var i = 0; i < stories.length/6; i++) {
			$('.page-dots').append('<div class="dot ' + i + '"></div>');
		}
		$('.dot.0').addClass('active');

		loadVideos(page);

		$('.arrow.right').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			$('.dot.' + page).toggleClass('active');
			page = (page < stories.length/6 - 1) ? page+1 : 0;
			
			setTimeout(function() {
				loadVideos(page);
				$('.dot.' + page).toggleClass('active');
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.left').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			$('.dot.' + page).toggleClass('active');
			page = (page > 0) ? page-1 : stories.length/6 - 1;

			setTimeout(function() {
				loadVideos(page);
				$('.dot.' + page).toggleClass('active');
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		vid.on('click', function() {
			vidActive = false;
			toggleVideo('');
			runScreensaver();
		});

		vid.on('ended', function() {
			vidActive = false;
			toggleVideo('');
			runScreensaver();
		});

		// Custom vid controls
		$('.btnPlay').on('click', function() {
		    if(vid[0].paused) {
		        vid[0].play();
		    }
		    else {
		        vid[0].pause();
		    }
		    return false;
		});

		vid.on('timeupdate', function() {
	    var currentPos = vid[0].currentTime;
	    var maxduration = vid[0].duration;
	    var percentage = 100 * currentPos / maxduration;
	    $('.timeBar').css('width', percentage+'%');
		});

		var timeDrag = false;   /* Drag status */
		$('.progress-bar').mousedown(function(e) {
	    timeDrag = true;
	    updatebar(e.pageX);
		});
		$(document).mouseup(function(e) {
		    if(timeDrag) {
		        timeDrag = false;
		        updatebar(e.pageX);
		    }
		});
		$(document).click(function(e) {
		    if(timeDrag) {
		        updatebar(e.pageX);
		    }
		});
		 
		//update Progress Bar control
		var updatebar = function(x) {
	    var progress = $('.progress-bar');
	    var maxduration = vid[0].duration;
	    var position = x - progress.offset().left;
	    var percentage = 100 * position / progress.width();
	 
	    //Check within range
	    if(percentage > 100) {
        percentage = 100;
	    }
	    if(percentage < 0) {
        percentage = 0;
	    }
	 
	    //Update progress bar and video currenttime
	    $('.timeBar').css('width', percentage+'%');
	    vid[0].currentTime = maxduration * percentage / 100;
		};

		// Screensaver
		$(document).mousemove(function(){
	    runScreensaver();
		});

	});

	var stories = [
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
			if (stories[index].caption == '')
				$('.video-' + i).css('display', 'none');
			else {
				var video = $('#video-' + i);
				video.unbind('click');
				video.removeClass();

				video.attr('src', 'assets/stories/' + stories[index].video + '.jpg');
				video.addClass(stories[index].format);

				$('.video-' + i + ' h3').text(stories[index].caption);

				video.on('click', function(e) {
					clearTimeout(mousetimeout);
					vidActive = true;
					var vidSource = $(this).attr('src');
					vidSource = vidSource.substring(vidSource.lastIndexOf('/') + 1, vidSource.lastIndexOf('.'));
					
					var vidFormat = $(this).attr('class');

					$('.control').css('display', 'block');
					toggleVideo('stories/' + vidSource, vidFormat);
				});
			}
		}
	}

  function toggleVideo(videoSource, format) {
  	if (format == 'page') {
			$('.content').addClass('fade-out');
			setTimeout(function() {
				window.location.href = './advisory.html';
			}, 1200);
  		return;
  	}
  	if ($('.fullscreen-container').css('display') == 'none') {
  		$('.fullscreen-container source').attr('type', 'video/' + format);
	  	$('.fullscreen-container source').attr('src', videoSource + '.' + format);
			$('.fullscreen-container video').get(0).load();
			$('.fullscreen-container video').get(0).play();
			$('.stories-wrapper').css('display', 'none');
			$('.page-dots').css('display', 'none');
			$('.stories-full').css('background', 'black');
			$('.fullscreen-container').css('display', 'flex');
		} else {
			$('.fullscreen-container video').get(0).pause();
			$('.fullscreen-container source').attr('src', '');
			$('.stories-wrapper').css('display', 'flex');
			$('.page-dots').css('display', 'flex');
			$('.stories-full').css('background', '');
			$('.fullscreen-container').css('display', 'none');
		}
  }

  function runScreensaver() {
  	clearTimeout(mousetimeout);

    if (!vidActive) {
	    mousetimeout = setTimeout(function(){
	    	$('.control').css('display', 'none');
        toggleVideo('screensaver/Screensaver', 'mp4');
	    }, 1000 * idletime);
    }	
  }

  /*
   * Legacy, this is built into other function
   *
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