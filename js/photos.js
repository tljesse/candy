(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');
		var index = 0;

		content.removeClass('fade-in');

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});

		$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');

		$('.arrow.right').on('click', function(e) {
			index = index < photos.length - 1 ? index + 1 : 0;
			$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
		});

		$('.arrow.left').on('click', function(e) {
			index = index > 0 ? index - 1 : photos.length - 1;
			$('.photos-full').css('background-image', 'url("./photos/' + photos[index] + '")');
		});
	});

	var photos = [
		'',
		''
	];

}(jQuery));