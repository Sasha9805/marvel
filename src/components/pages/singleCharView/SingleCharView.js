import "./singleCharView.scss";

const SingleCharView = ({ data }) => {
    const { thumbnail, title, description } = data;

    return (
        <div className="single-char">
            <img src={thumbnail} alt={title} className="single-char__img"/>
            <div className="single-char__info">
                <h2 className="single-char__name">{title}</h2>
                <p className="single-char__descr">{description}</p>
            </div>
        </div>
    )
};

export default SingleCharView;