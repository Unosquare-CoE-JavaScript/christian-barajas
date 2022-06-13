
const dayStart = "07:30";
const dayEnd = "17:45";

const scheduleMeeting = function scheduleMeeting(startTime, durationMinutes) {
    // TODO

    const [hour,minutes] = startTime.split(":")

    // Check if startTime is After dayStart
    const [startHour, startMinutes] = dayStart.split(":");
    let isAfterStartHour = (hour >= startHour && minutes >= startMinutes);

    
    // Check if startTime is before dayEnd
    const [endHour, endMinutes] = dayEnd.split(":");
    let isBeforeEndHour = (hour <= endHour && minutes <= endMinutes);

    console.log(
        startTime, 
        durationMinutes,
        (isAfterStartHour && isBeforeEndHour)
    )
}

const scheduleMeetingCorrect = function scheduleMeetingCorrect(startTime,durationMinutes) {

    const [hour,minutes] = startTime.split(":")

    durationMinutes = Number(durationMinutes);

    if (
        typeof hour == "string" &&
        typeof minutes == "string"
    ) {
        const durationHours = Math.floor(durationMinutes / 60);
        durationMinutes = durationMinutes -(durationHours * 60);

        let classEndHour = Number(hour) + durationHours;
        let classEndMinutes = Number(minutes) + durationMinutes;

        if (classEndMinutes >= 60) {
            classEndHour += 1;
            classEndMinutes -= 60;
        }

        // Re-composing fully-qualified time strings
        // To make easy comparison

        let classStart = `${hour.padStart(2,0)}:${minutes.padStart(2,0)}`
        let classEnd = `${String(classEndHour).padStart(2,0)}:${String(classEndMinutes).padStart(2,0)}`

        // NOTE: since expressions are all strings, 
        // comparisons here are alphabetic, but it's
        // safe here since they're fully qualified time strings

        console.log(
            startTime, 
            durationMinutes,
            (
                classStart >= dayStart &&
                classEnd <= dayEnd
            ),
        )
    }

    return false;
}

// Desired Behavior
scheduleMeeting("7:00",15);     // false
scheduleMeeting("07:15",30);    // false
scheduleMeeting("7:30",30);     // true
scheduleMeeting("11:30",60);    // true
scheduleMeeting("17:00",45);    // true
scheduleMeeting("17:30",30);    // false
scheduleMeeting("18:00",15);    // false

console.log("\n")

scheduleMeetingCorrect("7:00",15);     // false
scheduleMeetingCorrect("07:15",30);    // false
scheduleMeetingCorrect("7:30",30);     // true
scheduleMeetingCorrect("11:30",60);    // true
scheduleMeetingCorrect("17:00",45);    // true
scheduleMeetingCorrect("17:30",30);    // false
scheduleMeetingCorrect("18:00",15);    // false
