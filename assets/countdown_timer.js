var timer = null;

/* Note on the counter variable:
The counter variable counts downward from the time that is previously
set. When below zero, it acts as a helper for flashing text instead of
(sensibly) counting downward.
*/
var duration;
var counter = 0;
var startTime;

const normal_elapse = 1000;

var next_elapse = normal_elapse;

window.onload = function(){
    pause_button.disabled = true;
    hour_input.value = "00";
    min_input.value = "00";
    sec_input.value = "00";
}

// region finished by y5nw

function padZero(n) {
    return n < 10 ? "0" + n : n;
}

function updateCounter() {
    let t = Math.max( counter, 0 );
    let h = Math.floor( t / 3600 );
    let m = Math.floor( t / 60 ) % 60;
    let s = Math.floor( t ) % 60;
    // here can add sth: for example when there's only one min left, make the time red
    timer_main.innerHTML = `<strong>${padZero(h)}:${padZero(m)}:${padZero(s)}</strong>`
    let color = "#a3dafd";
    if ( duration != undefined ) { // color text (esp. zero) only if the timer was previous started
        if ( counter < 0 && counter % 2 == 0 )
        {
            color = "red";
        } else if ( counter < 60 )
        {
            color = "yellow";
        }
    }
    timer_main.style.color = color;
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
    counter = hour_num * 3600 + min_num * 60 + sec_num;
    duration = undefined;
    updateCounter();

    window.clearTimeout( timer );
}

function start(){
    start_button.disabled = true;
    pause_button.disabled = false;
    set_button.disabled = true;
    reset_button.disabled = false;

    startTime = new Date().valueOf();
    // init start time

    if (counter < 0) {
        counter = 0;
    }
    duration = counter;
    timer = window.setTimeout( "onTimer()" , next_elapse );
}

function pause(){
    start_button.disabled = false;
    pause_button.disabled = true;
    set_button.disabled = false;

    window.clearTimeout( timer );
}

function reset(){
    start_button.disabled = false;
    pause_button.disabled = true;
    set_button.disabled = false;
    reset_button.disabled = true;

    hour_input.value = "00";
    min_input.value = "00";
    sec_input.value = "00";

    setTime();
}

function onTimer(){
    counter--;
    updateCounter();
    window.clearTimeout( timer );
    if ( counter <= 0 )
    {
        start_button.disabled = true;
        pause_button.disabled = true;
        set_button.disabled = false;
        reset_button.disabled = false;
        timer = window.setTimeout( "onTimer()" , 500 );
        return;
    } // time's up

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

updateCounter();
