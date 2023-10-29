function myCalendarScript() {

    const bCalendar = CalendarApp.getCalendarById('b@calendar.com');
    const aCalendar = CalendarApp.getCalendarById('a@calendar.com');
    const cCalendar = CalendarApp.getDefaultCalendar();

    const now = new Date();
    const fourthFriday = new Date();

    const offset = ((11 - now.getDay()) % 7) + 1 + 28;
    new Date(fourthFriday.setDate(now.getDate() + offset));

    let cEvents = cCalendar.getEvents(now, fourthFriday);
    let aEvents = aCalendar.getEvents(now, fourthFriday);
    let bEvents = bCalendar.getEvents(now, fourthFriday);

    updateCalendar(bEvents, cEvents, cCalendar);
    cleanCalendar(cEvents, bEvents, aEvents, cCalendar);

}

function updateCalendar(bEvents, cEvents, cCalendar) {
    let bEvent;

    for(let i=0; i<bEvents.length; i++) {
        bEvent = bEvents[i];

        if(checkCFor(bEvent) === -1) {
            console.log('Missing Event ' + bEvent.getStartTime());
            createEvent(bEvent, cCalendar);
        }
    }

    function checkCFor(bEvent) {
        let result = -1;
        let i=0;
        while(i<cEvents.length && result === -1) {
            if(cEvents[i].getStartTime().getTime() === bEvent.getStartTime().getTime()
                && cEvents[i].getEndTime().getTime() === bEvent.getEndTime().getTime()) {
                result = 1;
            }
            i++;
        }
        return result;
    }

}

function createEvent(bEvent, cCalendar) {
    cCalendar.createEvent('Ini Busy', bEvent.getStartTime(), bEvent.getEndTime());
}

function cleanCalendar(cEvents, bEvents, aEvents, cCalendar) {
    let cEvent;

    for(let i=0; i<cEvents.length; i++) {
        cEvent = cEvents[i];
        if(cEvent.getTitle() === 'Ini Busy') {
            clean(cEvent);
        }
    }


    function clean(cEvent) {
        let bCheck = checkBFor(cEvent);
        let aCheck = checkAFor(cEvent);
        if (bCheck === -1 && aCheck === -1) {
            //delete event
            cEvent.deleteEvent();
        }
    }

    function checkBFor(cEvent) {
        let result = -1;
        let i = 0;
        while(i<bEvents.length && result === -1) {
            if(bEvents[i].getStartTime().getTime() === cEvent.getStartTime().getTime()
                && bEvents[i].getEndTime().getTime() === cEvent.getEndTime().getTime()) {
                result = 1;
            }
            i++;
        }
        return result;
    }

    function checkAFor(cEvent) {
        let result = -1;
        let i = 0;
        while(i<aEvents.length && result === -1) {
            if(aEvents[i].getStartTime().getTime() === cEvent.getStartTime().getTime()
                && aEvents[i].getEndTime().getTime() === cEvent.getEndTime().getTime()) {
                result = 1;
            }
            i++;
        }
        return result;
    }
}



