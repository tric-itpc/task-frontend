import React from 'react'
import './ConfirmForm.scss';
interface ConfirmFormProps {
    title: string
}
const ConfirmForm: React.FC<ConfirmFormProps> = ({title}): React.ReactElement => {
    return (
        <div className="success">
            <h1 className="success__title">{title}</h1>
        </div>
    )
}

export default ConfirmForm
