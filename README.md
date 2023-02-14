# Test task for the ITPC

This is the repository with code of my **React form app** that I made for ITPC test task (task bellow in a Russian language)
It was made with react. [Live demo]()

## Technologies I've used
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

## Screenshots 
![image](https://user-images.githubusercontent.com/83648973/218726165-cfd613d5-a43e-41c5-bd9f-fd37c5b50c16.png)

![image](https://user-images.githubusercontent.com/83648973/218726336-ac803ebf-a7f2-4a55-a6e7-ef83ab55280e.png)

![image](https://user-images.githubusercontent.com/83648973/218726439-cc514bc9-239a-454e-b68e-be2ec751c074.png)

![image](https://user-images.githubusercontent.com/83648973/218726725-3091fbd4-74a7-4047-b067-36040b909309.png)

![image](https://user-images.githubusercontent.com/83648973/218726957-0b773b07-e399-4c32-ac24-5a7388521552.png)

![image](https://user-images.githubusercontent.com/83648973/218727055-778e285b-e34d-4e8a-bc0f-7b67dd40d789.png)

![image](https://user-images.githubusercontent.com/83648973/218727114-7bbe17b7-072c-4844-94a8-dc4682e70180.png)




## Test task (in Russian language)

Создайте форму обратной связи.
В форме пользователь может:

- ввести имя
- ввести фамилию
- ввести email
- выбрать категорию сообщения
- написать сообщение
- добавить картинку

Дополнительно необходима валидация по следующим правилам:

- email - обязательное поле
- имя, фамилия - должно быть заполнено одно из двух
- категория - выпадающий список. Поле обязательное, но значение по умолчанию должно быть пустым. Пустое значение не принимается
- сообщение - обязательное, минимум 10 символов
- картинка - формат jpg, png. Размер не более 2Мб

Результат заполнения формы должен быть в формате JSON для отправки в API

### Условия

- использовать React js
- писать на TypeScript (не обязательно, но будет огромным плюсом)
- форма должна быть адаптивной
- придерживаться методологии БЭМ
- все должно происходить в браузере без использования стороннего сервера

## Available Scripts

In the project directory, you can run:

### `npm install`

Runs the setup for further development.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
