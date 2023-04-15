import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import AppBanner from "../appBanner/AppBanner";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const SinglePage = ({ type, renderComponent, Component }) => {

    const { id } = useParams();
    const [data, setData] = useState(null);
    const { getComic, getCharacter, clearError, process, setProcess } = useMarvelService();

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
                    .then(() => setProcess('confirmed'))
                    .catch(err => console.log(err));
                break;
            case 'char':
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'))
                    .catch(err => console.log(err));
                break;
            default:
                return;
        }
    };

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    );
};

export default SinglePage;