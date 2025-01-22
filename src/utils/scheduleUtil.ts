import moment from "moment";

type AvailableWorkDay = {
    dayOfWeek: string;
    date: string;
    hours: string[];
};

type AvailableWorkSchedule = AvailableWorkDay[];

function getAvailableWorkHours(workSchedule: any): AvailableWorkSchedule {
    const currentDate = moment();
    const startOfWeek = currentDate.clone().startOf("week").add(1, "day");
    const startOfNextWeek = startOfWeek.clone().add(7, "days");

    const availableDays = workSchedule.availableTimes || [];
    const dayOfWeekMap: { [key: string]: number } = {
        monday: 1,
        tuesday: 2,
        wednesday: 3,
        thursday: 4,
        friday: 5,
        saturday: 6,
        sunday: 7,
    };

    const result: AvailableWorkSchedule = [];

    for (const day of availableDays) {
        const dayIndex = dayOfWeekMap[day.dayOfWeek.toLowerCase()];
        const today = currentDate.day();

        // Xử lý ngày trong tuần này
        if (dayIndex >= today) {
            const dateThisWeek = startOfWeek.clone().add(dayIndex - 1, "days");

            if (dateThisWeek.isSameOrAfter(currentDate, "day")) {
                const hours = calculateAvailableHours(day, dateThisWeek, currentDate);
                if (hours.length > 0) {
                    result.push({
                        dayOfWeek: day.dayOfWeek,
                        date: dateThisWeek.format("YYYY-MM-DD"),
                        hours,
                    });
                }
            }
        }

        // Xử lý tuần sau
        const dateNextWeek = startOfNextWeek.clone().add(dayIndex - 1, "days");
        const hoursNextWeek = calculateAvailableHours(day, dateNextWeek);
        if (hoursNextWeek.length > 0) {
            result.push({
                dayOfWeek: day.dayOfWeek,
                date: dateNextWeek.format("YYYY-MM-DD"),
                hours: hoursNextWeek,
            });
        }
    }

    return result;
}

function calculateAvailableHours(day: {
    startTime: string;
    endTime: string;
    restTime: string[];
}, date: moment.Moment, currentDate?: moment.Moment): string[] {
    const startTime = moment(day.startTime, "HH:mm");
    const endTime = moment(day.endTime, "HH:mm");
    const restTimes = day.restTime ? day.restTime.map((time: string) => moment(time, "HH:mm")) : [];

    const availableHours: string[] = [];
    const loopTime = startTime.clone();

    while (loopTime.isBefore(endTime)) {
        const isRestTime = restTimes.some((restTime) => loopTime.isSame(restTime, "hour"));
        if (isRestTime) {
            loopTime.add(1, "hour");
            continue;
        }

        if (
            currentDate &&
            date.isSame(currentDate, "day") &&
            loopTime.isSameOrBefore(currentDate, "minute")
        ) {
            loopTime.add(1, "hour");
            continue;
        }

        availableHours.push(loopTime.format("HH:mm"));
        loopTime.add(1, "hour");
    }

    return availableHours;
}

export { getAvailableWorkHours };
