(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');

		var stories = [
			{
				'caption': 'story',
				'video': 'url',
				'thumb': 'url'
			}
		];

		content.removeClass('fade-in');

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});

		for (var i = 0; i < stories.length; i++) {
			$('.video-' + i + ' h3').text(stories[i].caption);
		}
	});
}(jQuery));