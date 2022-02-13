const handleMutations = (mutations) => {

    if (window.location.href.indexOf('https://www.italki.com/booking/date') == -1) {
        return;
    }

    for (const mutation of mutations) {
        if (mutation.type === 'childList') {
            for (const node of mutation.addedNodes) {
                if (node.classList.contains('booking-calendar-body')) {
                    addAriaAttributes(node);
                }
            }
        }
    }
};

const addAriaAttributes = (calendarBody) => {
    const dates = Array.from(
        document.getElementsByClassName('calendar-head-cell subhead'),
        (element) => element.textContent
    );

    const hours = Array.from(
        document.getElementsByClassName('caldendar-time-cell subhead'),
        (element) => element.textContent
    );

    for (const calendarCell of document.getElementsByClassName('calendar-cell')) {
        const [dateIndex, hourIndex] = getDateAndHourIndexForCell(calendarCell);
        calendarCell.setAttribute('aria-label', hours[hourIndex] + ' ' + dates[dateIndex]);
        calendarCell.setAttribute('tabindex', 0);
        hideCellIfUnavailable(calendarCell);
    }
};

const getDateAndHourIndexForCell = (cell) => {
    const indexAttribute = cell.getAttribute('data-cy').split('_');
    return [indexAttribute[indexAttribute.length - 2], indexAttribute[indexAttribute.length - 1]];
};

const hideCellIfUnavailable = (calendarCell) => {
    if (!calendarCell.classList.contains('calendar-cell-actived')) {
        calendarCell.setAttribute('aria-hidden', true);
    }
};

const observer = new MutationObserver(handleMutations);
observer.observe(document.body, {
    childList: true,
    subtree: true
});