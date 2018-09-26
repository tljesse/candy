(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');
		var page = 0;
		var mousetimeout;
		var screensaver_active = false;
		var idletime = 120;

		content.removeClass('fade-in');
		$('.fullscreen-container video').css('display', 'none');
		mousetimeout = setTimeout(function(){
      toggleVideo('screensaver/Screensaver', 'mp4');
    }, 1000 * idletime);

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});

		for (var i = 0; i < photos.length/6; i++) {
			$('.page-dots').append('<div class="dot ' + i + '"></div>');
		}
		$('.dot.0').addClass('active');

		//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
		loadPhotos(page);

		$('.arrow.right.page').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			$('.dot.' + page).toggleClass('active');
			page = page < Math.floor(photos.length/6) - 1 ? page + 1 : 0;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			setTimeout(function() {
				loadPhotos(page);
				$('.dot.' + page).toggleClass('active');
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.left.page').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			$('.dot.' + page).toggleClass('active');
			page = page > 0 ? page - 1 : Math.floor(photos.length/6) - 1;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			setTimeout(function() {
				loadPhotos(page);
				$('.dot.' + page).toggleClass('active');
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.right.item').on('click', function(e) {
			largeIndex = largeIndex < photos.length - 1 ? largeIndex + 1 : 0;
			while (photos[largeIndex] == '') largeIndex = largeIndex < photos.length - 1 ? largeIndex + 1 : 0;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			$('.fullscreen-container').css('background-image', 'url("./photos/' + photos[largeIndex] + '")');
		});

		$('.arrow.left.item').on('click', function(e) {
			largeIndex = largeIndex > 0 ? largeIndex - 1 : photos.length - 1;
			while (photos[largeIndex] == '') largeIndex = largeIndex > 0 ? largeIndex - 1 : photos.length - 1;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			$('.fullscreen-container').css('background-image', 'url("./photos/' + photos[largeIndex] + '")');
		});

		$('.back-button').on('click', function() {
			$('.photos-full').css('background-image', 'url("./assets/photos-bg.jpg")');
			$('.photos-wrapper').css('display', 'flex');
			$('.page-dots').css('display', 'flex');
			$('.fullscreen-container').css('display', 'none');
		});

		// Screensaver
		$('.fullscreen-container video').on('click', function() {
			toggleVideo('');
		});

		$(document).click(function(){
	    clearTimeout(mousetimeout);

	    mousetimeout = setTimeout(function(){
        toggleVideo('screensaver/Screensaver', 'mp4');
	    }, 1000 * idletime); // 5 secs			
		});
	});

	var largeIndex = 0;
	var photos = [
		''
	];

	function loadPhotos(page) {
		$('.photo').each(function(i) {
			var index = page * 6 + i;
			if (photos[index] == '') $(this).css('display', 'none');
			else $(this).css('display', 'flex');
			$(this).css('background-image', 'url("./photos/' + photos[index] + '")');

			$(this).on('click', function() {
				var image = $(this).css('background-image');
				var filename = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf(')'));
				largeIndex = photos.indexOf(filename);

				$('.photos-full').css('background', 'black');
				$('.fullscreen-container').css('background-image', image);
				$('.photos-wrapper').css('display', 'none');
				$('.page-dots').css('display', 'none');
				$('.fullscreen-container').css('display', 'flex');
			})
		})
	}

	function toggleVideo(videoSource, format) {
  	if ($('.fullscreen-container').css('display') == 'none') {
  		$('.fullscreen-container video').css('display', 'block');
  		$('.fullscreen-container source').attr('type', 'video/' + format);
	  	$('.fullscreen-container source').attr('src', videoSource + '.' + format);
			$('.fullscreen-container video').get(0).load();
			$('.fullscreen-container video').get(0).play();
			$('.photos-wrapper').css('display', 'none');
			$('.page-dots').css('display', 'none');
			$('.photos-full').css('background', 'black');
			$('.fullscreen-container').css('display', 'flex');
			$('.fullscreen-container div').each(function() {
				$(this).css('display', 'none');
			});
		} else {
			$('.fullscreen-container video').get(0).pause();
			$('.fullscreen-container video').css('display', 'none');
			$('.fullscreen-container source').attr('src', '');
			$('.photos-wrapper').css('display', 'flex');
			$('.page-dots').css('display', 'flex');
			$('.photos-full').css('background', '');
			$('.fullscreen-container').css('display', 'none');
			$('.fullscreen-container div').each(function() {
				$(this).css('display', 'block');
			});
		}
  }
}(jQuery));