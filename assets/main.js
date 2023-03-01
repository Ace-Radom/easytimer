var timer = null;

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
    timer_main.innerHTML = "<strong>" + time_output_init + "</strong>";
    window.clearTimeout( timer );
    window.clearInterval( timer );
}