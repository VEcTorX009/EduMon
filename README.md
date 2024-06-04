# Edumon

Edumon is an AI-powered social networking platform built with Next.js, TailwindCSS, Clerk API, OpenAI API, and MongoDB. It's designed to connect schools, students, and clubs within a dynamic and engaging environment.  Schools can create profiles showcasing their unique features, establish clubs for students to join, and post announcements to keep everyone informed. Students can participate in clubs and activities, stay updated on school news, and connect with others through the built-in social networking features. Edumon allows schools to share their stories, connect with their communities, and foster a vibrant learning ecosystem.


## Dependencies

This project is a social networking platform for schools powered by AI. It allows schools to create profiles, showcase their activities, and manage clubs. Students can participate in clubs, view announcements, and engage in social networking features. The platform is built using Next.js for the frontend, TailwindCSS for styling, and ClerkAPI for user authentication. Openai API is integrated for generating content and enhancing user interactions. The backend utilizes MongoDB for data storage. 


## Usage

1. Ensure all dependencies are installed. You can install all dependencies by running `npm install` in the project's root directory.
2. Start the development server by running `npm run dev` in the project's root directory.
3. This will open the application in your browser, and you can start exploring and interacting with Edumon.
4. The application utilizes various third-party APIs for its features, such as OpenAI API for generating text content, Clerk API for user authentication, and MongoDB for data storage. You can find the necessary API keys and configurations in the `mongodb.js` and `next.config.js` files.
5. The Edumon application is built using a combination of Next.js for the frontend, Tailwind CSS for styling, and MongoDB for database management. The core functionality of the platform revolves around connecting schools and students through clubs, activities, and social interactions.
6. The `schools.json`, `users.json`, and `clubs.json` files represent the database structure for the application, storing information about schools, users, and clubs. 
7. The frontend components are organized into various files like `Home.jsx`, `Navbar.jsx`, `Sidebar.jsx`, `Welcome.jsx`, and `Details.jsx`, each responsible for a specific aspect of the user interface. 
8. The backend logic is implemented in files like `index.js`, `[slug].js`, `events.js`, and `explore.js`, handling user requests and interactions with the database. 
9. Edumon provides a platform where schools can create profiles, set up clubs, and manage their activities. Students can join clubs, participate in events, and interact with other students from their school and other schools.
10. The application aims to foster a sense of community and provide a centralized space for school-related information, announcements, and interactions. 


## Code Structure

The key components of the code include:
- **UI:** The application's user interface is built using `NextJS` and styled with `TailwindCSS` for a modern and responsive look.
- **Database:** The project utilizes `MongoDB` to store and manage data related to schools, clubs, users, posts, events, and other relevant information.
- **Authentication:**  `ClerkAPI` handles user authentication and authorization, enabling secure login and user management.
- **Social Features:** The platform includes features like posting, liking, commenting, and interacting with other users within the school community.
- **School Management:** Schools can create their profiles, showcase their details, manage clubs and activities, and post announcements within the platform.
- **Club Management:**  Students can join clubs, participate in activities, and access information related to their clubs.
- **AI Integration:** The project utilizes `OpenaiAPI` for features like generating text, understanding context, and potentially enhancing other functionalities, although specific implementations are not provided in the file list. 
- **API Requests:**  The `fetchData.js` file is likely responsible for handling API requests to fetch and manage data from the database and other services.
- **Components:** The project includes various components such as `Navbar.jsx`, `Sidebar.jsx`, `Home.jsx`, and others to create the user interface and manage application flow. 
- **Server-Side Rendering:** `NextJS` enables server-side rendering and dynamic data fetching, improving SEO and performance. 



## Folder Structure

- `CustomLoader.jsx`:  Component for displaying loading animations.
- `Details.jsx`: Component for displaying detailed information.
- `fetchData.js`: Contains functions for fetching data from various sources like MongoDB or external APIs.
- `Home.jsx`: Component for the homepage.
- `Navbar.jsx`: Component for the navigation bar.
- `Sidebar.jsx`: Component for the sidebar navigation.
- `Welcome.jsx`: Component for the welcome screen.
- `errors.txt`: A file for storing errors encountered during development.
- `mongodb.js`: Contains functions for connecting to and interacting with the MongoDB database.
- `next.config.js`: Configuration file for Next.js, defining build settings and optimizations.
- `package-lock.json`:  Contains information about the project's dependencies and their versions.
- `package.json`:  The project's manifest file, defining dependencies, scripts, and other configuration.
- `README.md`: This file, providing information about the project.
- `comment.js`: File containing functions related to comments.
- `hello.js`: File containing functions related to greetings.
- `join.js`: File containing functions related to joining clubs or communities.
- `leave.js`: File containing functions related to leaving clubs or communities.
- `like.js`: File containing functions related to liking posts or content.
- `register.js`: File containing functions related to user registration.
- `[type].js`: A generic file for specific types of content or functionalities.
- `index.js`: The main file for different pages and functionalities.
- `[slug].js`: A file for handling individual pages or content based on a unique slug.
- `clubs.js`: File containing functions related to clubs and clubs-related data.
- `clubs.json`: A JSON file storing data about clubs.
- `competetions.json`:  A JSON file storing data about competitions.
- `notifications.json`: A JSON file storing data about notifications.
- `posts.json`:  A JSON file storing data about posts.
- `schools.json`: A JSON file storing data about schools.
- `users.json`: A JSON file storing data about users.
- `webinars.json`: A JSON file storing data about webinars.
- `workshops.json`: A JSON file storing data about workshops.
- `globals.css`: Contains global CSS styles.
- `tailwind.config.js`: Configuration file for TailwindCSS, defining the styling framework. 


## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to modify and distribute the code as per the terms of the license. 


