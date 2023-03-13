export default class MarvelService {

    _apiBase = 'https://gateway.marvel.com:443/v1/public/';

    async getResource(url) {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=210&apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
    };

    getCharacter = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?apikey=${process.env.REACT_APP_MARVEL_API_KEY}`);
    };
}