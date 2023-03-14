import './charList.scss';
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";

const CharList = ({ chars, selectedChar, loading, error, onClickChar }) => {

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !loading && !error 
        ? (
            <>
                <ul className="char__grid">
                    {
                        chars.map(char => {
                            let className = `char__item${selectedChar && selectedChar.id === char.id ? ' char__item_selected' : ''}`;
                            return (
                                <li key={char.id} className={className} onClick={() => onClickChar(char.id)}>
                                    <img src={char.thumbnail} alt="abyss"/>
                                    <div className="char__name">{char.name}</div>
                                </li>
                            );
                        })
                    }
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </>
        )
        : null;

    return (
        <div className="char__list">
            {spinner}
            {errorMessage}
            {content}            
        </div>
    )
}

export default CharList;