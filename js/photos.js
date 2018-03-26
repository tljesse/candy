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

		//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
		loadPhotos(page);

		$('.arrow.right.page').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			page = page < photos.length/6 - 1 ? page + 1 : 0;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			setTimeout(function() {
				loadPhotos(page);
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.left.page').on('click', function(e) {
			$('.inner-content').addClass('fade-out');
			page = page > 0 ? page - 1 : photos.length/6 - 1;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			setTimeout(function() {
				loadPhotos(page);
			}, 1000);
			setTimeout(function() {
				$('.inner-content').removeClass('fade-out');
			}, 1500);
		});

		$('.arrow.right.item').on('click', function(e) {
			largeIndex = largeIndex < photos.length - 1 ? largeIndex + 1 : 0;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			$('.fullscreen-container').css('background-image', 'url("./photos/' + photos[largeIndex] + '")');
		});

		$('.arrow.left.item').on('click', function(e) {
			largeIndex = largeIndex > 0 ? largeIndex - 1 : photos.length - 1;
			//$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
			$('.fullscreen-container').css('background-image', 'url("./photos/' + photos[largeIndex] + '")');
		});

		$('.back-button').on('click', function() {
			$('.photos-full').css('background-image', 'url("./assets/photos-bg.jpg")');
			$('.photos-wrapper').css('display', 'flex');
			$('.fullscreen-container').css('display', 'none');
		})
	});

	var largeIndex = 0;
	var photos = [
		''
	];

	function loadPhotos(page) {
		$('.photo').each(function(i) {
			var index = page * 6 + i;
			$(this).css('background-image', 'url("./photos/' + photos[index] + '")');

			$(this).on('click', function() {
				var image = $(this).css('background-image');
				var filename = image.substring(image.lastIndexOf('/') + 1, image.lastIndexOf(')'));
				largeIndex = photos.indexOf(filename);

				$('.photos-full').css('background', 'black');
				$('.fullscreen-container').css('background-image', image);
				$('.photos-wrapper').css('display', 'none');
				$('.fullscreen-container').css('display', 'flex');
			})
		})
	}
}(jQuery));