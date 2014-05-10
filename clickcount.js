Clicks = new Meteor.Collection("clicks");

if (Meteor.isClient) {
	Template.click.nClicks = function(){
		Meteor.call("clicks");
		return Session.get("clicks");
	};
	Template.click.isWinner = function(){
		Meteor.call("clicks")
		clicks = Session.get("clicks");
		if(clicks%5 === 0)
			return true;
		else
			return false;
	};
	Template.click.events({
		'click input': function () {
			// template data, if any, is available in 'this'
			time = new Date().getTime()
			newClick = {
				time: time,
			}
			var id = Clicks.insert(newClick);
			if (typeof console !== 'undefined')
				console.log("Just inserted '" + id + "'into Clicks");
		}
	});
	Template.shoutbox.shoutboxText = function(){
		return Session.get("shoutboxText");
	};
	Template.shoutbox.events({
		'click #submitShout': function(){
			text = $("#shoutboxInput").val();
			if(text){
				Session.set("shoutboxText", text);
			}
		}
	});
}

Meteor.methods({
	clicks: function(){
		Session.set("clicks", Clicks.find().count());
	}
});

if (Meteor.isServer) {
	//Stuff will go here eventually
};
