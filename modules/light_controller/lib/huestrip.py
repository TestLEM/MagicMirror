# NeoPixel library strandtest example
# Author: Tony DiCola (tony@tonydicola.com)
#
# Direct port of the Arduino NeoPixel library strandtest example.  Showcases
# various animations on a strip of NeoPixels.
import time
import math

import requests
import json
import time

#hue var
hue1 = "http://192.168.0.24/api/2XVv90KBB8kItGJd55lc4agdxYLctwR42NwAlnhz/lights/4/state"
#hue cmds
hue_on = {"on":True, "bri":254, "ct":500}
hue_off = {"on":False}
hue_color = {"on":True,"Red":254, "bri":254,"xy":[0.3000,0.3000]}

#change string code
def constrain(val, min_val, max_val):
    return min(max_val, max(min_val, val))

def codeToRgb(code):
	R = []
	G = []
	B = []
	W = []
	if len(code) == 8:
		R = [int(code[0:2],16)]
		G = [int(code[2:4],16)]
		B = [int(code[4:6],16)]
		W = [int(code[6:8],16)]
		return R+G+B+W
	elif len(code) == 6:
		R = [int(code[0:2],16)]
		G = [int(code[2:4],16)]
		B = [int(code[4:6],16)]
		W = [0]
		return R+G+B+W
	else:
		print "invalid code!"
		R = [0]
		G = [0]
		B = [0]
		W = [0]
		return R+G+B+W
#for hue

def XYtoRGB(x,y,brightness=1.0):
	RGB=[]
	z = 1.0 - x - y

	Y = brightness # The given brightness value
	X = (Y / y) * x
	Z = (Y / y) * z

	r =  (X * 1.656492) - (Y * 0.354851) - (Z * 0.255038)
	g = ((-X) * 0.707196) + (Y * 1.655397) + (Z * 0.036152)
	b = (X * 0.051713) - (Y * 0.121364) + (Z * 1.011530)

	r = ((r <= 0.0031308) and 12.92 * r or (1.0 + 0.055) * pow(r, (1.0 / 2.4)) - 0.055)*254
	g = ((g <= 0.0031308) and 12.92 * g or (1.0 + 0.055) * pow(g, (1.0 / 2.4)) - 0.055)*254
	b = ((b <= 0.0031308) and 12.92 * b or (1.0 + 0.055) * pow(b, (1.0 / 2.4)) - 0.055)*254

	r=[constrain(int(round(r)),0,255)]
	g=[constrain(int(round(g)),0,255)]
	b=[constrain(int(round(b)),0,255)]
	RGB = r+g+b
	print RGB

def RGBtoXY(r,g,b):
	XY = []
	red = float((r > 0.04045) and pow((r + 0.055) / (1.0 + 0.055), 2.4) or (r / 12.92))
	green = float((g > 0.04045) and pow((g + 0.055) / (1.0 + 0.055), 2.4) or (g / 12.92))
	blue = float((b > 0.04045) and pow((b + 0.055) / (1.0 + 0.055), 2.4) or (b / 12.92))

	X = red * 0.664511 + green * 0.154324 + blue * 0.162028
 	Y = red * 0.283881 + green * 0.668433 + blue * 0.047685
	Z = red * 0.000088 + green * 0.072310 + blue * 0.986039

	x = [round((X / (X + Y + Z)),4)]
	y = [round((Y / (X + Y + Z)),4)]

	XY = x+y

	print "coordinate?"
	print XY
	return XY

def hueColor(r,g,b):
	color = RGBtoXY(r,g,b)
	hue_color = {"on":True,"Red":254, "bri":254,"xy":color}
	requests.put(hue1, json.dumps(hue_color), timeout=5)
"""
Start with a temperature, in Kelvin, somewhere between 1000 and 40000.  (Other values may work,
but I can't make any promises about the quality of the algorithm's estimates above 40000 K.)
Note also that the temperature and color variables need to be declared as floating-point.
"""
def TemptoRGB(temper):
	temper = (temper+100)/100
	red = 0.0
	green = 0.0
	blue = 0.0
	#Calculate Red
	if temper <= 66:
		red = [255]
	else:
		red = temper - 60
		red = 329.698727446 * (pow(red, -0.1332047592))
		red = [constrain(int(round(red)),0,255)]

    #Calculate Green
	if temper <= 66:
		green = temper
		green = 99.4708025861 * math.log(green) - 161.1195681661
		green = [constrain(int(round(green)),0,255)]
	else:
		green = temper - 60
		green = 288.1221695283 * (pow(green, -0.0755148492))
		green = [constrain(int(round(green)),0,255)]
	#Calculate Blue
	if temper >= 66:
		blue = [255]
	else:
		if temper <= 19:
			blue = [0]
		else:
			blue = temper - 10
			blue = 138.5177312231 * math.log(blue) - 305.0447927307
			blue = [constrain(int(round(blue)),0,255)]
	return red+green+blue

# Main program logic follows:
if __name__ == '__main__':

	#code = codeToRgb('ffcc00')
	temper = 6500
	mired = pow(10,6)/temper
	code = TemptoRGB(temper)
	hue_on = {"on":True, "bri":254, "ct":mired}
	#hue_on = hueColor(0,0,0)
	r = code[0]
	g = code[1]
	b = code[2]

	requests.put(hue1, json.dumps(hue_on), timeout=5)