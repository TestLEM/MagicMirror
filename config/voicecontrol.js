{
  // Mac에서 voicecontrol 모듈 사용을 위해서는 python2.7 환경에서 아래와 같이 환경 설정.
  // brew install portaudio sox
  // pip install pyaudio
  // 그리고 snowboy 폴더 안에서 _snowboydetect-mac.so을 _snowboydetect.so로 변경한다.
  // 리눅스도 마찬가지로 python2.7 환경에서 아래와 같다.
  // sudo apt-get install python-pyaudio python3-pyaudio sox
  // pip install pyaudio
  // 음성인식 학습파일인 pmdl은 https://snowboy.kitt.ai/dashboard 여기서 받을 수 있다.
  module: 'voicecontrol',
  position: 'bottom_left',
  config: {
    models: [
      {
        keyword: "Show Camera",
        description: "카메라를 켜기 위해서는 '카메라 보여줘'라고 말하세요.",
        // trained model file name
        file: "pmdl/카메라보여줘.pmdl",
        // notification message that's broadcast in the MagicMirror app
        message: "SHOW_CAMERA"
      },
      {
        keyword: "Hide Camera",
        description: "카메라를 끄기 위해서는 '카메라 꺼줘'라고 말하세요.",
        file: "pmdl/카메라꺼줘.pmdl",
        message: "HIDE_CAMERA"
      },
      {
        keyword: "Selfie",
        description: "카메라가 보일 때 '셀카'라고 말하세요.",
        file: "pmdl/셀카.pmdl",
        message: "SELFIE"
      },
    ]
  }
},
