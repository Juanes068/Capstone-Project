# **Capstone-Project**
## **NOWA BARBER-SHOP** 

### **Week 1**


1. Project Title:
- This project aims to develop a barber service booking platform that offers a smooth and user-friendly experience for customers, allowing them to view real-time availability, choose barbers, and manage appointments. At the same time, it provides barbershop owners with efficient tools to manage services, staff, and bookings with ease.
2. Problem Statement:
- The application will allow users to:

  - Register and log in as a customer or administrator.
  - Search and add services (cut, beard, eyebrows...) to their cart.
  - Select date, time and available barber.
  - Pay for the service
  - Confirm your appointment and view your history.

- Administrators will be able to:

  - Create, edit and delete services and barbers.
  - View and manage all appointments.
  - Access reports of best-selling services and daily activity.

3. Brief Overview of the Application’s Functionality:

 NOWA BARBER-SHOP is a web application where customers can view and choose differetns services (cut, beard, eyebrows...), add them to the cart, select date, time and barber, finally confirm the appointment.

4. Technology Stack

 - Frontend:
  1.  **HTML, CSS, JavaScript**
  2. **React.js** For building a dynamic and responsive user interface
  3. **Bootstrap** For responsive design and ready-to-use UI components

- Backend:
    1. **Django (Python)**  A robust web framework with built-in routing, ORM, forms, and admin panel
    2. **Authentication:**
        - django.contrib.auth for session-based login, registration, and user roles
        -Alternatively, djangorestframework-simplejwt for token-based (JWT) authentication

- Database:
    1. **MySQL**
    2. **ORM:** Django's built-in ORM

- Extras:
    1. **Email Notifications:** Using "django.core.mail" for appointment confirmations (optional)
    2. **Calendar Integration:** FullCalendar.js for selecting appointment dates and times

- Version Control:
    1. **GitHub** for version control and collaboration
- API
    1. STRIPE
    2. google maps API

4. Features

- For Clients:
    1. User registration and login
    2. Browse available services
    3. Schedule appointments (select service, date, time, and barber)
    4. View appointment history

- For Admins:
    1.Full CRUD for services and barbers
    2.Manage and edit appointments
    3. Admin dashboard with activity reports

- Routing

    1. / → Home page
    2. /login → User login
    3. /register → User registration
    4. /services → List of available services
    5. /book → Appointment booking page
    6. /payment → Payment page
    7. /dashboard → Admin dashboard (admin only)

---

### **Week 2**

1. High-Level Design
   
  * High-level architecture diagrams

![image high-level architecture diagrams](assets/V.3.drawio.png)

  * User and administrator flows

![user and administrator flows](assets/week2-day1-V2.drawio.png)

  * Mockups
    * UI interface
  >> https://www.figma.com/design/HxMVMIfhWWMR6wQIGFG3zc/USER-INTERFACE?node-id=0-1&m=dev&t=7MsyYqLGQb9l4ElF-1

2. Database Schema Design  
   - Tables:  
     1. User  
     2. Admin  
     3. Service  
     4. Worker  
     5. Appointment  
     6. Cart  
     7. Payment  
     8. Review (feedback)  
   * Relationships
     * A User can have many Appointments
     * A Barber can handle many Appointments
     * A Service can be included in many Appointments
     * An Appointment has one Barber, one User, and one or more Services
     * A User can leave many Reviews, each linked to a Service
   * Tables (ERD)
![NOWA tables](assets/TablesV2.png)
- CRUD Operations:  
     1. USER  
        - CREATE – Sign up  
        - READ – View profile  
        - UPDATE – Edit profile  
        - DELETE – Delete account and credentials  
     2. SERVICE  
        - CREATE – Add new service  
        - READ – View services  
        - UPDATE – Edit service details  
        - DELETE – Remove service  
     3. APPOINTMENT  
        - CREATE – Client books an appointment  
        - READ – Client/Admin views appointments  
        - UPDATE – Change date, time, or status  
        - DELETE – Client or Admin cancels/deletes appointment  
     4. WORKER  
        - READ – View list of workers  
        - UPDATE – Edit worker profile  
     5. PAYMENT  
        - CREATE – When client confirms appointment (test mode with Stripe)  
        - READ – View payment records  
     6. REVIEW  
        - CREATE – Client leaves feedback  
        - READ – View reviews by service  
  3. API Endpoints, Request/Response Formats, and Authorization

The NOWA BARBER-SHOP API is a RESTful service built with Django REST Framework. It supports full CRUD operations for users, services, barbers, appointments, payments, and reviews.

