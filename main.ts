// in cm
function turn (degrees: number, direction: number, speed: number) {
    theta = degrees * PI / 180
    w_wheel = speed / 255 * 260
    // speed in rpm
    u = w_wheel * 2 * PI / 60000 * WHEEL_RADIUS
    w_axis = 2 * u / AXIS_DISTANCE
    dt = theta / w_axis
    DFRobotMaqueenPlus.mototStop(Motors.ALL)
    start = input.runningTime()
    if (direction == 0) {
        // turn right
        while (input.runningTime() - start < dt) {
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CCW, speed)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CW, speed)
        }
    } else if (direction == 1) {
        // turn left
        while (input.runningTime() - start < dt) {
            DFRobotMaqueenPlus.mototRun(Motors.M1, Dir.CW, speed)
            DFRobotMaqueenPlus.mototRun(Motors.M2, Dir.CCW, speed)
        }
    }
}
let start = 0
let dt = 0
let w_axis = 0
let u = 0
let w_wheel = 0
let theta = 0
let WHEEL_RADIUS = 0
let AXIS_DISTANCE = 0
let PI = 0
PI = 3.14159265359
AXIS_DISTANCE = 7.2
// in cm
WHEEL_RADIUS = 2.1
basic.forever(function () {
    if (DFRobotMaqueenPlus.ultraSonic(PIN.P13, PIN.P14) > 5) {
        DFRobotMaqueenPlus.mototRun(Motors.ALL, Dir.CCW, 50)
    } else {
        turn(90, 1, 50)
    }
})
