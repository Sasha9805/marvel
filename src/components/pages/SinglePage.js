import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AppBanner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "../../services/MarvelService";

const SinglePage = ({ type, renderComponent, Component }) => {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const { loading, error, getComic, getCharacter, clearError } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const onDataLoaded = (data) => {
        setData(data);
    };

    const updateData = () => {
        clearError();
        switch (type) {
            case 'comic':
                getComic(id)
                    .then(onDataLoaded)
                    .catch(err => console.log(err));
                break;
            case 'char':
                getCharacter(id)
                    .then(onDataLoaded)
                    .catch(err => console.log(err));
                break;
            default:
                return;
        }
    };

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !data) ? renderComponent(data) : null;
    // const content = !(loading || error || !data) ? <Component data={data} /> : null;

    return (
        <>
            <AppBanner />
            {errorMessage}
            {spinner}
            {content}
        </>
    );
};

export default SinglePage;