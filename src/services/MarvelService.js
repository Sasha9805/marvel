import { useHttp } from "../hooks/http.hook";

export default function useMarvelService() {
    const { request, clearError, process: processMachine, setProcess } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset, name = '') => {
        let nameString = name ? `&name=${name}` : '';
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}${nameString}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
        return res.data.results.map(_transformComic);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
        return _transformComic(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? `${char.description.slice(0, 210)}...` : `Description is not available for ${char.name}`,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        };
    };

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            pageCount: comic.pageCount
				? `${comic.pageCount} p.`
				: "No information about the number of pages",
            price: comic.prices[0].price
				? `${comic.prices[0].price}$`
				: "not available",
            language: comic.textObjects[0]?.language || "en-us",
        };
    };

    return {
        process: processMachine,
        clearError,
        getAllCharacters,
        getCharacter,
        getAllComics,
        getComic,
        setProcess,
    };
}