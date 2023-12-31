import schedule from "node-schedule";

export class Scheduler {
  private jobs: Record<string, schedule.Job> = {};

  public schedule(id: string, fn: () => void, interval: string) {
    if (this.jobs[id]) {
      console.warn(`Job with ID "${id}" already exists. Overwriting.`);
      this.unschedule(id);
    }

    this.jobs[id] = schedule.scheduleJob(interval, fn);
    console.log(`Job "${id}" scheduled successfully.`);
  }

  public unschedule(id: string) {
    if (this.jobs[id]) {
      this.jobs[id].cancel();
      delete this.jobs[id];
      console.log(`Job "${id}" unscheduled.`);
    } else {
      console.warn(`Job with ID "${id}" not found.`);
    }
  }
}
