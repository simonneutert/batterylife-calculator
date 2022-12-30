# batterylife-calculator

Battery logic extraced and polished from https://of-things.de.

## Examples

Basic usage: make sure to cast to Floats or Integers when using.  
⚠️ commas in input fields need to be sanitized ⚠️

```javascript
var x = new BatteryLifeCalculator(
  10,   // time the code runs in seconds
  120,  // time the code sleeps
  100,  // average power consumption in mAh when code runs
  10,   // average power consumption in mAh when code sleeps
  4400, // total capacity of the battery in mAh
  20    // percentage of the the total capacity you want as buffer (20 % is a sane default)
)
const powerPerHourMilliAmp = x.powerEstimatedHourly()
console.log(powerPerHour) // #=> 16.923076923076923

const life = x.calculate()
console.log(life)
// {
//   powerAverage:16.923076923076923,
//   runtimeDaysEstimated:8,
//   runtimeDaysRemainingHoursEstimated:16,
//   runtimeHoursEstimated:208
// }
```

Example from MilliAmpHours to MicroAmpHours

```javascript
const milliAmps = 1000
new BatteryLifeCalculator().milliAmpToMicroAmp(milliAmps)

const microAmps = 1000
new BatteryLifeCalculator().microAmpToMilliAmp(microAmps)
```