### Authorization

- Uses **JWT (JSON Web Tokens)** for protected routes via djangorestframework-simplejwt.
- Required header for authenticated endpoints:

http
Authorization: Bearer <your_token_here>

### User Endpoints

| Method | Endpoint           | Description               | Auth Required |
|--------|--------------------|---------------------------|----------------|
| POST   |  /api/register/    | Create new user account   | No             |
| POST   |  /api/login/       | Login and receive token   | No             |
| GET    |  /api/profile/     | Get user profile info     | Yes            |
| PATCH  |  /api/profile/     | Update user profile       | Yes            |

**Sample Request (POST /api/register/):**

json
{
  "username": "juan",
  "email": "juan@email.com",
  "password": "securepass123"
}


**Sample Response:**

json
{
  "id": 1,
  "username": "juan",
  "email": "juan@email.com"
}

### Service Endpoints

| Method | Endpoint                | Description             | Auth Required  |
|--------|-------------------------|-------------------------|----------------|
| GET    |  /api/services/admin/   | List all services       | Yes            |
| POST   |  /api/services/         | Create service          | Yes (Admin)    |
| PATCH  |  /api/services/{id}/    | Update service          | Yes (Admin)    |
| DELETE |  /api/services/{id}/    | Delete service          | Yes (Admin)    |

### Worker (Barber) Endpoints

| Method | Endpoint                | Description             | Auth Required  |
|--------|-------------------------|-------------------------|----------------|
| GET    |  /api/barbers/          | List all barbers        | Yes (Admin)    |
| POST   |  /api/barbers/create/   | Add new barber          | Yes (Admin)    |
| PATCH  |  /api/barbers/{id}/     | Update barber info      | Yes (Admin)    |
| DELETE |  /api/barbers/{id}/     | Delete barber           | Yes (Admin)    |

### Appointment Endpoints

| Method | Endpoint                   | Description                    | Auth Required |
|--------|----------------------------|--------------------------------|----------------|
| GET    |  /api/my-appointments/     | View user/admin appointments   | Yes            |
| POST   |  /api/appointments/        | Create new appointment         | Yes            |
| PATCH  |  /api/appointments/{id}/   | Modify appointment             | Yes            |
| DELETE |  /api/appointments/{id}/   | Cancel appointment             | Yes            |

### Payment Endpoints (Stripe)

| Method | Endpoint                      | Description                        | Auth Required  |
|--------|-------------------------------|------------------------------------|----------------|
| POST   | /api/checkout/                | Create Stripe checkout session     | Yes            |
| GET    | /api/payment/                 | Retrieve payment status            | Yes            |

*Payments are handled in test mode via Stripe Test API *

### Review Endpoints

| Method | Endpoint               | Description                     | Auth Required |
|--------|------------------------|---------------------------------|----------------|
| POST   | /api/reviews/          | Submit a service review         | Yes            |
| GET    | /api/reviews/{service}/| View reviews for a service      | No             |



### Week 3, 4 & 5: Development – Backend 

### Initial migrations and superuser setup
- The developer ran "python manage.py migrate" to apply Django’s default migrations (for users, sessions, admin, etc.).
- Then, I created a superuser using "createsuperuser" to get access to the Django Admin Panel.
![SUPER USER INTERFACE](assets/SUPERUSERINTERFACER.png)

### Routes connection and test endpoint
- A new "core/urls.py" file was created to define the app’s internal routes.
- It was linked to the main router in "barber_backend/urls.py" using "path('api/', include('core.urls'))".
- A test route "/api/ping/" was implemented and returned a simple JSON: "{"message": "pong"}".

### User registration ("/api/register/")
- A public endpoint "POST /api/register/" was created to allow new user registration.
- The view used "User.objects.create_user()" to create users with a username, email, and password.
- CSRF checks were disabled using "@csrf_exempt" since it's consumed via Postman or external clients.
![API REGISTER](assets/APIendpointPOSTMANregisterpost.png)
### JWT authentication ("/api/login/")
- The developer installed "djangorestframework" and "djangorestframework-simplejwt".
- JWT support was added to "settings.py" under "REST_FRAMEWORK" settings.
- The login endpoint "POST /api/login/" was added using "TokenObtainPairView", returning "access" and "refresh" tokens.
![API LOGIN](assets/loginPOSTMANAPIendpoint.png)
### Authenticated user profile ("/api/profile/")
- A protected route "GET /api/profile/" was added using "@permission_classes([IsAuthenticated])".
- It returns the authenticated user’s "username", "email", and "id".
- Requires sending the JWT "access" token in the "Authorization" header.
![API GET PROFLE](assets/apiENDPOINTGETpostman.png)

