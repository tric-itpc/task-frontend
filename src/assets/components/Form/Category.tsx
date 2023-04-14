import React, { FC, ReactElement, ReactFragment } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getCategory } from "../../redux/selectors/FormSelectors";
import {
    setCategoryDirty,
    setCategoryValue,
} from "../../redux/reducers/FormSlice";
import ErrorMessage from "./ErrorMessage";

const enum classes {
    SELECT_GROUP = "form__select-group",
    SELECT_LABEL = "form__select-label",
    SELECT = "form__select",
    SELECT_ERROR = "form__select form__select_red",
    OPTION = "form__option",
}

const Category: FC = (): ReactElement<ReactFragment> => {
    const dispatch = useAppDispatch();
    const category = useAppSelector(getCategory);

    const blurHandler = () => dispatch(setCategoryDirty());

    const categoryHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCategoryValue(e.target.value));
    };

    return (
        <>
            {category.dirty && category.error && (
                <ErrorMessage text={category.error} />
            )}
            <div className={classes.SELECT_GROUP}>
                <label
                    className={classes.SELECT_LABEL}
                    htmlFor="category"
                    title="Выберите тип обращения в выпадающем списке"
                >
                    Тип обращения*:
                </label>
                <select
                    className={
                        !category.error ? classes.SELECT : classes.SELECT_ERROR
                    }
                    name="category"
                    id="category"
                    title="Выберите тип обращения"
                    value={category.value}
                    onChange={categoryHandler}
                    onBlur={blurHandler}
                >
                    <option
                        className={classes.OPTION}
                        value="empty"
                        disabled
                    ></option>
                    <option className={classes.OPTION} value="application">
                        Заявка
                    </option>
                    <option className={classes.OPTION} value="complaint">
                        Жалоба
                    </option>
                </select>
            </div>
        </>
    );
};

export default Category;
