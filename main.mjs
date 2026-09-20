import { AURELIAN_CALENDAR, AURELIAN_CALENDAR_FORMATTER, AurelianCalendar } from "./calendar-aurelian.mjs";

Hooks.on("dnd5e.setupCalendar", () => {
    CONFIG.DND5E.calendar.calendars.push({
        value: "aurelian",
        label: "Aurelian Seasonal Calendar",
        config: AURELIAN_CALENDAR,
        class: AurelianCalendar
    })
    CONFIG.DND5E.calendar.formatters.push(AURELIAN_CALENDAR_FORMATTER);
});