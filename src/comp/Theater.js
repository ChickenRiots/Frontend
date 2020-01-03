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

    // On mount, check to see if the API script is already loaded

    if (!window.YT) { // If not, load the script asynchronously
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      
      // onYouTubeIframeAPIReady will load the video after the script is loaded
      window.onYouTubeIframeAPIReady = this.loadVideo;
      
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
    } else { // If script is already there, load the video directly
      this.loadVideo();
    }
  };

  componentWillMount = () =>{
    this.props.socketio.on('iframe', data => {
      this.getURL(data).then(res => this.setState({url: res}))
      .catch(error => console.log(error))
    })
  }
  
  getURL(url){
    return new Promise((resolve) =>{
      resolve(url)
    })
  }

  loadVideo = () => {
    const { id } = this.props;
    
      // the Player object is created uniquely based on the id in props

      this.player = new window.YT.Player(`youtube-player-${id}`, {
        videoId: this.state.url ,
        events: {
          onReady: this.onPlayerReady,
        },
      });
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