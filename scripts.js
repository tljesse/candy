(function($) {
	'use strict';

	$(document).ready(function() {
		var content = $('.content');

		content.removeClass('fade-in');

		$('.commercials').on('click', function() {
			content.addClass('fade-out');
			setTimeout(function() {
				
			}, 1200);
		});
	});
}(jQuery));