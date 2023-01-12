import React, {FC} from 'react';
import classes from "./Input.module.css";

interface InputProps {
    name: string,
    type: string,
    id: string,
    value: string,
    setValue: (str: string) => void,
    placeholder: string

}

const Input: FC<InputProps> = ({name, type, id, value, setValue, placeholder }) => {
    return (
        <input
            className={classes.MyInput}
            placeholder={placeholder}
            value={value}
            type={type}
            name={name}
            id={id}
            onChange={(e:any)=> setValue(e.target.value)}
        />
    );
};

export default Input;
