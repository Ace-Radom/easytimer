var timer = null;

var duration;
var counter;
var startTime;

const normal_elapse = 1000;

var next_elapse = normal_elapse;

window.onload = function(){
    pause_button.disabled = true;
    hour_input.value = "00";
    min_input.value = "00";
    sec_input.value = "00";
}

function padZero(n) {
	return n < 10 ? "0" + n : n;
}

function updateCounter() {
    let h = Math.floor(counter/3600);
    let m = Math.floor(counter/60)%60;
    let s = Math.floor(counter)%60;
    // here can add sth: for example when there's only one min left, make the time red
    timer_main.innerHTML = `<strong>${padZero(h)}:${padZero(m)}:${padZero(s)}</strong>`
}

function setTime(){
    start_button.disabled = false;
    pause_button.disabled = true;
    set_button.disabled = false;

    var hour = hour_input.value;
    var min = min_input.value;
    var sec = sec_input.value;

    if ( isNaN( hour ) || isNaN( min ) || isNaN( sec ) )
    {
        return;
    } // one of the inputs isn't a number, return

    var hour_num = new Number( hour );
    var min_num = new Number( min );
    var sec_num = new Number( sec );
    counter = hour_num*3600+min_num*60+sec_num;
    updateCounter();

    window.clearTimeout( timer );
}

function start(){
    start_button.disabled = true;
    pause_button.disabled = false;
    set_button.disabled = true;
    cancel_button.disabled = false;

    startTime = new Date().valueOf();
    // init start time

    duration = counter;
    timer = window.setTimeout( "onTimer()" , next_elapse );
}

function pause(){
    start_button.disabled = false;
    pause_button.disabled = true;
    set_button.disabled = false;

    window.clearTimeout( timer );
}

function cancel(){
    start_button.disabled = false;
    pause_button.disabled = true;
    set_button.disabled = false;
    cancel_button.disabled = true;

    setTime();
}

function onTimer(){
    counter--;
    if ( counter < 0 )
    {
        window.clearTimeout( timer );
        timer_main.innerHTML = "<strong>Time's up!</strong>";
        start_button.disabled = true;
        pause_button.disabled = true;
        set_button.disabled = false;
        cancel_button.disabled = true;
        return;
    } // time's up

    updateCounter();

    window.clearTimeout( timer );

    var counterSecs = (duration-counter) * 1000;
    var elapseSecs = new Date().valueOf() - startTime;
    var diffSecs = counterSecs - elapseSecs;
    next_elapse = normal_elapse + diffSecs;
    if ( next_elapse < 0 )
    {
        next_elapse = 0;
    }
    // calibration

    timer = window.setTimeout( "onTimer()" , next_elapse );
}
