

# RESTful Blog Application API  

**Project ID:** SCR845NGFF  

A fully functional RESTful API for a blog application, enabling users to create, read, update, and delete blog posts and comments. This API also includes user authentication with JWT and role-based access control (RBAC).  

---

## Features  

1. **User Authentication**  
   - Register and login users securely using JWT.  
   - Role-based access control for admin and regular users.  

2. **Blog Post Management**  
   - Create, read, update, and delete blog posts.  
   - Fetch all posts or individual posts by ID.  

3. **Comment Management**  
   - Add, read, update, and delete comments for posts.  
   - Fetch comments by post ID.  

4. **Validation and Error Handling**  
   - Comprehensive input validation.  
   - Detailed error messages for API consumers.  

5. **Database**  
   - MongoDB schema to store users, posts, and comments.  

6. **Testing**  
   - Unit and integration tests to ensure code reliability.  

---

## Installation  

### Prerequisites  
- **Node.js**  
- **MongoDB** (Locally installed or hosted, e.g., MongoDB Atlas).  
- **Package Manager:** npm/yarn.  

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/yourusername/blog-api.git
   cd blog-api
```

2. Install dependencies:  
   ```bash
   npm install
   ```  

3. Configure the `.env` file:  
   ```env
   PORT=5000  
   MONGO_URI=your_mongodb_connection_string  
    
   ```  

4. Start the server:  
   ```bash
   npm start
   ```  

---

## API Endpoints  

### Authentication  
- **POST** `/register`: Register a new user.  
- **POST** `/login`: Login and receive a JWT.  

### Blog Posts  
- **GET** `/posts`: Fetch all blog posts.  
- **GET** `/posts/{id}`: Fetch a specific blog post by ID.  
- **POST** `/posts`: Create a new blog post (Admin only).  
- **PUT** `/posts/{id}`: Update a blog post by ID (Admin only).  
- **DELETE** `/posts/{id}`: Delete a blog post by ID (Admin only).  

### Comments  
- **GET** `/comments?post_id={post_id}`: Fetch comments for a specific post.  
- **GET** `/comments/{id}`: Fetch a specific comment by ID.  
- **POST** `/comments`: Add a comment to a post.  
- **PUT** `/comments/{id}`: Update a comment by ID.  
- **DELETE** `/comments/{id}`: Delete a comment by ID.  

---

## Database Schema  

- **Users Collection:**  
   ```json
   {
     "_id": "ObjectId",
     "username": "string",
     "password": "hashed string",
     "email": "string",
     "role": "string (user | admin)"
   }
   ```  

- **Posts Collection:**  
   ```json
   {
     "_id": "ObjectId",
     "title": "string",
     "content": "string",
     "author_id": "ObjectId",
     "created_at": "timestamp",
     "updated_at": "timestamp"
   }
   ```  

- **Comments Collection:**  
   ```json
   {
     "_id": "ObjectId",
     "post_id": "ObjectId",
     "content": "string",
     "author_id": "ObjectId",
     "created_at": "timestamp"
   }
   ```  

---

## Testing  

1. **Unit Testing:**  
   - Tests individual endpoints for correctness.  

2. **Integration Testing:**  
   - Verifies interactions between components.  

To run tests:  
```bash
npm test
```  

---

## Tools and Technologies  

- **Programming Language:** Node.js.  
- **Framework:** Express.js.  
- **Database:** MongoDB.  
- **Authentication:** JSON Web Tokens (JWT).  

---

## Contribution  

1. Fork the repository.  
2. Create a feature branch:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit your changes:  
   ```bash
   git commit -m "Add feature-name"
   ```  
4. Push the branch:  
   ```bash
   git push origin feature-name
   ```  
5. Open a pull request.  

