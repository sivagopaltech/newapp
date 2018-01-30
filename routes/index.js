var express = require('express');
var {mongoose} = require("./../db/mongoose");
var {WinnerSlot} = require("./../models/winner_slots.js");
var {SweepUserEntry} = require("./../models/sweep_user_entries.js");

var router = express.Router();
var msg;
/* GET home page. */
router.get('/', function(req, res, next) {
	// WinnerSlot.findOne({ 
	//     		lucky_timestamp: { $lt: 12345 } 
	//     	})
	// var entry = new SweepUserEntry({
 //        'email': "siva"+Math.random()+"@votigo.com",
 //        'first_name': "siva",
 //        'last_name': "gopal"
 //    });
 //    entry.save();
 
    // SweepUserEntry.find().then((docs) => {
    // 	res.send(docs);
    // });
    res.render('index', { msg: "" });
});

router.post('/', function(req, res, next) {
	var curTime = Math.round(Date.now()/1000);
	var entry = new SweepUserEntry({
        'email': req.body.email,
        'first_name': req.body.first_name,
        'last_name': req.body.last_name
    });
    entry.save().then((sweepUser) => {
    		var enteredTime = Math.round(new Date(sweepUser._id.getTimestamp().getTime() / 1000));
	    	WinnerSlot
		    .findOne({ 
	    		lucky_timestamp: { $lt: enteredTime },
	    		ocuupied_timestamp: null
	    	}).then((slot) => {
	    		console.log(enteredTime);
	    		console.log(slot);
	    		WinnerSlot
	    		.findByIdAndUpdate(slot._id, 
	    			{
	    			$set: {
	    					ocuupied_timestamp: enteredTime,
	    					entry_id: sweepUser._id
	    				  }
	    			})
	    		.then((newSlot) => {
	    			console.log(enteredTime);
	    			console.log(newSlot);
			      console.log("updated winner slot");
			    }).catch((e) => {
			      console.log("unable updated winner slot");
			      console.log(e);
			    });
			    SweepUserEntry
	    		.findByIdAndUpdate(sweepUser._id, 
	    			{
	    			$set: {
	    					is_winner: true,
	    				  }
	    			})
	    		.then((updatedSweepUser) => {
	    			console.log(updatedSweepUser);
			      console.log("updated sweep user");
			    }).catch((e) => {
			      console.log("unable update sweep user");
			      console.log(e);
			    });
	        	msg = "You have won a prize!";
		    }, (e) => {
		    	msg = "Unable to save entry please try again";
		      	console.log(e);
		    });
    }, (e) => {
    	msg = "Unable to save entry please try again";
    	console.log(e);
    });
    res.render('index', { msg: msg });
});

module.exports = router;
