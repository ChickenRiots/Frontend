import PropTypes from 'prop-types';
import React from 'react';


class YouTubeVideo extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      url: ''
    }
  }  
  
  componentDidMount = () => {


    this.props.socketio.on('iframe', data => {
      const url = data
      
      // On mount, check to see if the API script is already loaded
      
      if (!window.YT) { // If not, load the script asynchronously
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        
        // onYouTubeIframeAPIReady will load the video after the script is loaded
        window.onYouTubeIframeAPIReady = this.loadVideo(url);
        
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
      } else { // If script is already there, load the video directly
        this.loadVideo(url);
      }
    })
  };
  
  loadVideo = (url) => {
    const { id } = this.props;
    // the Player object is created uniquely based on the id in props
    // const url = this.state.url
    // console.log(url)
    setTimeout(()=>{
      url !== undefined ? 
        this.player = new window.YT.Player(`youtube-player-${id}`, {
          videoId: url ,
          height: '540',
          width: '960',
          events: {
            onReady: this.onPlayerReady,
          },
        }): 
        this.player = new window.YT.Player(`youtube-player-${id}`, {
          videoId: 'dQw4w9WgXcQ' ,
          events: {
            onReady: this.onPlayerReady,
          },
        });
    }, 1500)
  };

  

  onPlayerReady = event => {
    event.target.playVideo();
  };
  
  render = () => {
    const { id } = this.props;
    return (
      <div>
        <div id={`youtube-player-${id}`} />
      </div>
    );
  };
}

export default YouTubeVideo;