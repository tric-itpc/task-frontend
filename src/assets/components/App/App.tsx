import { FC, ReactElement } from "react";
import Header from "../Header/Header";
import Form from "../Form/Form";

const App: FC = (): ReactElement<HTMLDivElement> => {
    return (
        <div className="app container">
            <Header />
            <Form />
        </div>
    );
};

export default App;
