# Welcome to nütrient!

nütrient is daily nutritional requirement tracker for your personal use. It can help you optimize your diet and ensure you are eating healthily each and every day. Try it out [here](https://nutritracker.herokuapp.com)! 

<img width="1440" alt="Screen Shot 2021-01-02 at 8 34 12 PM" src="https://user-images.githubusercontent.com/55343494/103469977-f7c09480-4d39-11eb-90a5-8f3229c20270.png">

## How to use: 

##### Adding foods:
Simply type in the name of a food you ate today and select a serving size. Then click add and it will be added to today's entry!

<img width="1440" alt="Screen Shot 2021-01-02 at 7 37 04 PM" src="https://user-images.githubusercontent.com/55343494/103469979-07d87400-4d3a-11eb-8987-5ad6613db48b.png">

##### Viewing entries:
You have two views: the Today and History views. In the today view, you can see which foods you've eaten today, and in the history view, you can see a history of your entries . If you've made a mistake in entering a food today, you can also delete it on the today page by clicking on it to remove it. Refer to the handy graphs to see if you're meeting your nutritional needs for your age and gender. Green means you've met your needs, but red means you still need some work! 

Today:
<img width="1440" alt="Screen Shot 2021-01-02 at 7 36 29 PM" src="https://user-images.githubusercontent.com/55343494/103469986-1a52ad80-4d3a-11eb-8752-7752bc514ccc.png">

History:
<img width="1440" alt="Screen Shot 2021-01-02 at 7 36 40 PM" src="https://user-images.githubusercontent.com/55343494/103469994-30606e00-4d3a-11eb-8f3d-29e356662469.png">

##### Edit your account: 
Here, you can edit your personal info, specifically your age and gender, should they change while you use the app. This then lets nütrient recalculate your nutritional requirements dynamically so you can easily adjust your diet accordingly.

<img width="1440" alt="Screen Shot 2021-01-02 at 7 37 16 PM" src="https://user-images.githubusercontent.com/55343494/103469995-39e9d600-4d3a-11eb-8b14-d007d80f659e.png">

## Technologies used: 
nütrient is a web application created using the **MERN** technology stack. The frontend was designed using **React.js** and **Bootstrap**. The backend of the app uses **Express.js**, a simple server framework for **Node.js**, the primary language used for handling serverside requests. User data is handled on the backend using the **Mongoose** Node module, which allows the backend to easily communicate with the **MongoDB** database. 

User data encryption and authentication are handled using **bcrypt.js** and **Passport.js**, respectively. **bcrypt.js** was used to encrypt user passwords, and **Passport.js** was used to authenticate user logins. 

Nutrient and food information was collected from the [Government of Canada's Candian Nutrient File API](https://open.canada.ca/data/en/dataset/90a31d6a-9131-4f31-a156-cd1f3b2717fe).

View the progress repos:
[Frontend](https://github.com/rohatgiy/nutrienttracker-frontend),
[Backend](https://github.com/rohatgiy/nutrienttracker-backend)

## Copyright and License:
Licensed under the [MIT License](https://github.com/rohatgiy/nutrient/blob/master/LICENSE).
