import React from 'react';
import SearchBar from './SearchBar';
import youtube from '../api/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';


class App extends React.Component {
  state= { videos:[], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('cars');
  }

  onTermSubmit = async (term) => {
    const KEY = 'AIzaSyDRPEtHyCHmAxXHWGBkeXVNXmxBP1K_aR8';
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
      }
    });

    this.setState({
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect= (video) => {
    this.setState({ selectedVideo: video});
  };

  render(){
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
      <SearchBar onFormSubmit={this.onTermSubmit} />
      <div className="ui grid">
      <div className="ui row">
      <div className="eleven wide column" >
      <VideoDetail video={this.state.selectedVideo} />
      </div>
      <div className="five wide column">
      <VideoList onVideoSelect={ this.onVideoSelect } videos={this.state.videos} />
      </div>
      </div>
      </div>
      </div>
    );
  }
}

export default App;
