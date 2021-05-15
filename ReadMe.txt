Project Description:
Pizzeria is a website where the customer can order delicious pizza while relaxing at home. The website offers a range of functionalities for the user. The user , upon login, can navigate to a pizza catalog page where he can select pizzas and also search for them using search filters. Search filters include searching by pizza name and categories(Vegetarian and non-vegetarian pizzas). After deciding upon the pizza, he can add them to the cart, from where he can proceed to check out. He can update the quantities of pizza in the cart too. The website also offers the feature of viewing the order history. The admin user can update, add and delete pizza from the inventory. The delete implemented in the project is soft delete. New users have to register before logging in. 
We have taken the following assumptions in the project:
•	User never cancels the order.
•	Payment is made when the user checks out.

Database Design:
We have used mongodb as our database, which stores the data as a JSON object as it is very easy to handle in javascript. We have used embedded data models . We are using five collections. They are accounts and sessions in passport_local_mongoose_express5 database and pizzas,cart and wishlist in pizza_orders database. Accounts has the user information, pizzas is the inventory data for pizzas available in pizzeria, cart contains the information regarding the pizzas which the user adds to the cart and wishlist has the user’s order history data.


Languages used for implementation:
The website uses Node JS runtime environment. The front end design has been done using Angular JS and bootstrap. We have used Express JS  for the server side scripting to implement RESTful webservices.
