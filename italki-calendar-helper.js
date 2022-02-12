var isItalkiCalendarHelperInitialized = false;
var TIMEOUT_DEFAULT_AFTER_PAGE_LOAD = 5000;
var DEFAULT_TIMEOUT_AFTER_WEEK_CHANGE = 3000;

function generateAriaLabelForItalkiCalendar() {
    var timeElements = document.getElementsByClassName('caldendar-time-cell');

    var times= [];

    for(timeE of timeElements) {
        times.push(timeE.textContent);
    }

    var dateElements = document.getElementsByClassName('calendar-head-cell');

    var dates= [];

    for(dateE of dateElements) {
        dates.push(dateE.textContent);
    }

    var cells = document.getElementsByClassName('calendar-cell');

    var timesLen = times.length;
    var datesLen = dates.length;

    for(let i = 0; cells.length > i;i++) {
        var cell = cells[i];
        var dateColumn = Math.floor(i/timesLen);
        var timeColumn = i % timesLen;

        if(cell.classList.contains("calendar-cell-actived")) {
            cell.setAttribute('tabindex', '-1');
        } else {
            cell.setAttribute('aria-hidden', 'aria-hidden');
        }

        cell.setAttribute('aria-label',times[timeColumn]+" "+dates[dateColumn]);
    }
}

function generateAriaLabelForItalkiCalendarAfterTimeout() {
    console.log('clicked');
    setTimeout(() => {
        generateAriaLabelForItalkiCalendar();
        addListenerOnWeekChange();
    }, DEFAULT_TIMEOUT_AFTER_WEEK_CHANGE);
}

function addListenerOnWeekChange() {
    var nextWeekElement = document.getElementsByClassName('next-week');
    var prevWeekElement = document.getElementsByClassName('prev-week');
    
    if(nextWeekElement.length) {
        console.log('Added next listener!');
        nextWeekElement[0].addEventListener('click',generateAriaLabelForItalkiCalendarAfterTimeout, true);
    }

    if(prevWeekElement.length) {
        console.log('Added prev listener!');
        prevWeekElement[0].addEventListener('click',generateAriaLabelForItalkiCalendarAfterTimeout, true);
    }
}

function initializeItalkiHelper() {
    generateAriaLabelForItalkiCalendar();
    addListenerOnWeekChange();

    isItalkiCalendarHelperInitialized = true;
}

if(window.location.href.indexOf('https://www.italki.com/booking/date') > -1
&& !isItalkiCalendarHelperInitialized) {
    setTimeout(initializeItalkiHelper, TIMEOUT_DEFAULT_AFTER_PAGE_LOAD);
}
