import * as React from 'react';
import ErrorMessage from './ErrorMessage';

const EMAIL_REGEX = new RegExp(
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
);

interface State {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: File | null;
  errors: {
    name: string;
    img: string;
    email: string;
    category: string;
    message: string;
  };
}

interface finalState {
  firstName: string;
  secondName: string;
  email: string;
  category: string;
  message: string;
  img: string | null | ArrayBuffer;
}

class FormControl extends React.Component<{}, State> {
  state: State = {
    firstName: '',
    secondName: '',
    email: '',
    category: '',
    message: '',
    img: null,
    errors: {
      name: 'empty',
      img: 'empty',
      email: 'empty',
      category: 'empty',
      message: 'empty',
    },
  };

  // проверка корректности заполнения полей
  private validateField = (field: string): void => {
    const { firstName, secondName, email, category, message, img } = this.state;

    //размер изображения в МБ
    const imgSize = img ? img.size / 1024 / 1024 : 0;

    switch (field) {
      case 'email':
        !email.match(EMAIL_REGEX)
          ? this.setState({ errors: { ...this.state.errors, email: 'Некорректный адрес электронной почты' } })
          : this.setState({ errors: { ...this.state.errors, email: '' } });
        break;
      case 'firstName':
      case 'secondName':
        !(firstName || secondName)
          ? this.setState({ errors: { ...this.state.errors, name: 'Необходимо заполнить имя или фамилию' } })
          : this.setState({ errors: { ...this.state.errors, name: '' } });
        break;
      case 'category':
        !category
          ? this.setState({ errors: { ...this.state.errors, category: 'Необходимо выбрать тип обращения' } })
          : this.setState({ errors: { ...this.state.errors, category: '' } });
        break;
      case 'message':
        message.length < 10
          ? this.setState({
              errors: { ...this.state.errors, message: 'Сообщение должно содержать не менее 10 символов' },
            })
          : this.setState({ errors: { ...this.state.errors, message: '' } });
        break;
      case 'img':
        imgSize > 2
          ? this.setState({
              errors: { ...this.state.errors, img: 'Размер изображения не должен превышать 2Мб' },
            })
          : this.setState({ errors: { ...this.state.errors, img: '' } });
        break;
      default:
        return;
    }
  };

  // обработка изменения  полей
  private onFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ): void => {
    const { name: field, value } = event.target;
    this.setState({ ...this.state, [field]: value.trim() }, () => this.validateField(field));
  };

  // обработка добавления изображения
  private onImageChange = async (event: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const input = event.target;
    if (input.files) {
      const file = input.files[0];
      await this.setState({ ...this.state, img: file }, () => {
        this.validateField('img');
      });
      if (this.state.errors.img !== '') {
        input.value = '';
        this.setState({ ...this.state, img: null });
      }
    }
  };

  // проверка корректности заполнения полей
  private checkFormCompletion = (): boolean => {
    const errors = this.state.errors;
    return !errors.email && !errors.category && !errors.message && !errors.name ? true : false;
  };

  // метод для отправки формы
  private onSubmit = (event: React.FormEvent) => {
    const { firstName, secondName, email, category, message, img } = this.state;
    event.preventDefault();
    let returnState: finalState = { firstName, secondName, email, category, message, img: null };
    if (img) {
      this.convertFileToBase64(img)
        .then(result => {
          returnState.img = result;
        })
        .then(() => alert(`Json для отправки на сервер: ${JSON.stringify(returnState)}`));
    } else {
      alert(`Json для отправки на сервер: ${JSON.stringify(returnState)}`);
    }
  };

  convertFileToBase64 = (img: File): Promise<string | null | ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => resolve(reader.result);
    });
  };

  public render(): React.ReactNode {
    const errors = this.state.errors;
    const validForm = this.checkFormCompletion();
    console.log(errors);
    return (
      <div className="form-div">
        <form className="form">
          <div className="form__group">
            <label className="form__group-label">Имя</label>
            <input className="form__input form__required" type="text" name="firstName" onChange={this.onFieldChange} />
          </div>
          <div className="form__group">
            <label className="form__group-label">Фамилия</label>
            <input className="form__input" type="text" name="secondName" onChange={this.onFieldChange} />
          </div>
          <div className="form__group">
            <label className="form__group-label form__group-label_required">Email</label>
            <input className="form__input" type="email" name="email" onChange={this.onFieldChange} />
          </div>
          <div className="form__group">
            <label className="form__group-label form__group-label_required">Тип обращения</label>
            <select className="select" name="category" onChange={this.onFieldChange}>
              <option value="" selected hidden>
                Выберите тип
              </option>
              <option className="select__option" value="Жалоба">
                Жалоба
              </option>
              <option className="select__option" value="Благодарность">
                Благодарность
              </option>
            </select>
          </div>
          <div className="form__group">
            <label className="form__group-label form__group-label_required">Сообщение</label>
            <textarea
              className="form__input"
              name="message"
              placeholder="Оставьте здесь ваше сообщение."
              cols={30}
              rows={10}
              onChange={this.onFieldChange}
            ></textarea>
          </div>
          <div className="form__group">
            <label className="form__group-label">Изображение</label>
            <input
              className="form__input-img"
              type="file"
              name="image"
              accept=".jpg,.jpeg,.png"
              onChange={this.onImageChange}
            />
          </div>
          <div className="form__group">
            <ul className="form__errors">
              {Object.values(errors).map((error, i) => {
                if (error !== 'empty' && error !== '') return <ErrorMessage key={i} message={error} />;
              })}
            </ul>
          </div>

          <button className="form__submit-button" disabled={!validForm} onClick={this.onSubmit}>
            Отправить
          </button>
        </form>
      </div>
    );
  }
}

export default FormControl;
