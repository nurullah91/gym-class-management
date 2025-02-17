# Gym Class Management

The Gym Class Scheduling and Membership Management System is designed to manage gym operations efficiently. The system defines three roles: Admin, Trainer, and Trainee, each with specific permissions. Admins are responsible for creating and managing trainers, scheduling classes, and assigning trainers to these schedules. Each day can have a maximum of five class schedules, with each class lasting two hours. Trainers conduct the classes and can view their assigned class schedules but cannot create new schedules or manage trainee profiles. Trainees can create and manage their own profiles and book class schedules if there is availability, with a maximum of ten trainees per schedule.

The system enforces several business rules to ensure smooth operations. Admins are limited to scheduling a maximum of 5 classes per day, and each schedule can accommodate no more than 10 trainees. If a class schedule reaches its capacity, trainees will be prevented from making further bookings, and admins cannot create additional schedules beyond the daily limit. JWT-based authentication is implemented to control access, ensuring that only authorized users can perform specific actions, such as booking classes or managing trainers. Robust error handling is integrated throughout the system, addressing issues such as unauthorized access, validation errors, and booking limit violations. This system provides an organized and flexible solution for managing gym class scheduling and membership, with well-defined roles and responsibilities.

**Three models are**

1. User Model
2. Schedule Model
3. Booking Model

#### **Entity Relationship Diagram Diagram**

![ER DIAGRAM](./er-diagram.png)
Description: This is an updated diagram illustrates the relationships among User, Schedule, and Bookings.

Here is the lucid chard link of model diagram [link](https://lucid.app/lucidchart/92b6f7c7-0652-4baa-811c-9be3fc129533/edit?viewport_loc=-157%2C-446%2C2488%2C1142%2C0_0&invitationId=inv_06581349-aabb-40be-8a4b-3f362d16d7a0)

---

**Postman collection for API endpoints**
![POSTMAN COLLECTION](./Gym-class-Management.postman_collection.json)

Description: This is a postman collection of all the API endpoints.Download this , and import it in your postman if you needed. If you cannot download from here. Also you will find the postman collection in the root directory of the code

---

- **No Data found response:**

```
   {
  "success": false,
  "statusCode": 404,
  "message": "No Data Found",
  "data":[]
}
```

---

- **Authentication error response:**

```
 {
  "success": false,
  "statusCode": 401,
  "message": "You have no access to this route",
}
```

---

### ** Use Authorization with bearer for every authenticated request **

---

### ■ Local installation guideline:

first clone this repository, add the env variables you will find it in env.example then give this command in you terminal

```language
npm i
npm run dev
```

---

## Live link of Server side production [link](https://gym-class-management-olive.vercel.app/)
