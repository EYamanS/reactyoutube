import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/search_bar';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';


const API_KEY = 'AIzaSyCceRd26SfqF2b_UiUB9lhcfDyMJ2S3kzo';

YTSearch({key:API_KEY,term:'surfboards'}, function(data) {
    console.log(data);
});


// create a new component this should produce some html
class App extends Component {
    
    constructor(props) {
        super(props);

        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('yamancopper')

    }

    videoSearch(term) {
        YTSearch({key:API_KEY,term:term}, (videos) => {
            this.setState({videos:videos, selectedVideo:videos[0]});
        });
    }


    render() {        
        return (
            <div>
                <SearchBar onSearchTermChange={term => this.videoSearch(term)} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos} />
            </div>
        );
    }

}



// take this component's html and put it to the page
ReactDOM.render(<App />,document.querySelector('.container'));
