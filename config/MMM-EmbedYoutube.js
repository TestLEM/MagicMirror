{
  module: "MMM-EmbedYoutube", // Path to youtube module from modules folder Exmaple: MagicMirror/modules/custom/MMM-EmbedYoutube/ so it's custom/MMM-EmbedYoutube
  position: "bottom_bar",	// This can be any of the regions.
  config: {
    // Youtube video id to display. You can get it from youtube url
    // Example: https://www.youtube.com/watch?v=w3jLJU7DT5E
    video_id: "w3jLJU7DT5E",
    autoplay: true,
    // Player's video progress bar to highlight the amount of the video that the viewer has already seen but color can be only red or white
    color: "red",
    // Show youtube video controls bar
    controls: false,
    // Disable keyboard control
    disablekb: true,
    // Displaying fullscreen button in player
    fs: true,
    loop: false,
    // Prevent the Youtube logo displaying in the controlbar. But Youtube text label still display in the upper-right cornner of a paused video when the user's mouse pointer hovers over the player.
    modestbranding: false,
    // Show related video at the end of video
    rel: false,
    // Show video title and uploader
    showinfo: false,
    width: 560,
    height: 315,
  }
},
