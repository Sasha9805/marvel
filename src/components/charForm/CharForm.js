import { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import CustomErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";

import "./charForm.scss";

const CharForm = () => {

    const [char, setChar] = useState(null);

    const { clearError, getAllCharacters, process, setProcess } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const onSubmit = async ({ charName }) => {
        clearError();
        try {
            const char = await getAllCharacters(0, charName);
            onCharLoaded(char);
            setProcess('confirmed');
        } catch(err) {
            console.log(err);
        }
    };

    const errorMessage = process === 'error' ? <div className="char__form-critical-error"><CustomErrorMessage /></div> : null;

    const charNotFoundContent = Array.isArray(char) && !char.length && process !== 'error' ? (
        <p className="char__form-message char__form-error">The character was not found. Check the name and try again</p>
    ) : null;

    const charFoundContent = Array.isArray(char) && char.length && process !== 'error' ? (
        <div className="char__form-content char__form-message">
            <p className="char__form-field char__form-success">There is! Visit {char[0].name} page?</p>
            <Link to={`/chars/${char[0].id}`} className="button button__secondary">
                <div className="inner">to page</div>
            </Link>
        </div>
    ) : null;

    return (
        <div className="char__form">
            <h3 className="char__form-title">Or find a character by name:</h3>
            <Formik
                initialValues={{
                    charName: '',
                }}
                validationSchema={object({
                    charName: string().required('This field is required')
                })}
                onSubmit={onSubmit}
                >
                {
                    ({ isSubmitting }) => (
                        <Form className="char__form-content">
                            <div className="char__form-field">
                                <Field 
                                    id="charName" 
                                    name="charName" 
                                    type="text" 
                                    placeholder="Enter name" 
                                    className="char__form-input" />
                                <ErrorMessage 
                                    component="p"
                                    className="char__form-message char__form-error" 
                                    name="charName" />
                            </div>
                            <button 
                                className="char__form-button button button__main button__long"
                                disabled={isSubmitting}
                                type="submit">
                                <div className="inner">find</div>
                            </button>
                        </Form>
                    )
                }
            </Formik>
            {errorMessage}
            {charNotFoundContent}
            {charFoundContent}
        </div>
    );
};

export default CharForm;