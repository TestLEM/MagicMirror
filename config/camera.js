{
  module: 'camera',
  position: 'top_center',
  config: {
    // Time interval in seconds before the photo will be taken.
    selfieInterval: 3,
    emailConfig: {
      // Email provider to use to send email with a photo.
      service: 'Naver',
      auth: {
        // Your email account
        user: '',
         // Your password for email account
        pass: ''
      }
    }
  }
},
