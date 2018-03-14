(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');

		content.removeClass('fade-in');

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
	});
}(jQuery));