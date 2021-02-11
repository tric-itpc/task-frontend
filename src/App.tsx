import React from 'react';
import Form from './components/Form/Form';
import 'normalize.css';
import ConfirmForm from './components/ConfirmForm/ConfirmForm';


function App(): React.ReactElement {
  const [isSubmitted, setSubmitted] = React.useState<boolean>(false)

  const submitFrom = React.useCallback((): void => {
    setSubmitted(true)
  }, [isSubmitted])
  return (
    <div className="App">
      <div className="container">
        {isSubmitted && <ConfirmForm title="Успешно"/>}
        {!isSubmitted && 
        <Form 
          submitFrom={submitFrom}
        />}
      </div>
    </div>
  );
}

export default App;
