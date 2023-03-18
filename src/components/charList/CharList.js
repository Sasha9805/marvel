import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false,
    };
    
    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    };

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true,
        });
    };

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        this.setState(({ charList, offset }) => {
            return {
                charList: [...charList, ...newCharList],
                loading: false,
                newItemLoading: false,
                offset: offset + 9,
                charEnded: ended,
            };
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    // Есть 2 решения: мое (cardRefs) и с урока (itemRefs)
    itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    };

    focusOnItem = (ind) => {
        this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[ind].classList.add('char__item_selected');
        this.itemRefs[ind].focus();
    };

    onFocusLi = (ind) => {
        this.cardRefs.forEach(item => {
            // item.current.blur();
            item.current.classList.remove('char__item_selected');
        });
        this.cardRefs[ind].current.focus();
        this.cardRefs[ind].current.classList.add('char__item_selected');
    };

    renderItems(arr) {
        const isNewRefs = !Array.isArray(this.cardRefs) || this.cardRefs.length < arr.length;
        if (isNewRefs) {
            this.cardRefs = [];
        }
        
        const items = arr.map((item, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'};
            }
            // let className = `char__item${this.props.charId === item.id ? ' char__item_selected' : ''}`;

            if (isNewRefs) {
                this.cardRefs.push(React.createRef());
            }
            
            return (
                <li
                    // className={className}
                    className="char__item"
                    ref={this.cardRefs[i]}
                    // ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.onFocusLi(i);
                        // this.focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.onFocusLi(i);
                            // this.focusOnItem(i);
                        }
                    }}
                    tabIndex={0}
                    >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                </li>
            );
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        );
    }

    render() {

        const {charList, loading, error, newItemLoading, offset, charEnded} = this.state;
        
        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button 
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => this.onRequest(offset)}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;