# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

### Backend API deployed at https://lirbarymanagementproject.azurewebsites.net/

### Swagger documentation https://lirbarymanagementproject.azurewebsites.net/swagger/index.html

### Frontend webste deployed at https://joyful-alpaca-151cb2.netlify.app/

# Welcome to Library management system!

This is a fullstack project that allows a user to interact with a library. It works with a ASP.NET Core backend and React frontend.

Below you can find several diagrams which describe the projects structure and design.

## Table of Contents

1. [Important information](#important-information)
2. [Mandatory features](#mandatory-features)
3. [Requirements](#requirements)
4. [Diagrams](#diagrams)
5. [Testing](#testing)
6. [Areas for improvement](#areas-for-improvement)

### Important information

⚠️ Please read this section if you will demo the features on the website.

1. Sometimes Azure can be slow to respond. Please wait a few extra seconds for fetching from the server.
2. Any JWToken that is made after logging in expires after 5 minutes. Token refreshing is not yet supported.
3. At the moment, some features (cart, user profile) heavily rely on reducers. Please try to avoid refreshing the page during your session to avoid losing data.
4. There is a strange CORS error from Azure, that occurs after a certain number of requests. If this error appears in the console, please inform me in Slack. I will re-deploy the backend, which is a temporary fix for the issue.

## Mandatory features

Mandatory features are implemented both in an API backend, and in a more user-friendly frontend website.

#### User Functionalities (4/4 done)

1. ✅ (authorization and authentication supported, first admin is inserted directly into database) User Management: Users should be able to register for an account and log in. Users cannot register themselves as admin.
2. ✅ (anyone can get all or individual books and authors) Browse Products: Users should be able to view all available products and single product, search and sort products.
3. ✅ (cart is available to logged in users) Add to Cart: Users should be able to add products to a shopping cart, and manage cart.
4. ✅ (users can create their own book loan) Checkout: Users should be able to place order.

#### Admin Functionalities (3/3 done)

1. ✅ User Management: Admins should be able to view and delete users.
2. ✅ Product (Book) Management: Admins should be able to view, edit, delete and add new products (books).
3. ✅ Order (Loan) Management: Admins should be able to view all orders (loans)

## Requirements

1. ✅ Apply CLEAN architecture in your backend. In README file, explain the architecture of your project as well.
2. ✅ Implement Error Handling Middleware: This will ensure any exceptions thrown in your application are handled appropriately and helpful error messages are returned.
3. ✅ Document with Swagger: Make sure to annotate your API endpoints and generate a Swagger UI for easier testing and documentation.
4. ✅ Project should have proper file structure, naming convention, and comply with Rest API.
5. ✅ `README` file should sufficiently describe the project, as well as the deployment.

### Diagrams

#### Clean Architecture

<img src="media/Clean.png" alt="Clean Architecture" width="700"/>

#### Database ERD

<img src="media/DatabaseERD.png" alt="Database ERD"/>

#### CRUD Permissions and expected client interactions

<img src="media/Permissions.png" alt="CRUD Permissions" width="700"/>

### Testing

Added a few unit tests in:

1. Backend: testing custom UserMapper via XUnit.
2. Frontend: testing cartReducer via Jest.

### Areas for Improvement

The project fulfills mandatory features, but, of course, can be improved further. Here are some points that I noted for the future:

1. The website is fairly fragile and is not protected (for example, using debounce) from sending many requests when it is not needed.
2. Testing can be expanded and integration tests should be added.
3. Robustness of the website needs to be improved (for example, redirecting from unsanctioned access to certain routes).
4. Some secondary backend features are implemented as a basis, but do not funtion properly (for example, when updating an enetity in the database, UpdatedAt field does not change to a new date).
