$(window).load(function() {
	
	$('#myModal').modal('show');

	$('img').click(function(){
    	$('.edge-shadow').removeClass('edge-shadow');
    	$(this).addClass('edge-shadow');
	});

});