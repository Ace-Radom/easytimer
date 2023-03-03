var timer = null;

var counter = 0;
var tcount = 0;
var startTime;

const normal_elapse = 10;
// count every 10ms

var next_elapse = normal_elapse;

window.onload = function(){
    start_button.disabled = false;
    stop_button.disabled = true;
    reset_button.disabled = true;

    stopwatch_main.style.color = "#A3DAFD";
}

function padZero( n ){
    return n < 10 ? "0" + n : n;
}

function updateCounter(){
    let m = Math.floor( counter / 100 / 60 );
    let s = Math.floor( counter / 100 ) % 60;
    let ms = Math.floor( counter ) % 100;

    stopwatch_main.innerHTML = `<strong>${padZero( m )}:${padZero( s )},${padZero( ms )}</strong>`;
}

function start(){
    start_button.disabled = true;
    stop_button.disabled = false;
    reset_button.disabled = true;

    startTime = new Date().valueOf();
    // init start time

    timer = window.setTimeout( "onTimer()" , next_elapse );
}

function stop(){
    start_button.disabled = false;
    stop_button.disabled = true;
    reset_button.disabled = false;
    
    tcount = 0;
    window.clearTimeout( timer );
}

function reset(){
    start_button.disabled = false;
    stop_button.disabled = true;
    reset_button.disabled = true;

    counter = 0;
    tcount = 0;
    updateCounter();
    window.clearTimeout( timer );
}

function onTimer(){
    counter++;
    tcount++;
    updateCounter();
    window.clearTimeout( timer );

    var tcountSecs = tcount * 10;
    var elapseSecs = new Date().valueOf() - startTime;
    var diffSecs = tcountSecs - elapseSecs;
    next_elapse = normal_elapse + diffSecs;
    if ( next_elapse < 0 )
    {
        next_elapse = 0;
    }
    // calibration

    timer = window.setTimeout( "onTimer()" , next_elapse );
}

updateCounter();