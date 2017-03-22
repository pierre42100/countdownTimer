/**
 * Countdown library
 * 
 * (c) all rights reserved
 *
 * Licensed under the MIT LICENSE
 *
 * @author Pierre HUBERT
 */

/**
 * The countdown libary
 */
var countdownLibary = {

	/**
	 * @var When the time will be up (updated using initialization)
	 */
	__timeEnd: 1,

	/**
	 * @var The target where numbers will appear
	 */
	__target: "",

	/**
	 * @var Countdown timer autorefresh interval
	 */
	__autoRefresh: "",

	/**
	 * Initializate countdown timer
	 *
	 * @param {String} target Where does countdown appears (ID of target)
	 * @param {Integer} timeEnd When does countdown finishes
	 */
	initializate(target, timeEnd){

		//Set target
		this.__setTarget(target);

		//Set timeEnd
		this.__setTimeEnd(timeEnd);

		//Set countdown timer interval
		this.__autoRefresh = setInterval("countdownLibary.refreshCountdownTimer();", 1000);

		//Message
		console.log("Countdown timer ready for "+target+" !");
	},

	/**
	 * Refresh countdown timer
	 */
	refreshCountdownTimer: function(){
		//Get remaining time
		var remainingTime = this.__getRemainingTime();

		//Calculate time without any external libary
		//Seconds
		var seconds = remainingTime-Math.floor(remainingTime/60)*60;

		//Remove seconds - go to minutes stage
		remainingTime=(remainingTime-seconds)/60;

		var minutes = remainingTime-Math.floor(remainingTime/60)*60;

		//Go to hours floor
		remainingTime=(remainingTime-minutes)/60

		var hours = remainingTime-Math.floor(remainingTime/24)*24;

		//Go to day floor
		remainingTime=(remainingTime-hours)/24;

		var day = remainingTime-Math.floor(remainingTime/30)*30;

		//Go to month floor
		remainingTime=(remainingTime-day)/30;

		var month = remainingTime-Math.floor(remainingTime/12);

		//Go to year floor and save it
		year = (remainingTime-month)/12;

		var timeString = year+"/"+month+"/"+day+" "+hours+":"+minutes+":"+seconds;

		//Show remaining time
		this.__target.innerHTML = timeString;
	},

	/**
	 * Set a new end to countdown timer (in seconds)
	 *
	 * @param {Integer} The seconds of the end
	 */
	__setTimeEnd: function(newTimeEnd){
		//Set new time end (secure)
		this.__timeEnd = newTimeEnd*1;
	},

	/**
	 * Set a new target for countdown timer
	 *
	 * @param {String} newTarget ID of the target
	 */
	__setTarget: function(newTarget){
		//Get target element
		var targetElem = document.getElementById(newTarget);

		//Continue on success
		if(targetElem){
			//Set new time end (secure)
			this.__target = targetElem;
		}
		
		//Else display an error
		else {
			console.log("Error: element '"+newTarget+"' not found ! Can't set a new countdown timer target !");
		}
	},


	/**
	 * Get remaining time in seconds (end timestamp - current timestamp)
	 *
	 * @return {Integer} Number of remaining seconds
	 */
	__getRemainingTime: function(){
		var d = new Date();
		var timestamp = Math.round(d.getTime()/1000);

		return this.__timeEnd - timestamp;
	}

}
