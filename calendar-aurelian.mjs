// import CalendarData5e from "dnd5e.dataModels.calendar";

const { ArrayField, NumberField, SchemaField, StringField } = foundry.data.fields;

// export class CalendarArsurun extends CalendarData5e {
//   /** @inheritDoc */
//   static defineSchema() {
//     const schema = super.defineSchema();
//     return {
//       ...schema,
//       festivals: new ArrayField(new SchemaField({
//         name: new StringField({ required: true }),
//         month: new NumberField({ required: true, nullable: false, min: 1, integer: true }),
//         day: new NumberField({ required: true, nullable: false, min: 1, integer: true })
//       }))
//     };
//   }

//   /* -------------------------------------------- */
//   /*  Calendar Helper Methods                     */
//   /* -------------------------------------------- */

//   /**
//    * Find festival day for current day.
//    * @param {number|Components} [time]      Time to use when finding festival day, by default the current world time.
//    * @returns {CalendarConfigHarptosFestival|null}
//    */
//   findFestivalDay(time=game.time.worldTime) {
//     const components = typeof time === "number" ? this.timeToComponents(time) : time;
//     return this.festivals
//       .find(f => f.month === (components.month + 1) && f.day === (components.dayOfMonth + 1)) ?? null;
//   }

//   /* -------------------------------------------- */
//   /*  Formatter Functions                         */
//   /* -------------------------------------------- */

//   /** @inheritDoc */
//   static formatMonthDay(calendar, components, options) {
//     const festivalDay = calendar.findFestivalDay(components);
//     return festivalDay ? _loc(festivalDay.name) : CalendarHarptos.formatLocalized(
//       "DND5E.CALENDAR.Harptos.Formatters.DayMonth", calendar, components, options
//     );
//   }

//   /* -------------------------------------------- */

//   /** @inheritDoc */
//   static formatMonthDayYear(calendar, components, options) {
//     const festivalDay = calendar.findFestivalDay(components);
//     if ( festivalDay ) {
//       const context = CalendarData5e.dateFormattingParts(calendar, components);
//       context.day = _loc(festivalDay.name);
//       return _loc("DND5E.CALENDAR.Harptos.Formatters.FestivalDayYear", context);
//     }
//     return CalendarHarptos.formatLocalized(
//       "DND5E.CALENDAR.Harptos.Formatters.DayMonthYear", calendar, components, options
//     );
//   }
// }

/* -------------------------------------------- */

export const AURELIAN_CALENDAR = {
  name: "Aurelian Calendar",
  years: {
    yearZero: 0,
    firstWeekday: 0,
    leapYear: {
      leapStart: 0,
      leapInterval: 0
    }
  },
  months: {
    values: [
      {
        name: "Rain", abbreviation: "Rain",
        ordinal: 1, days: 70
      },
      {
        name: "Bloom", abbreviation: "Bloom",
        ordinal: 2, days: 70
      },
      {
        name: "Glare", abbreviation: "Glare",
        ordinal: 3, days: 70
      },
      {
        name: "Mar", abbreviation: "Mar",
        ordinal: 4, days: 70
      },
      {
        name: "Wail", abbreviation: "Wail",
        ordinal: 5, days: 70
      }
    ]
  },
  days: {
    values: [
      { name: "Sun", ordinal: 1 },
      { name: "Moons", ordinal: 2 },
      { name: "Twysdel", ordinal: 3 },
      { name: "Wedding", ordinal: 4 },
      { name: "Thunder", ordinal: 5 },
      { name: "Friedom", ordinal: 6 },
      { name: "Stars", ordinal: 7 },
    ],
    daysPerYear: 350,
    hoursPerDay: 24,
    minutesPerHour: 60,
    secondsPerMinute: 60
  },
  seasons: {
    values: [
      { name: "Rain", dayStart: 1, dayEnd: 70 },
      { name: "Bloom", dayStart: 71, dayEnd: 140 }, 
      { name: "Glare", dayStart: 141, dayEnd: 210 }, 
      { name: "Mar", dayStart: 211, dayEnd: 280 },
      { name: "Wail", dayStart: 281, dayEnd: 350 } 
    ]
  }
};

export const AURELIAN_CALENDAR_FORMATTER = {
  value: "aurelian",
  label: "Aurelian Day/Month/Year",
  group: "DND5E.CALENDAR.Formatters.Date",
  formatter: (calendar, components, options) => {
    const month = calendar.months.values[components.month];
    const year_descriptor = components.year < 0 ? "VÊA" : "DA";
    const day_number_addition = components.dayOfMonth === 0 ? "st" : components.dayOfMonth === 1 ? "nd" : components.dayOfMonth === 2 ? "rd" : "th";
    return `${components.dayOfMonth + 1}${day_number_addition} ${month.name} ${components.year}${year_descriptor}`;
  }
}