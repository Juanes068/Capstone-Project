# **Capstone-Project**
## **NOWA BARBER-SHOP** 💈

### **Week 1 **
1. Project Title:
- This project aims to develop a barber service booking platform that offers a smooth and user-friendly experience for customers, allowing them to view real-time availability, choose barbers, and manage appointments. At the same time, it provides barbershop owners with efficient tools to manage services, staff, and bookings with ease.
2. Problem Statement:
- The application will allow users to:

  - Register and log in as a customer or administrator.
  - Search and add services (cut, beard, eyebrows...) to their cart.
  - Select date, time and available barber.
  - Confirm your appointment and view your history.

- Administrators will be able to:

  - Create, edit and delete services and barbers.
  - View and manage all appointments.
  - Access reports of best-selling services and daily activity.

3. Brief Overview of the Application’s Functionality:
 

4. Technology Stack

 - Frontend:
  1.  **HTML, CSS, JavaScript**
  2. **React.js** – For building a dynamic and responsive user interface
  3. **Chakra UI** or **Material UI** – For production-ready UI components

- Backend:
    1. **Django (Python)** – A robust web framework with built-in routing, ORM, forms, and admin panel
    2. **Authentication:**
        - django.contrib.auth for session-based login, registration, and user roles
        -Alternatively, djangorestframework-simplejwt for token-based (JWT) authentication

- Database:
    1. **MySQL**
    2. **ORM:** Django's built-in ORM (recommended with Django)

- Extras:
    1. **Email Notifications:** Using `django.core.mail` for appointment confirmations (optional)
    2. **Calendar Integration:** FullCalendar.js or Flatpickr for selecting appointment dates and times

- Version Control:
    1. **GitHub** for version control and collaboration

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
    6. /dashboard → Admin dashboard (admin only)

---
