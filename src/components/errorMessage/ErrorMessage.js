import errorImg from './error.gif';
import './errorMessage.scss';

const ErrorMessage = () => {
    return (
        <img className="error-message" src={errorImg} alt="Error" />
    );
};

export default ErrorMessage;