$(function(){

	console.log("loading country");

	function loadCountry(){

  		$.getJSON("/api/country/", function(country){
	
	
			console.log(country);
			var msg = "No country";
			if(country.length > 0){
			
				msg = country[0].country + ", " + country[0].city;
			};

			$(".intro-lead-in").text(msg);

		});	
 	};

	loadCountry();
	setInterval(loadCountry,3000);
});