### Appointments model and creation ("/api/appointments/")
- The models "Service", "Barber", and "Appointment" were defined in "models.py".
- Migrations were generated and applied to create the related tables.
- These models were registered in the admin to be created easily through the dashboard.
- A serializer was created for the "Appointment" model.
- A secure endpoint "POST /api/appointments/" was implemented to allow users to book a service by sending "service", "barber", "date", and "time". The "user" field is automatically set using the JWT token.
![API APPOIMENTS](assets/postAPPOIMENT.png)
### GET /api/my-appointments/
- View protected with "IsAuthenticated"
- Returns appointments ("Appointment") only for the authenticated user
- Serializer: "AppointmentSerializer"
- Tested with JWT in Postman
![API GET APPOIMENT](assets/GETAPPOIMENTS.png)
### POST /api/checkout/
- Integrated Stripe Checkout in test mode
- Creates a payment session for an existing "Appointment"
- Returns a "checkout_url" to the frontend
- Redirection corrected by adding "/api/success/" and "/api/cancel/" routes
- Successfully tested via Postman and browser
![API POST PAYMENT](assets/POSTpayment.png)
### GET /api/payments/
- Created the "Payment" model with fields: "user", "appointment", "amount", "payment_date"
- Created "PaymentSerializer"
- Protected view listing payments for the authenticated user
- Initially tested by manually creating a "Payment" via the admin
![API GET PAYMENT](assets/GETpayment.png)

### PATCH /api/profile/
- Protected route to update user's own profile (username and email).
- Uses PATCH method with JWT authentication required.
- Implemented using request.user to ensure ownership.
- Tested in Postman with valid token and partial data.

### PATCH /api/appointments/{id}/
- Allows authenticated users to modify their own appointments.
- Fields like date, time, service, and barber can be updated.
- Secured with user-level filtering ("user=request.user").
- Returns 404 if appointment does not belong to the user.

### DELETE /api/appointments/{id}/
- Enables users to cancel their own appointments.
- Protected with "IsAuthenticated" and filters by user ownership.
- Returns 204 No Content on successful deletion.

### GET /api/barbers/
- Lists all barbers in the system.
- Access restricted to admin users only (IsAdminUser).
- Returns barber info including id, name, specialty, and availability.

### POST /api/barbers/create/
- Allows superusers to create a new barber.
- Required fields: name, optional: specialty, availability.
- Protected with IsAdminUser.
- Uses BarberSerializer for validation and saving.

### PATCH /api/barbers/{id}/
- Allows admin to update barber info.
- Accepts partial updates (e.g., name, specialty).
- Protected by admin-only access.

### DELETE /api/barbers/{id}/
- Deletes a barber by ID.
- Access restricted to admin users only.
- Returns 204 on success or 404 if barber not found.

### POST /api/services/
- Creates a new service.
- Access restricted to admin users only.
- Returns created service data on success.

### PATCH /api/services/{id}/
- Updates a service by ID.
- Access restricted to admin users only.
- Returns updated service data on success.

### DELETE /api/services/{id}/
- Deletes a service by ID.
- Access restricted to admin users only.
- Returns 204 on success or 404 if service not found.

### GET /api/appointments/
- Retrieves a list of all appointments in the system.
- Access restricted to admin users only.
- Returns a list of all appointments.

### POST /api/reviews/
- Allows authenticated users to leave a review for a service.
- Includes rating and comment fields.
- Returns created review data on success.

### GET /api/reviews/{service}/
- Retrieves all reviews for a specific service.
- Public access.
- Returns a list of reviews with rating and comment.

### GET /api/dashboard/most-booked-services/
- Shows top 5 services with the highest booking counts.
- Access restricted to admin users only.
- Returns service names with booking counts.

### GET /api/dashboard/daily-activity/
- Shows the number of appointments per day.
- Access restricted to admin users only.
- Returns a list of dates with appointment counts.

### Stripe integration in POST /api/checkout/
- Integrated Stripe payments directly into the "/api/checkout/" endpoint.
- Calculates the total payment by summing all services linked to the appointment.
- Sends the correct amount to Stripe Checkout.
- Uses metadata to pass the "appointment_id" for identification.
- Configured the system to automatically register payments made through Stripe into the "Payment" model upon successful checkout using the webhook.
- Ensures Stripe payments reflect in the NOWA BARBER-SHOP system automatically.

