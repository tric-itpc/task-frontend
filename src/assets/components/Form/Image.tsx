import React, { FC, ReactElement, ReactFragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getImage } from "../../redux/selectors/FormSelectors";
import {
    setImageDirty,
    setImageErrorMessage,
    setImageName,
    setImageValue,
} from "../../redux/reducers/FormSlice";
import ErrorMessage from "./ErrorMessage";

const enum classes {
    IMAGE_GROUP = "form__image-group",
    IMAGE_LABEL = "form__image-label",
    IMAGE_ERROR = "form__image-label form__image-label_red",
    IMAGE_INPUT = "form__image-input",
    ATTACHED = "form__img-attached",
}

const Image: FC = (): ReactElement<ReactFragment> => {
    const dispatch = useAppDispatch();
    const image = useAppSelector(getImage);

    const blurHandler = () => dispatch(setImageDirty());

    const imageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const MB_LIMIT = 2097152;

        if (e.target.files && e.target.files[0].size > MB_LIMIT) {
            dispatch(setImageErrorMessage("Файл не должен превышать 2Мб"));
        } else if (e.target.files) {
            dispatch(setImageValue(e.target.value));
            dispatch(setImageName(e.target.files[0].name));
            dispatch(setImageErrorMessage(""));
        }
    };

    return (
        <>
            {image.error && <ErrorMessage text={image.error} />}
            <div
                className={classes.IMAGE_GROUP}
                title="Выберите картинку (не более 2Мб)"
            >
                <label className={classes.IMAGE_LABEL} htmlFor="add-image">
                    Изображение&ensp;
                    <i className="fa-solid fa-paperclip"></i>
                </label>
                <input
                    className={classes.IMAGE_INPUT}
                    type="file"
                    name="image"
                    id="add-image"
                    accept=".jpeg, .jpg, .png"
                    onBlur={blurHandler}
                    value={image.value}
                    onChange={imageHandler}
                />
                {image.name && (
                    <div className={classes.ATTACHED}>
                        {image.name.length > 10
                            ? `${image.name.slice(0, 10)}...`
                            : image.name}
                    </div>
                )}
            </div>
        </>
    );
};

export default Image;
