// Table of Contents
//
/***
.login-form
#publisherOnboarding
#publisherOnboardingSuccess
#publisherDashboard


#nodeOnboarding
#nodeDashboard




***/

$(document).ready(function(){
})


// Land on website and register
$(document).on("click", '#registerPublisher', function(){
	$('.landing-page--container').fadeOut();
	setTimeout(function(){
		$('.app--container').fadeIn();
		$('#publisherOnboarding').fadeIn();
	}, 300)
})


// Add Item on website input to group
$('#websiteInput').focus(function(){
	$(this).val('www.hexcapitalgroup.com');
})

$('#addWebsite').on("click", $(this), function(){
	$('#addWebsite').attr('disabled', 'true')
	$('#websiteGroup').append('<li>' + 'www.hexcapitalgroup.com' + '</li>');
	$('#websiteInput').val('');
})


// MOVE TO NEXT STEP (SUCCESS -> DASHBOARD)

$('#publisherOnboardingNext').on("click", $(this), function(){
	$('#publisherOnboarding').fadeOut();

	setTimeout(function(){
		$('#publisherOnboardingSuccess').fadeIn();

		setTimeout(function(){
			$('.success--callout').addClass("appear");	

			setTimeout(function(){
				$('.success--callout').removeClass("appear");				
			}, 2000)

		}, 300);
	}, 300);
})


// HIDE PUBLISHER, SHOW THE NODES


// SPLIT THE SCREEN

$('#splitScreen').on("click", $(this), function(){
	$(this).fadeOut();
	$('.main--app-container').addClass("split-screen");
	$('.node-exp--container').fadeIn();
})

// $(document).keypress(function(e) {
// 	alert("hello");
// }






// API CALLS
// $(document).on("click", '#callAPI', function(){
// 	$.ajax({
// 	  url: 'http://10.101.3.150:3000/balances',
// 	  data: data,
// 	  success: success,
// 	  dataType: dataType
// 	});
// })


$(document).on("click", '#callAPI', function(){
	$.get( "http://10.101.3.150:3000/balances", function( data ) {
	  alert( "Load was performed." );
	});
})