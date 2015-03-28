//Wrapping the JS in a closure is a good habit.
(function(){
	var app = angular.module('store',[ ]);//This array contains the dependencies.
	
	//Controller. The controller should always be Caps
	app.controller('StoreController', function(){
		//Assign the objec to a property of controller.
		this.products = gems;
	});
	
	//our JS object that we want to display in HTML
	var gems = [
		{
			name: 'Kohinoor',
			price: 10.44,
			description: 'The worlds costliest gem',
			canPurchase: true,
			soldOut: true
		},
		{
			name: 'A Gem',
			price: 10.44,
			description: 'The worlds A gem',
			canPurchase: true,
			soldOut: false
		},
		{
			name: 'B Gem',
			price: 10.44,
			description: 'The worlds B gem',
			canPurchase: true,
			soldOut: false
		}
	]
})();