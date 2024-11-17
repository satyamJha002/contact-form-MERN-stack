# Contact Form Using MERN Stack  

This project is a simple **Contact Form** built with the **MERN stack** (MongoDB, Express.js, React.js, and Node.js). It allows users to submit their contact details such as first name, last name, email, phone number, company name and job title, with the data being stored in a MongoDB database.  

## Features  
- **Form Validation**: Ensures proper data input before submission.  
- **CRUD Functionality**: Create, Read, Update, and Delete records via the frontend interface.  
- **Data Display**: Displays submitted data in a table format with options to edit or delete entries.  

## Technical Decisions  
- **MongoDB** was chosen for its flexibility in storing structured data.  
- **Express.js** was used to handle API requests.  
- **React.js** provides a dynamic, user-friendly frontend.
- **MUI** provide for styling the frontend. MUI provides pre-designed, responsive, and customizable components, making the UI development faster and more consistent.
- **Tailwind CSS** simplifies styling with utility-first CSS.  

## Application Workflow  
1. The **frontend** (React.js) displays a form for user input and a table for viewing and managing data.  
2. Form validation ensures data integrity before submission.  
3. The **backend** (Node.js with Express.js) receives data from the form, processes it, and stores it in **MongoDB**.  
4. The table displays records, allowing updates or deletion.  
---

## Installation and Setup  

### Prerequisites  
- **Node.js** and **npm** installed.  
- **MongoDB** running locally or on a cloud provider like MongoDB Atlas.  

### 1. Clone the Repository  
```bash  
git clone https://github.com/your-username/contact-form-MERN-stack.git  
cd contact-form-MERN-stack  
```  

### 2. Install Dependencies  
#### Backend  
```bash
npm install  
```  
#### Frontend  
```bash  
cd frontend 
npm install  
```  

### 3. Configure Environment Variables  
#### Backend  
Create a `.env` file in the `server` directory:  
```env  
PORT=5000  
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority  
```  

### 4. Database Schema Script  
Use the following schema for MongoDB:  

#### Schema (Mongoose)  
```javascript  
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please enter the first name."],
  },
  lastName: {
    type: String,
    required: [true, "Please enter the last name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter the mobile number"],
  },
  companyName: {
    type: String,
    required: [true, "Please enter the company name"],
  },
  jobTitle: {
    type: String,
    required: [true, "Please enter job role."],
  },
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;

```  

### 5. Start the Application  
#### Concurrently
In backend package.json,  I have use concurrently to run both frontend and server in one command.
```bash
npm run dev
```
#### Backend  
```bash   
npm start  
```  
#### Frontend  
```bash  
cd frontend 
npm start  
```  

### 6. Access the App  
- Frontend: Open `http://localhost:5173` in your browser.  
- Backend API: Runs on `http://localhost:5000`.  

---

## Folder Structure  
```
contact-form-MERN-stack  
├── frontend (React frontend)  
├── connection (mongodb connection) (Node.js + Express backend)  
├── models (Database schema)  
├── routes (API endpoints)  
├── controllers (Request handlers)  
└── .env (Environment variables)
index.js
```  

---

## API Endpoints  

### **Base URL**: `http://localhost:5000/api`  

| Endpoint           | Method | Description               |  
|--------------------|--------|---------------------------|  
| `/contacts`        | GET    | Fetch all contact records |  
| `/contacts`        | POST   | Add a new contact         |  
| `/contacts/:id`    | PUT    | Update a contact          |  
| `/contacts/:id`    | DELETE | Delete a contact          |  

---

## Future Enhancements  
- Add user authentication to protect CRUD operations.  
- Enhance the UI with better animations and responsiveness.  

## Contributions  
Feel free to submit issues or pull requests to enhance this project.  

---
