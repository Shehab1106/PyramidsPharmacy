To set up and run the PyramidsPharmacy project, first, ensure you have Docker and Git installed. Clone the repository by running git clone https://github.com/Shehab1106/PyramidsPharmacy.git and navigate to the project folder using cd PyramidsPharmacy.

Create a .env file inside the myproject directory and add the following: SECRET_KEY=your_django_secret_key, DEBUG=True, ALLOWED_HOSTS=*, and DATABASE_URL=postgres://postgres:1234@db:5432/pyramids_db.

Build and run the Docker containers by executing docker-compose up --build from the root directory and wait for the containers to start. Access the Django backend at http://localhost:8000 and the React frontend at http://localhost:3000. Ensure Docker is running properly; if you encounter port conflicts, modify docker-compose.yml to use different ports.

Use docker-compose down to stop the containers and docker-compose up --build to rebuild them if needed. This setup allows you to access the application, register/login, view medications, request refills, and explore the dashboard.
