{
  module: 'MMM-ImageSlideshow',
  position: 'bottom_left',
  config: {
    // Array value containing strings. Each string should be a path to a directory where image files can be found.
    imagePaths: ['modules/MMM-ImageSlideshow/exampleImages'],
    // Integer value, the length of time to show one image before switching to the next, in milliseconds.
    slideshowSpeed: 10000,
    //Integer value, sets a fixed pixel width for all the images to be shown. If set to 0, the image's actual width is used.
    fixedImageWidth: 0,
    // Integer value, sets a fixed pixel height for all the images to be shown. If set to 0, the image's actual height is used.
    fixedImageHeight: 0,
    // if true will randomize the order of the images, if false will use an alphabetical sorting by filename.
    randomizeImageOrder: false,
    // if true will treat all the paths specified in imagePaths as one path. Otherwise, if false, images will only be shown from one path at a time in the order of imagePaths, until all the images in that path are exhausted, before continuing to the next path.
    treatAllPathsAsOne: false,
    // if true images will be rendered in grayscale (i.e black and white) instead of color. If false they will be rendered as just they are without change.
    makeImagesGrayscale: false,
    // A list of image file extensions, seperated by commas, that should be included. Files found without one of the extensions will be ignored.
    validImageFileExtensions: 'bmp,jpg,gif,png'
  }
},
