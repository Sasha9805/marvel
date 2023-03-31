import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);
    
    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onCharListLoaded)
            .catch(err => console.log(err));
    };

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setCharEnded(ended);
    };

    const itemRefs = useRef([]);

    const focusOnItem = (ind) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[ind].classList.add('char__item_selected');
        itemRefs.current[ind].focus();
    };

    const onFocusLi = (ind) => {
        itemRefs.current.forEach(item => {
            // item.current.blur();
            item.current.classList.remove('char__item_selected');
        });
        itemRefs.current[ind].current.focus();
        itemRefs.current[ind].current.classList.add('char__item_selected');
    };

    function renderItems(arr) {
        // const isNewRefs = !itemRefs.current.length || itemRefs.current.length < arr.length;
        // if (isNewRefs) {
        //     itemRefs.current = [];
        // }
        
        const items = arr.map((item, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'};
            }

            // if (isNewRefs) {
            //     itemRefs.current.push(React.createRef());
            // }
            
            return (
                <li
                    className="char__item"
                    ref={el => itemRefs.current[i] = el}
                    // ref={itemRefs.current[i]}
                    key={item.id}
                    onClick={() => {
                        props.onCharSelected(item.id);
                        // onFocusLi(i);
                        focusOnItem(i);
                    }}
                    onKeyPress={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            // onFocusLi(i);
                            focusOnItem(i);
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

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button 
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{display: charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
};

export default CharList;