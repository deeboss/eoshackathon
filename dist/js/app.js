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

var publisherInitialBalance = 0;
var publisherRemainingBalance;
var publisherUpdatedBalance;
var tokenDistributed;
var publishCost;
var balanceToDate;
var tokensStaked = 2000;


$(document).ready(function(){
	$.getJSON( "http://cdneos.hextech.io:3000/balances", function( json ) {
	  publisherInitialBalance = json.rows[ 2 ].balance;
	 });
})


// Land on website and register
$(document).on("click", '#registerPublisher', function(){
	$('.landing-page--container').fadeOut();
	setTimeout(function(){
		$('.app--container').fadeIn();
		$('#publisherOnboarding').fadeIn();
		setTimeout(function(){
			$('#remainingBalance').animateNumber({ number: publisherInitialBalance });
			// /$('#remainingBalance').text(publisherInitialBalance);
		}, 1000)
	}, 300)
})


// Add Item on website input to group
$('#websiteInput').focus(function(){
	$(this).val('www.hexcapitalgroup.com');
})

$('#addWebsite').on("click", $(this), function(){
	$('#addWebsite').attr('disabled', 'true')
	$('#websiteGroup').append('<li class="new">' + 'www.hexcapitalgroup.com' + '</li>');
	$('#websiteInput').val('');

	setTimeout(function(){
		$('#websiteGroup li').removeClass("new");
	}, 1000)
})


$('#serviceSelect1').on("click", $(this), function(){
	$.get( "http://cdneos.hextech.io:3000/registerurl1", function( data ) {
	  //alert( "Call was performed." );
	});

	$('.otherServiceLevel').fadeOut();

	publisherRemainingBalance = publisherInitialBalance - 1;

	$('#remainingBalance').text(publisherRemainingBalance);
})



// MOVE TO NEXT STEP (SUCCESS -> DASHBOARD)

$('#publisherOnboardingNext').on("click", $(this), function(){
	$('#publisherOnboarding').fadeOut();

	// Show tokenDistributed count
	// Loop through every 1 second and update it.
	window.setInterval(function(){
		$.getJSON( "http://cdneos.hextech.io:3000/balances", function( json ) {
		  publisherUpdatedBalance = json.rows[ 2 ].balance;
		 });

		tokenDistributed = publisherRemainingBalance - publisherUpdatedBalance;
		balanceToDate = tokenDistributed + tokensStaked;
		// console.log("tokenDistribtued = " + tokenDistributed ", publisherRemainingBalance = " + publisherRemainingBalance + ", publisherUpdatedBalance = " + publisherUpdatedBalance);
		console.log("tokenDistribtued = " + tokenDistributed);
		console.log("publisherRemainingBalance = " + publisherRemainingBalance);
		console.log("publisherUpdatedBalance = " + publisherUpdatedBalance);

		setTimeout(function(){
			if (isNaN(tokenDistributed) || publisherUpdatedBalance == 0) {
				//publisherUpdatedBalance = 0;
			} else {
				$('#tokensDistributed').text(tokenDistributed);

				$('#balanceEarned').text(tokenDistributed);

				$('#balanceToDate').text(balanceToDate);

				$('#urlsServed').text(tokenDistributed)
			}
		}, 500)

	}, 1500);



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
$(document).on("click", '#callAPI', function(){
	// $.ajax({
	//   url: 'http://10.101.3.150:3000/balances',
	//   data: '',
	//   dataType: "json",
	//   success: function (data) {
 //            console.log(data);
 //            alert(data.RMA_ID);
 //        }
	// });

	$.getJSON( "http://cdneos.hextech.io:3000/balances", function( json ) {
	  var initialBalance = json.rows[ 2 ].balance;

	  alert(initialBalance);
	 });
})

// $(document).on("click", '#callAPI', function(){
// 	$.get( "http://10.101.3.150:3000/balances", function( data ) {
// 	  console.log( "Data Loaded: " + data );
// 	});
// })

