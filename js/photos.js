(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');

		content.removeClass('fade-in');

		$('.home-button').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				window.location.href = './index.html';
			}, 1200);
		});
	})
}(jQuery));