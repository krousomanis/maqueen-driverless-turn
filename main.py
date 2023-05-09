PI = 3.14159265359
AXIS_DISTANCE = 7.2   # in cm
WHEEL_RADIUS = 2.1    # in cm


def turn(degrees, direction, speed):
    theta = degrees * PI / 180.0
    w_wheel = (speed / 255.0) * 260.0         # speed in rpm
    u = (w_wheel * 2.0 * PI / 60000.0) * WHEEL_RADIUS    
    w_axis = 2.0 * u / AXIS_DISTANCE
    dt = theta / w_axis
    DFRobotMaqueenPlus.motot_stop(Motors.ALL)
    start = input.running_time()
    if direction == 0:      # turn right
        while input.running_time() - start < dt:
            DFRobotMaqueenPlus.motot_run(Motors.M1, Dir.CCW, speed)
            DFRobotMaqueenPlus.motot_run(Motors.M2, Dir.CW, speed)
    elif direction == 1:    # turn left
        while input.running_time() - start < dt:
            DFRobotMaqueenPlus.motot_run(Motors.M1, Dir.CW, speed)
            DFRobotMaqueenPlus.motot_run(Motors.M2, Dir.CCW, speed)

def on_forever():
    if DFRobotMaqueenPlus.ultra_sonic(PIN.P13, PIN.P14) > 5:
        DFRobotMaqueenPlus.motot_run(Motors.ALL, Dir.CCW, 50)
    else:
        turn(90.0, 1, 50)

basic.forever(on_forever)
