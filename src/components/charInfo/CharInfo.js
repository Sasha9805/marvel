import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = ({ char, loading }) => {
    const content = loading || !char ? <Skeleton /> : <View char={char} />;

    return (
        <div className="char__info">
            {content}
        </div>
    )
}

const View = ({ char }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {
                    comics.map(comic => {
                        return (
                            <li key={comic.resourceURI} className="char__comics-item">
                                {comic.name}
                            </li>
                        )
                    })
                }
            </ul>
        </>
    )
};

export default CharInfo;