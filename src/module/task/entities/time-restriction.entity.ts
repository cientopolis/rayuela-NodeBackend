export class TaskTimeRestriction {
  days: number[]; // From 1 to 7
  time: {
    // Between 00 and 23
    start: number;
    end: number;
  };

  satisfy(date: Date | string): boolean {
    const datetime = new Date(date);
    const dayOfWeek = datetime.getDay() === 0 ? 7 : datetime.getDay();

    const hour = datetime.getHours();

    const isValidDay = this.days.includes(dayOfWeek);

    const isValidHour = hour >= this.time.start && hour < this.time.end;

    return isValidDay && isValidHour;
  }

  constructor(days: number[], time: { start: number; end: number }) {
    this.days = days;
    this.time = time;
  }
}
