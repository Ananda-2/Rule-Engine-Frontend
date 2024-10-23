# Rule Engine with Abstract Syntax Tree (AST)

A full-stack Rule Engine application that allows users to create, combine, evaluate, and modify conditional rules using an Abstract Syntax Tree (AST). Built with a React frontend, an Express.js backend, and MongoDB for data storage, this app dynamically creates and evaluates rules based on user input.

## Live Demo

- **Frontend**: [Live App on Netlify](https://dynamic-starburst-b1aac4.netlify.app/)
- **Backend**: [Backend API on Render](https://rule-engine-server-2mnf.onrender.com)
- **Backend Github Link**: [Server Code Github](https://github.com/Ananda-2/Rule-Engine-server)

## Features

1. **Create Rules**

   - Users can input rule strings (e.g., `age > 30 AND department = 'Sales'`).
   - The rule is parsed into an Abstract Syntax Tree (AST) and stored in the MongoDB database.
   - View the resulting AST structure in real-time.

2. **Combine Rules**

   - Users can input multiple rules, and the system combines them using logical operators (`AND`, `OR`).
   - The resulting combination of rules is represented as a single AST.

3. **Evaluate Rules**

   - Input data (as JSON) can be used to evaluate whether it satisfies a given rule's conditions.
   - The system returns `True` or `False` based on whether the data passes the rule conditions.

4. **Modify Existing Rules**
   - Users can modify existing rules by rule ID.
   - The updated rule is parsed, and a new AST is generated.

## Technologies Used

### Frontend

- **React.js**: A powerful JavaScript library for building user interfaces.
- **Axios**: Used for making HTTP requests to the backend.
- **CSS**: For styling and responsive design.

### Backend

- **Node.js**: JavaScript runtime for building scalable backend services.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store rules and AST structures.
- **Mongoose**: ODM library to interact with MongoDB.
- **Serverless-http**: To run Express as a serverless function on Netlify.

## API Endpoints

1. **Create Rule (POST `/create_rule`)**

   - Accepts a rule string and generates an AST.
   - **Example payload**:
     ```json
     {
       "rule": "age > 30 AND department = 'Sales'"
     }
     ```

2. **Combine Rules (POST `/combine_rules`)**

   - Combines multiple rules into a single AST.
   - **Example payload**:
     ```json
     {
       "rules": [
         "age > 30 AND department = 'Sales'",
         "salary > 50000 OR experience > 5"
       ]
     }
     ```

3. **Evaluate Rule (POST `/evaluate_rule`)**

   - Evaluates a rule against provided data.
   - **Example payload**:
     ```json
     {
       "ast": { ... }, // AST generated from a rule
       "data": { "age": 35, "department": "Sales", "salary": 60000 }
     }
     ```

4. **Modify Rule (PUT `/modify_rule/:id`)**
   - Modifies an existing rule by ID.
   - **Example payload**:
     ```json
     {
       "rule": "age > 30 AND department = 'Marketing'"
     }
     ```

## How to Run Locally

### Prerequisites

- Node.js installed on your machine.
- MongoDB set up locally or a cloud MongoDB instance (e.g., MongoDB Atlas).

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/rule-engine.git
   cd rule-engine
   ```
2. Install dependencies:

```bash
npm install
```

3.Set up MongoDB:

Ensure MongoDB is running locally or configure a remote MongoDB URI in your .env file.

4. Start the backend server:

```bash
node server.js
```

Start the frontend React app:

```bash
npm start
```

Visit the app: Go to http://localhost:3000 in your browser to interact with the app.
