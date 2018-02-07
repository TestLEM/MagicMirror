{
  module: 'voicecontrol',
  position: 'bottom_left',
  config: {
    models: [
      {
        keyword: "Show Camera",
        description: "카메라를 켜기 위해서는 '카메라 보여줘'라고 말하세요.",
        file: "pmdl/카메라보여줘.pmdl",
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
{
  module: 'camera',
  position: 'top_center',
  config: {
    selfieInterval: 3,  // Time interval in seconds before the photo will be taken.
    emailConfig: {
      service: 'Naver', // Email provider to use to send email with a photo.
      auth: {
        user: '', // Your email account
        pass: ''        // Your password for email account
      }
    }
  }
},
