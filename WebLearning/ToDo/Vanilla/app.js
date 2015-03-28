(function(){
	//Set focus on input textbox by default
	$('#intodo').focus();
	
	//Create a modal, which contains an array to hold list of todos
	
	//Create a controller, which acts as a mediator between View and Modal
	
	//Create a View, which interacts with Controller and alters the display in HTML
	var View = function(){
		function test(){
			alert("Worked");
		}
	};
	
	//Set ENTER key on the input text box
	$('#intodo').keypress(function (e){
		if((e.which && e.which == 13) || (e.keyCode && e.KeyCode == 13)){
			alert("Worked");
		}
	});
})();