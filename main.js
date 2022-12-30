class BatteryLifeCalculator {
  constructor(
    timeRunSeconds,
    timeSleepSeconds,
    consumptionActiveMilliAmpHours,
    consumptionSleepMilliAmpHours,
    powerBatteryTotalMilliAmpHours,
    powerBatteryBufferBeforeEmptyPercent = 20) {
    this.timeRunSeconds = timeRunSeconds
    this.timeSleepSeconds = timeSleepSeconds
    this.consumptionActiveMilliAmpHours = consumptionActiveMilliAmpHours
    this.consumptionSleepMilliAmpHours = consumptionSleepMilliAmpHours
    this.powerBatteryTotalMilliAmpHours = powerBatteryTotalMilliAmpHours
    this.powerBatteryBufferBeforeEmptyPercent = powerBatteryBufferBeforeEmptyPercent
  }

  // public API

  milliAmpToMicroAmp(milliAmps) {
    return milliAmps * 1000
  }

  microAmpToMilliAmp(milliAmps) {
    return milliAmps * 0.001
  }

  calculate() {
    return {
      powerAveragePerHour: this.powerEstimatedHourly(),
      runtimeHoursEstimated: this.runtimeHoursEstimated(),
      runtimeDaysEstimated: this.runtimeDaysEstimated(),
      runtimeDaysRemainingHoursEstimated: this.runtimeDaysRemainingHoursEstimated()
    }
  }

  powerEstimatedHourly() {
    return this.calcPowerEst(
      this.powerRun(),
      this.consumptionActiveMilliAmpHours,
      this.powerSleep(),
      this.consumptionSleepMilliAmpHours
    )
  }

  runtimeHoursEstimated() {
    return parseInt(this.powerLipo() / this.powerEstimatedHourly())
  }

  runtimeDaysEstimated() {
    return parseInt(this.runtimeHoursEstimated() / 24)
  }

  runtimeDaysRemainingHoursEstimated() {
    return parseInt(this.runtimeHoursEstimated() % 24)
  }

  // private

  roundOff(x) {
    return Math.round(x * 100.0) / 100.0
  }

  calcPowerLipo(x, y) {
    return parseFloat((x * (100 - y)) / 100)
  }

  calcRuns(x, y) {
    return parseFloat(60 / (x + y))
  }

  calcRunsHour(x, y) {
    return parseFloat(3600 / (x + y))
  }

  calcPowerRun(x, y) {
    return parseFloat((x / (x + y)) * 3600)
  }

  calcPowerSleep(x, y) {
    return parseFloat((y / (x + y)) * 3600)
  }

  powerLipo() {
    return this.calcPowerLipo(this.powerBatteryTotalMilliAmpHours, this.powerBatteryBufferBeforeEmptyPercent)
  }

  runs() {
    return this.calcRuns(this.timeRunSeconds, this.timeSleepSeconds)
  }

  runsHour() {
    return this.calcRunsHour(this.timeRunSeconds, this.timeSleepSeconds)
  }

  powerRun() {
    return this.calcPowerRun(this.timeRunSeconds, this.timeSleepSeconds)
  }

  powerSleep() {
    return this.calcPowerSleep(this.timeRunSeconds, this.timeSleepSeconds)
  }

  calcPowerEst(a, b, c, d) {
    return parseFloat((a / 3600) * b + (c / 3600) * d)
  }
}
