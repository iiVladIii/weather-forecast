import React, {FC} from 'react';
import cl from './CreateWeatherCard.module.css'

interface CreateWeatherCardProps {
    setModal: (bool: boolean) => void
}

const CreateWeatherCard: FC<CreateWeatherCardProps> = ({setModal}) => {
    return (
        <div onClick={() => setModal(true)} className={cl['card-wrapper']}>
            <div className={cl.card__plus}>
                <hr className={cl['card__plus-hr1']}></hr>
                <hr className={cl['card__plus-hr2']}></hr>
            </div>
            <h1>Add new location</h1>
        </div>
    );
};

export default CreateWeatherCard;
