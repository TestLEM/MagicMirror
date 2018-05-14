#!/usr/bin/python
# coding: utf8
"""Face Detection - MagicMirror Module
The MIT License (MIT)

Based on work by Paul-Vincent Roll (Copyright 2016) (MIT License)
Reference link - https://github.com/normyx/MMM-Facial-Recognition-OCV3
"""
import os
import json
import sys
import platform
sys.path.append((os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))+ '/common/'))
from commonconfig import CommonConfig
from face import FaceDetection

class MMConfig (CommonConfig):

    CONFIG_DATA = json.loads(sys.argv[1])
    USE_USB_CAM_ATTR = 'useUSBCam'
    INTERVAL_ATTR = 'interval'
    DETECT_OFF_DELAY_ATTR = 'detectOffDelay'

    @classmethod
    def toNode(cls, type, message):
        print(json.dumps({type: message}))
        sys.stdout.flush()

    @classmethod
    def getInterval(cls):
        return cls.get(cls.INTERVAL_ATTR)

    @classmethod
    def getDetectOffDelay(cls):
        return cls.get(cls.DETECT_OFF_DELAY_ATTR)

    @classmethod
    def getUseUSBCam(cls):
        return cls.get(cls.USE_USB_CAM_ATTR)

    @classmethod
    def get(cls,key):
        return cls.CONFIG_DATA[key]

    @classmethod
    def getCamera(cls):
        cls.toNode("payload", {"type":"status", "status": "-" * 20})
        try:
            if cls.get("useUSBCam") == False:
                import picam
                cls.toNode("payload", {"type":"status", "status": "PiCam loaded..."})
                cam = picam.OpenCVCapture()
                cam.start()
                return cam
            else:
                raise Exception
        except Exception:
            import webcam
            cls.toNode("payload", {"type":"status", "status": "Webcam loaded..."})
            return webcam.OpenCVCapture(device_id=0)
        cls.toNode("payload", {"type":"status", "status": "-" * 20})
