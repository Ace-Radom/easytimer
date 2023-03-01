var timer = null;

var counter;
var startTime;
var timer_temp;

const normal_elapse = 1000;
const finish_sign = "<strong>00:00:00</strong>";

var next_elapse = normal_elapse;

window.onload = function(){
    pause_button.disabled = true;
    hour_input.value = "00";
    min_input.value = "00";
    sec_input.value = "00";
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
    var hour_str = hour_num < 10 ? ( "0" + hour_num ) : hour;
    var min_str = min_num < 10 ? ( "0" + min_num ) : min;
    var sec_str = sec_num < 10 ? ( "0" + sec_num ) : sec;
    var time_output_init = hour_str + ":" + min_str + ":" + sec_str;
    timer_temp = time_output_init;
    // save this str to timer_temp (usually as "hh:mm:ss")

    timer_main.innerHTML = "<strong>" + time_output_init + "</strong>";
    window.clearTimeout( timer );
    window.clearInterval( timer );
}

function start(){
    start_button.disabled = true;
    pause_button.disabled = false;
    set_button.disabled = true;
    cancel_button.disabled = false;

    counter = 0;
    startTime = new Date().valueOf();
    // init start time

    timer = window.setInterval( "onTimer()" , next_elapse );
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

    timer_main.innerHTML = finish_sign;
    window.clearTimeout( timer );
    window.clearInterval( timer );
}

function onTimer(){
    if ( timer_main.innerHTML == finish_sign )
    {
        window.clearInterval( timer );
        timer_main.innerHTML = "<strong>Time's up!</strong>";
        start_button.disabled = true;
        pause_button.disabled = true;
        set_button.disabled = false;
        cancel_button.disabled = true;
        return;
    } // time's up

    var time_obj = new String( timer_temp ).split( ":" );
    var h = new Number( time_obj[0] );
    var m = new Number( time_obj[1] );
    var s = new Number( time_obj[2] );
    // get the time now

    s -= 1;
    if ( s < 0 )
    {
        s = 59;
        m -= 1;
    } // renew min
    if ( m < 0 )
    {
        m = 59;
        h -= 1;
    } // renew hour

    var hour_str = h < 10 ? ( "0" + h ) : h;
    var min_str = m < 10 ? ( "0" + m ) : m;
    var sec_str = s < 10 ? ( "0" + s ) : s;
    var time_now = hour_str + ":" + min_str + ":" + sec_str;
    timer_temp = time_now;
    timer_main.innerHTML = "<strong>" + time_now + "</strong>";

    // here can add sth: for example when there's only one min left, make the time red

    window.clearInterval( timer );

    counter++;
    var counterSecs = counter * 1000;
    var elapseSecs = new Date().valueOf() - startTime;
    var diffSecs = counterSecs - elapseSecs;
    next_elapse = normal_elapse + diffSecs;
    if ( next_elapse < 0 )
    {
        next_elapse = 0;
    }
    // calibration

    timer = window.setInterval( "onTimer()" , next_elapse );
}