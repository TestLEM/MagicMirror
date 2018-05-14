
# Face_detection
This module is a face detection module for [MagicMirror²](https://magicmirror.builders/).

# Introduction
This module uses the [OpenCV](https://opencv.org/) library and is only compatible with the v3 (only tested with the version 3.3 and the rest of the description is based on this version. Some adaptions will probably be needed to support other version).
It has been adapted to :
* Be able to support the v3.3.0 OpenCV version

# Prepare the module
This section explain the way to prepare the module, by installing the dependencies and train the model.
## Building OpenCV
This is the most time consuming part, because the OpenCV library need to be build by the raspberry (it may take 2 hours).
This section is a mix of 2 great articles found[^first][^second].
### Configuring the Raspberry
First, install and update all the elements before compiling :
```shell=
sudo apt-get update
sudo apt-get upgrade
sudo rpi-update
sudo reboot
sudo apt-get install build-essential git cmake pkg-config
sudo apt-get install libjpeg-dev libtiff5-dev libjasper-dev libpng12-dev
sudo apt-get install libavcodec-dev libavformat-dev libswscale-dev libv4l-dev
sudo apt-get install libxvidcore-dev libx264-dev
sudo apt-get install libgtk2.0-dev
sudo apt-get install libatlas-base-dev gfortran
cd ~
git clone https://github.com/Itseez/opencv.git
cd opencv
git checkout 3.3.0
cd ~
git clone https://github.com/Itseez/opencv_contrib.git
cd opencv_contrib
git checkout 3.3.0
```
### Build OpenCV
This section may take long ...
First get pip cross version :
```shell=
wget https://bootstrap.pypa.io/get-pip.py
```
Two Python alternatives to build OpenCV : v2.7 or v3.0
> If using **Python v2.7** :
```shell=
sudo apt-get install python2.7-dev
sudo python get-pip.py
```
> If using **Python v3.0** :
```shell=
sudo apt-get install python3-dev
sudo python3 get-pip.py
```
Before you start the compile process, you should increase your swap space size. This enables OpenCV to compile with all four cores of the Raspberry PI without the compile hanging due to memory problems.
Open your `/etc/dphys-swapfile`  and then edit the `CONF_SWAPSIZE`  variable:
```shell=
# set size to absolute value, leaving empty (default) then uses computed value
# you most likely don't want this, unless you have an special disk situation
# CONF_SWAPSIZE=100
CONF_SWAPSIZE=1024
```
To activate the new swap space, restart the swap service:
```shell=
sudo /etc/init.d/dphys-swapfile stop
sudo /etc/init.d/dphys-swapfile start
```
*It is possible to burn out the Raspberry Pi microSD card because flash memory has a limited number of writes until the card won’t work. It is highly recommended that you change this setting back to the default when you are done compiling and testing the install.* 

And then, build OpenCV :
```shell=
pip install numpy
cd ~/opencv
mkdir build
cd build
cmake -D CMAKE_BUILD_TYPE=RELEASE \
    -D CMAKE_INSTALL_PREFIX=/usr/local \
    -D INSTALL_C_EXAMPLES=OFF \
    -D INSTALL_PYTHON_EXAMPLES=ON \
    -D OPENCV_EXTRA_MODULES_PATH=~/opencv_contrib/modules \
    -D BUILD_EXAMPLES=ON ..
make -j4
sudo make install
sudo ldconfig
```
After a long time, OpenCV is built and installed
## Install the dependencies
Go to the face_detection modules directory :
```shell=
cd ~/MagicMirror/modules/face_detection
```
Install the need dependencies by running the command :
```shell=
npm install
```
If you will run the different tools with Python 2.7, install the cross-compatible features with :
```shell=
pip install future
```

# Setup the module
To setup the module in MagicMirror², add the following script int the `config.js` file in the `config/` MagicMirror² directory (Modify the script regarding the Algorithm, file location, ...).
```javascript
{
    module: 'face_detection',
    config: {
        // force the use of a usb webcam on raspberry pi (on other platforms this is always true automatically)
        useUSBCam: false,
        // detection intervall in seconds (smaller number = faster but CPU intens!)
        interval: 2,
        // detect off delay after last detection so that a user does not get instantly disappear if he turns away from the mirror for a few seconds
        detectOffDelay: 15,
    }
}
```
In order for this module to do anything useful you have to assign custom classes to your modules. The class default (if you don't change it) is shown if no user is detected or a stranger. The class everyone (if you don't change it) is shown for all users. To specify modules for a certain user, use their name as classname.
```shell
{
    module: 'example_module',
    position: 'top_left',
    //Set your classes here seperated by a space.
    //Shown for all users
    classes: 'default everyone'
},
{
    module: 'example_module2',
    position: 'top_left',
    //Only shown for name1
    classes: 'name1'
}
```
