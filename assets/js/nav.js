let nav="<ul><li><a href='menger.html'>menger</a></li><li><a href='flower.html'>flower</a></li><li><a href='sache.html'>sache</a></li><li><a href='concentric.html'>concentric</a></li><li><a href='jazz.html'>jazz</a></li></ul>";
$("nav").append(nav);
const currentPage = window.location.pathname.split('/').pop().replace('.html', '');
$('ul li').each(function() {
	if ($(this).text().trim() === currentPage) {
		$(this).css('font-weight', 'bold');
	}
});