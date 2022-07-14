# ASP.NET 5 Microservers + Angular + MongoDB + SQL Server + Docker 

## Docker Containers 
- In the course, we looked at how to download a set up Docker Desktop for Windows. 
- After, we installed several images for the project 
    - MongoDB 
    - SQL Server (And through cmd set an admin user called SA) 

## Microservice Net core 5 
- Although Net Core Version 6 is already out, and Version 5 is out of support, I had to be careful downloading compatible version for each section. 

## Repository Pattern 
- In this course, we structure our entities with a repository pattern 
- Repositories are classes or components that encapsulate the logic required to access data sources. 
- They centralize common data access functionality, providing better maintainability and decoupling the infrastructure or technology used to access databases from the domain model layer. 

## Pagination 
- After creating a repository, we start creating a structure for basic pagination. 

## Generic Collection Handler  
- Seeing that it will be problematic creating a repository for each entity, we can create a Generic TDocument for MongoDB with some generic methods that can be easily inherited to an entity. 

## Angular Setup 
- For this part of the Course, I differed from what the Course was explaining, I added Lazy Loading Modules and a Shared section with components, partials, Material and services. 
- Explored how to stream data stored from the services with Subjects and subscriptions 
- Another change from the code course is that in some modules I used the pipe async for a cleaner code. 

## Angular Security 
- We created an Auth Service and added it to the routes that we needed, also created module for authorization with login and register in it. 

## Core Identity and Security 
- Created another Project to handle authorization and user administration. Installed some dependencies for Core Identity and Entity Framework Core. 
- Also installed dotnet-ef version 5 and creating a migration file that'll insert into a SQL Server all required tables and data for Core Identity. 

## CQRS Pattern 
- CQRS Stands for Command and Query Responsibility Segregation, a pattern that separates read and update operations for a data store. 
- CQRS separates reads and writes into different models, using commands to update data, and queries to read data. 
    - Commands should be task-based, rather than data centric. 
    - Commands may be placed on a queue for async processing, rather than being processed synchronously. 
    - Queries never modify the database. A query returns a DTO that does not encapsulate any domain knowledge. 
- Benefits of CQRS include:  
    - Independent scaling 
    - Optimized data Schemes 
    - Security 
    - Separation of concerns 
    - Simpler Queries 
- We reviewed also the implementation of DTO (Data Transfer Object), which helps us protect valuable data by only sending the needed information. 

## JWT in Net core 
- We installed some dependencies for handling JWT Token generation 
- Implemented first on our registration and login methods to return a generated Token Session 
- Created a new method to get current validation. 

## API Gateway with Ocelot in Net Core 5 
- Created a new project called Gateway, and installed Ocelot to handle the redirections. 
- Ocelot can be configured in start.cs and add Authentication too. 
- Lastly, you can configure the redirections through a JSON File and for each route configure, we can set the port the protocol and if needs authentication. 

## Angular JWT and Session Persistence 
- Finally, we store the given JWT in the Local Storage to persist the session, activated the Guards for protected modules and set an HTTP Interceptor for adding the token, if it exists, in every request. 
- Also improved our Auth Services, by validating by the Token and implemented the methods for register and login. 