### GET /api/services/admin/
- Lists all services in the system.
- Access restricted to superusers only.
- Returns full details of all services for management and audit purposes.

### GET /api/reviews/{service_id}/
- Lists all reviews for a specific service.
- Public access; no authentication required.
- Returns user rating and comments for the service.

### POST /api/reviews/
- Allows authenticated users to submit reviews for services.
- Users can submit rating and comments linked to a service.
- Adds user feedback to the system for visibility on service pages.

### GET /api/my-appointments/
- Lists all appointments for the authenticated user.
- Used to display user appointment history in the frontend.

### GET /api/payments/
- Lists all payments made by the authenticated user.
- Allows users to view their payment history.
- Integrated with Stripe webhook to automatically register payments.

### Stripe integration for checkout
- Configured Stripe Checkout to:
- Redirect to the frontend confirmation page after payment.
- Automatically register payments in the "Payment" model upon webhook confirmation.
- Update appointment payment status seamlessly in NOWA BARBER-SHOP.

### DELETE /api/reviews/delete/<id>/
- Allows admin users to delete specific reviews from the system.
- Secured with IsAdminUser to prevent unauthorized deletions.
- Permanently removes a review identified by its id for moderation or cleanup purposes.

### Week 3, 4 & 5: Development – Front- end 

### login
- Created the **Login page** using Vite + React + Bootstrap.
- Implemented form fields for "username" and "password".
- Connected to backend "/api/login/" to obtain JWT tokens.
- Stores the "access" token in "localStorage" after successful login.
- Redirects authenticated users to "/Home".


### register
- Created the **Register page** with form fields for "username", "email" and "password".
- Connected to backend "/api/register/" to create a new user.
- Displays success or error alerts after registration.
- Redirects new users to "/login" after successful registration.
- Added **navigation button** on login to access register form.

### Home
- Designed minimalistic **Home page** with a clear headline for NOWA BARBER-SHOP.
- Includes “Book Now” call-to-action button redirecting to "/login".
- Uses clean black-and-white branding consistent with the whole app.

### profile
- Created **Profile page** to display user data ("id", "username", "email").
- Fetches authenticated user data from backend "/api/profile/" using JWT.
- Displays user info in a styled React-Bootstrap Card.
- Added **Edit Profile** button to navigate to "/edit-profile".


### edit-profile
- Implemented **Edit Profile page** connected to backend "/api/profile/" (PATCH).
- Pre-fills "username" and "email" fields with current profile data.
- Sends PATCH request to update user information.
- Displays success and error messages on update.

### Logout
- Implemented **Logout button** in Navbar.
- Clears JWT token from "localStorage" on click.
- Redirects to "/login" after logout to close the session.

### Footer
- Added a minimalistic **Footer component**.
- Uses black background with neutral text.
- Ensures clear spacing from content 

### Home Page ("Home.jsx")
- Title and general description about NOWA Barbershop.
- Carousel displaying services (haircut, shave, eyebrow styling).
- Embedded Google Maps showing the shop location.
- Displays client reviews pulled dynamically using "GET /api/reviews/1/".
- Footer implemented with a clean, minimal style.

### Services Page ("ServicesPage.jsx")
- Displays all available services with images, names, descriptions, and prices.
- Allows users to view details of each service.

### Service Detail Page ("ServiceDetail.jsx")
- Displays service details with image on the left and information on the right.
- Shows reviews for the service.
- Allows users to submit reviews with:
  - Vertical radio button selection for rating using stars.
  - Comment input.
- Updates reviews dynamically upon submission.

### Booking Page ("BookAppointment.jsx")
- Allows users to book appointments by:
  - Selecting services.
  - Selecting barbers (with images).
  - Choosing date and time.
- Integrated Stripe payment button:
  - On booking confirmation, redirects to Stripe Checkout.
  - Upon successful payment, redirects back to frontend payment confirmation.

### Profile Page ("Profile.jsx")
- Displays user profile information (ID, username, email).
- Buttons for:
  - Editing profile.
  - Viewing appointments history ("/appointments").
  - Viewing payment history ("/payments").

### Appointments Page ("AppointmentsPage.jsx")
- Displays authenticated user's appointment history:
  - Appointment ID, date, time, status, and booked services.

### Payments Page ("PaymentsPage.jsx")
- Displays authenticated user's payment history:
  - Payment ID, amount, date, and linked appointment ID.