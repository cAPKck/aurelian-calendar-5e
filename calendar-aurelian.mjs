const { ArrayField, NumberField, SchemaField, StringField } = foundry.data.fields;

// As described in the calendar 5e extension guide (copied from another 5e calendar extension)
export class AurelianCalendar extends dnd5e.dataModels.calendar.CalendarData5e {

  /** @inheritDoc */
  static defineSchema() {
    const schema = super.defineSchema();
    return {
      ...schema,
      holidays: new ArrayField(new SchemaField({
        name: new StringField({ required: true }),
        month: new NumberField({ required: true, nullable: false, min: 1, integer: true }),
        day: new NumberField({ required: true, nullable: false, min: 1, integer: true })
      }))
    };
  }

  /* -------------------------------------------- */
  /*  Calendar Helper Methods                     */
  /* -------------------------------------------- */

  /**
   * Find holiday for current day.
   * @param {number|Components} [time]      Time to use when finding holiday, by default the current world time.
   * @returns {CalendarConfigHarptosFestival|null}
   */
  findHoliday(time=game.time.worldTime) {
    const components = typeof time === "number" ? this.timeToComponents(time) : time;
    console.log("FINDING HOLIDAY FOR: ", components);
    console.log("HOLIDAYS: ", this.holidays);
    return this.holidays
      .find(f => f.month === (components.month + 1) && f.day === (components.dayOfMonth + 1)) ?? null;
  }

  /* -------------------------------------------- */
  /*  Formatter Functions                         */
  /* -------------------------------------------- */

  /** @inheritDoc */
  static formatAurelian(calendar, components, options) {

    console.log("HELLO");
    
    const month = calendar.months.values[components.month];
    const year_descriptor = components.year < 0 ? "VÊA" : "DA";
    const day_number_addition = components.dayOfMonth === 0 ? "st" : components.dayOfMonth === 1 ? "nd" : components.dayOfMonth === 2 ? "rd" : "th";
    const holiday = calendar.findHoliday(components);
    console.log("HOLIDAY: ", holiday);
    if ( holiday ) {
      return holiday.name + ` (${components.dayOfMonth + 1}${day_number_addition} ${month.name}) ${components.year}${year_descriptor}`;
    }
    return `${components.dayOfMonth + 1}${day_number_addition} ${month.name} ${components.year}${year_descriptor}`;
  }
}

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
  },
  holidays: [
    { name: "New Year's Day", month: 1, day: 1 },
    { name: "Fate's Beginning", month: 1, day: 2 },
    { name: "Arcane Festival", month: 1, day: 35 },
    { name: "Mother Earth's Day", month: 1, day: 52 },
    { name: "Nature's Awakening", month: 2, day: 1 },
    { name: "Day of Secrets", month: 2, day: 45 },
    { name: "Day of Judgement", month: 3, day: 14 },
    { name: "Festival of Creation", month: 3, day: 34 },
    { name: "Day of Tempest", month: 4, day: 18 },
    { name: "Battle Day", month: 4, day: 58 },
    { name: "Day of Order", month: 5, day: 19 },
    { name: "Grave Festival", month: 5, day: 70 }
  ]
};

export const AURELIAN_CALENDAR_FORMATTER = {
  value: "aurelian",
  label: "Aurelian Day/Month/Year",
  group: "DND5E.CALENDAR.Formatters.Date",
  formatter: AurelianCalendar.formatAurelian
}