#!/usr/bin/python
# coding: utf8
"""Face Detection - MagicMirror Module
Face Detection Script
The MIT License (MIT)

Based on work by Paul-Vincent Roll (Copyright 2016) (MIT License)
Reference link - https://github.com/normyx/MMM-Facial-Recognition-OCV3
"""

import sys
import os
sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))+ '/common/'))
import time
from face import FaceDetection
import cv2
from config import MMConfig
import signal

MMConfig.toNode("payload", {"type":"status", "status": "Face Detection started..."})

# Setup variables
isDetected = False
detection_active = True
detected_timestamp = time.time()

# get camera
camera = MMConfig.getCamera()

def shutdown(self, signum):
    MMConfig.toNode("payload", {"type":"status", "status": "Shutdown: Cleaning up camera..."})
    camera.stop()
    quit()

signal.signal(signal.SIGINT, shutdown)

# sleep for a second to let the camera warm up
time.sleep(1)

face = MMConfig.getFaceDetection()

# Main Loop
while True:
    # Sleep for x seconds specified in module config
    time.sleep(MMConfig.getInterval())
    # if detecion is true, will be used to disable detection if you use a PIR sensor and no motion is detected
    if detection_active is True:
        # Get image
        image = camera.read()
        # Convert image to grayscale.
        image = cv2.cvtColor(image, cv2.COLOR_RGB2GRAY)
        # Get coordinates of single face in captured image.
        result = face.detect_faces(image)
        # No face found, detect off?
        if result is None:
            # if last detection exceeds timeout -> detect off!
            if (isDetected and time.time() - detected_timestamp > MMConfig.getDetectOffDelay()):
                isDetected = False
                # callback detect off to node helper
                MMConfig.toNode("payload", {"type":"detectedFaceOff", "status": "Nobody here"})
            continue

        if (not isDetected):
            isDetected = True
            detected_timestamp = time.time()
            # callback detect on to node helper
            MMConfig.toNode("payload", {"type":"detectedFaceOn", "status": "Someone here"})
        else:
            positions = {}
            faceNum = 0
            for postion in result:
                x, y, w, h = postion
                positions[faceNum] = {"x": str(x), "y": str(y), "w": str(w), "h": str(h)}
                faceNum += 1
            MMConfig.toNode("payload", {"type":"updateFaces","faceNum": faceNum ,"positions": positions})
