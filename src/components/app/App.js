import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import MarvelService from "../../services/MarvelService";

import decoration from '../../resources/img/vision.png';
import { Component } from "react";

class App extends Component {

    state = {
        chars: [],
        selectedChar: null,
        loading: true,
        error: false,
    };

    marvelService = new MarvelService();

    componentDidMount() {
        this.marvelService
            .getAllCharacters()
                .then(this.onCharsLoaded)
                .catch(this.onError);
    };

    onCharsLoaded = (chars) => {
        this.setState({
            chars, 
            loading: false
        });
    };

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
    };

    onClickChar = (id) => {
        this.setState(state => {
            return {
                selectedChar: state.chars.find(char => char.id === id),
            };
        });
    };

    render() {
        const { chars, selectedChar, loading, error } = this.state;
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList loading={loading} error={error} chars={chars} selectedChar={selectedChar} onClickChar={this.onClickChar} />
                        <CharInfo char={selectedChar} loading={loading || error} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }

}

export default App;