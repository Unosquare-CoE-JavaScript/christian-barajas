#  Backend Concepts & Some ExpressJS 

## NPM Packages for NodeJS
- **Express** - This framework was designed to be flexible enough to produce single-page apps, multi-page apps, and hybrid apps for dekstop and mobile devices.
  -  Other popular NodeJS frameworks Sails, Hapi and NestJS are based on Express.
  - Robust routing, focus on high-quality performance, super high test coverage, HTTP Helpers(such as redirection and caching), content negation, executable for developing apps and APIs.
- **Async** - Monitors workflow via queues, allowing developers to add extra tasks, extra callbacks, and manage failures with callbacks. As a result, Async is more versatile and reliable for managing complicated dependecies.
  - Provides functions like ‘map’, ‘filter’, ‘reduce’, ‘parallel’, ‘series’, ‘waterfall’, and ‘each’.
  - Supports inline functions and text strings, Erro handling from the dependency queue, use of AsyncLocalStorage within AsyncJS creates async states within callbacks and promise chains, A collection of Async functions controls the flow the through the script.
  - Helps devs to avoid memory leaks and integrate AsyncResource with EventEmitter.
- **LoDash** - Built-in functions in Lodash make app development more efficient. With Lodash, developers can utilize a single line of code instead of writing a common function multiple times.
- **Axios** - Axios is an HTTP client API framework that allows developers to make promises while making a request. Requests communicate with the server, and Axios responds with a promise as to whether your request was fulfilled or refused.
  - Axios is gaining a lot of traction, thanks to Axios-fetch, Axios-debug-log, Axios-mock-adapter, Axios-API-versioning, Axios-VCR, and other powerful third-party additions.
- **Karma** - Karma’s primary goal is to provide a productive testing environment to developers.
  - Test code in real browsers or multiple browsers (mobile phones, tablets and desktops), controls the whole testing workflow from command or IDE, Executes tests after every save, locally during development or on a continuous integration server.
- **Mocha** - Mocha is a feature-rich JS test framework that runs on Node js and the browser, making asynchronous testing simple and enjoyable. Mocha tests are executed sequentially, allowing flexible and precise reporting while mapping uncaught exceptions to the appropriate test cases.
- **Grunt** - With a task runner, Grunt developers can reduce the number of tasks required to maintain a project, automate minifications, compile jobs, testing, code linting, and other duties. Grunt has a plethora of plugins that can automate even the most monotonous jobs.
- **PM2** - Includes process management for production applications and a load balancer to assist with performance adjustments. Allows developers to keep their applications online indefinitely. This step allows developers to reload applications without experiencing any downtime. 
- **Webpack** - if need to use multiple modeules in your project. This tool can divide, pack up and assign code in JS, CSSS & HTML according to your preferences. No need to work on locations and performances now.  
- **Bower.io** - Managing utilities can rapidly become overwhelming, Bower makes sure you stay in control by managing components. It categorizes every packages you are using, runs constant checks for any potential risks and helps in updating as well.
- **Passport** - Carrying on with a security package, Passport. The purpose ito authenticate requests which is done through a large set of plugins called strategies. The API is quiet user-friendly with only a request to authenticate to send to Passport which will then provide hooks to manage what occurs depending on authentication succeeding or failing. 
- **Nodemailer** - Sending an email within your apps is often a sensitive tasks, Nodemailer secures email management for your end users to have access to a safe space for emails. 

## NodeJS Core Modules
- In Node.js, Modules are the blocks of encapsulated code that communicates with an external application on the basis of their related functionality. 
- Modules can be a single file or a collection of multiples files/folders.
- Modules are of three types:
  - Core Modules
  - local Modules
  - Third-party Modules

### Core Modules
- Node.js has many built-in modules that are part of the platform and comes with Node.js installation. These modules can be loaded into the program by using the require function.
- The require() function will return a JavaScript type depending on what the particular module returns. 
- Some core Modules: 
 - **http** -	creates an HTTP server in Node.js.
 - **assert** -	set of assertion functions useful for testing.
 - **fs** -	used to handle file system.
 - **path** -	includes methods to deal with file paths.
 - **process** -	provides information and control about the current Node.js process.
 - **os** -	provides information about the operating system.
 - **querystring** -	utility used for parsing and formatting URL query strings.
 - **url** -	module provides utilities for URL resolution and parsing.

### Local Modules
- Unlike built-in and external modules, local modules are created locally in your Node.js application. 
- Since this file provides attributes to the outer world via exports, another file can use its exported functionality using the require() function.

### Third-party Modules
- Third-party modules are modules that are available online using the Node Package Manager(NPM). These modules can be installed in the project folder or globally. 
- Some of the popular third-party modules are mongoose, express, angular, and react.

## RestFul APIs
- It's an application programming interface that conforms to the contraints of RESt Archutectural style and allows for interaction with RESTful web services. 
- Rest stands for Represeentational state transfer and was created by computer scientiest Roy Fielding.

### What's an API
- An API is a set of definitions and protocols for building and integration application software. It's sometimes referred to as a contract between an information provider and an information user - establishing the content required from the consumer(the call) and the content required by the producer(the response).
- Think of an API as a mediator between the users or clients and the resources or web services they wan to get.
- It's also a way for an organization to share resources and information while maintianing  security, control and authentication determining who get access to what.

### REST
- It's a set of Architectural contraints, not a protocol or a standard. When a request is made, it transfers a representation of the state of the resource to the requester or endpoint.
- This information is delivered in one or several formats via HTTP:
  - JSON, HTML, XLT, Python, PHP, or plain text.
- JSON is the most generally popular file format to use because, despite its name, it's language-agnostic, as well as readable by both humans and machines.
- Headers and parameters are also important in the HTTP Methods of a RESTful API HTTP request, as they contain importan identifier information as to the request's metadata, authorization, uniform identifier (URI), caching, cookies and so much more.
- There are request and response headers, each with theit own HTTP Connection information and status codes.
- That data can be used to GET, PUT, POST and DELETE data type, which referes to reading, updating, creating and deleting of operations concerning resources.

### How RESTful APIs work
- It breaks down a transaction to create a series of small modules. Each module addresses an underlying part of the transaction.
- It uses commands to obtain resources. The state of a resource at any fiven timestamp is called a resource representation. A RESTful API uses existing HTTP methodologies defined by the RFC 2616 protocol, such as: 
  - GET to retrieve a resource.
  - PUT to change the state of or update a resource which can be an object, file or block
  - POST to create that resource
  - DELETE to remove it.
- All calls are stateless, nothing can be retained by the RESTful service between executios.
- Data formats the RESTful API supports include: 
  - application/json
  - application/xml
  - application/x-wbe+xml
  - application/x-www-form-urlencoded
  - multipart/form-data
- It is still considered easier to use than a prescribed protocol like SOAP (Simple Object Access Protocol), which has specific requirements like XML messaging, and built-in security and transaction compliance that make it slower and heavier. 

### Design and Architecutre constraints
- In order to be true RESTful API, a web service must adhere to the following six REST archtectural constraints:
  - **Use of a uniform interface (UI)** - Resources should be uniquely identifiable through a single URL, and only by using the underlying methods of the networkd protocol, such as DELETE, PUT, and GET with HTTP, should it be possible to manipulate a resource.
  - **Client-server based** - There should be a clear delineation between the client and server. UI and request-gathering concerns are the client's domain. Data access, workload management and security are the server's domain. This loose coupling of the client and server enables each to be developed and enhanced independent of the other.
  - **Stateless operations** - All client-server operations should be stateless, and any state management that is required should take place on the client, not the server.
  - **RESTful resource cachin** - All resources should allow caching unless explicitly indicated that caching is not possible.
  - **Layered system** - REST allows for an architecture composed of multiple layers of servers.
  Code on demand. Most of the time, a server will send back static representations of resources in the form of XML or JSON. However, when necessary, servers can send executable code to the client.

## ExpressJS

### Routers
- We can use Router to separate the routes from our main index.js file.
  ```javascript
    const express = require('express');
    const Router = express.Router();

    router.get('/', (req, res) => res.send('GET Route on things'));
    router.post('/', (req, res) => res.send('POST Route on things'));

    module.exports = router;
  ```
  ```javascript
    const express = require('express');
    const app = express();

    const childRoutes = require('./routes');

    app.use('/child', childRoutes);

    app.use(3000);
  ```

### Authentication
-  it is complicated to correctly and securely implement each step of the process and follow best practices as suggested by the Open Web Application Security Project (OWASP), which include:

  - Implementing proper password strength controls such as password length, complexity, and topology.
  - Implementing secure password recovery mechanisms.
  - Storing passwords securely, which includes hashing passwords with a salt.
  - Transmitting passwords only over TLS or other strong transport.
  - Correctly implementing authentication and error messages that mitigate user ID and password enumeration.
  - Preventing brute-force attacks.
- These authentication best practices address different attack vectors and mitigate vulnerabilities in the authentication process that could compromise your users' identity.
- Passport.js with Auth0 to manage user authentication and protect routes of a client that consumes an API.
- Auth0 is a global leader in Identity-as-a-Service (IDaaS). Its extensible platform seamlessly authenticates and secures more than 2.5 billion logins per month, making it loved by developers and trusted by global enterprises.
- Passport.js offers different authentication mechanisms, known as strategies, to cater to the unique authentication requirements each application has. Passport.js packages strategies as individual modules, and you can choose which strategies to employ, without creating unnecessary dependencies.

### CORS
- CORS stands for Cross-Origin Resource Sharing. Without prior consent, it prevents other websites or domains from accessing your web resources directly from the browser.

### Middleware
- They are nothing more than pieces of code we can make eecute before, in the middle, or after any request reaches our endpoint.
- They are just functions that receive three arguments:
  - req - the request object, more on this later.
  - res - the response object, more on this later.
  - next - a fuction that passes the req/res objects to the next middleware or route.
- Ex. of middleware:
  ```javascript
    const middlewareFun = (req,res,next) {
      console.log('Middleware');
    }
  ```
- The middleware functions can be registered using the .use method of the application object or routers.
  ```javascript
    // using the middleware on all requests.
    app.use(middlewareFun);

    // using the middleware on certain urls
    app.use('/endpoint', middlewareFunction);
  ```
- Built-in middleware functions are bundle with ExpressJS so we do not need to install any additional modules for using them. Express provides th efollowing built in middleware functions:
  - `express.static` - serves static assets.
  - `express.json` - parses JSON payloads.
  - `express.urlencoded` - parses URL-encoded payloads.
  - `express.raw` - parses payloads into a Buffer and makes them available under req.body.
  - `express.text` - parses payloads into a string.
- Third-party middleware libraries
  - `Helmet` - helps you secure your Express apps by setting various HTTP headers.
  - `Cookie-parser` - is a middleware that transfers cookies with client requests.
  - `Passport` - Access to Wide Range of Authentication Mechanisms. It is a simple unrobustive authentication middleware for Node.js.
  - `Morgan` - is an HTTP request logger middleware for Node.js typically used for Express apps.
  - `CORS` - Allow or Restrict Requested Resources on a Web Server. It is a node.js package that provides a Connect/Express middleware for enabling CORS with a variety of options.
- The next() function is a function in the Express router that, when invoked, executes the next middleware in the middleware stack. If the current middleware function does not end the request-response cycle, it must call next() to pass control to the next middleware function. Otherwise, the request will be left hanging.

## HapiJS & their middleware
- It was created by the mobile team at Walmart Labs — led by Eran Hammer to handle their traffic for events like Black Friday, one of the busiest days for online shopping in the U.S. calendar.
- hapi.js (short for Http-API, pronounced happy and also known as hapi) is an open-source framework for developing scalable web applications.
- One of the most basic use case of hapi is to build REST APIs. You can build application programming interface (API) servers, websites, and HTTP proxy applications with hapi.js.
- The original versions of hapi used the Express framework. Walmart found that there were limitations with Express that made the framework unsuitable for their particular requirements. Express was missing some key features, so Walmart eventually had hapi evolve to its own stand-alone framework.
- While Express relies heavily on middleware for much of its functionality, hapi has more built into the core. Body parsing, cookie handling, input/output validation, and HTTP-friendly error objects are already built-in to the hapi framework.

### Plugins
- Hapi provides a robust plugin system that allows you to add new features and fix bugs at a fast pace. The benefits of splitting code into plugins reaches beyond just your own code, but easily allows users to share code that is beneficial to everybody. 
- A benefit of the plugin model and having replaceable parts in hapi is that you’re not bound to a particular way of doing things. 
- “Middleware” is the name given to software modules that work on HTTP requests in succession before the final output is returned to the user in a response. Express lets you attach middleware to handle each request. Hapi, however, works with plugins that provide middleware functionality.

### Pre-route functions
- They run after authentication, so you’ve got the user credentials. 
- They can add to the request context the values they return go into the request.pre object. And you can add them to individual routes.
- The pre option allows defining methods for performing actions before the handler is called. These methods allow breaking the handler logic into smaller, reusable components that can be shared across routes, as well as provide a cleaner error handling of prerequisite operations (e.g. load required reference data from a database).


## Databases

### Relational DBs
- They work with structured data.
- Relationships in the system have contraints, which promotes a high level of data integrity.
- There are limiteless indexing capabilities, which results in faster query response times.
- They are excellent at keeping data transactions secure.
- They provide the ability to write complex SQL queries for data analysis and reporting.
- Their models can ensure and enforce business rules at the data layer adding a level of data integrity not found in a non-relational database.
- They are table and row oriented.
- They use SQL (structured query language) for shaping and manipulating data, which is very powerful.
- SQL database examples: MySQL, Oracle, SQLite, PostGRES and MS-SQL.
- SQL DBs are best fit for heavy duty transactional type application.

### Non-relational/NoSQL Databases
- They have the ability to store large amounts of data with little structure.
- They provide scalability and flexibility to meet changing business requirements.
- They provide scheme-free or scheme-on-read options.
- They have the ability to capture all types of data "Big Data" inclunding unstructured data.
- They are document oriented.
- They are best for Rapid Application Development, NoSQL is the best selection for flexible data storage with little to no structure limitations.
- They provide flexible data model with the ability to easily sotre and combine data of any structure without the need to modify a schema.
- NoSQL DBs examples: MongoDB, BigTable, Redis, RavenDB, Cassandra, HBase, Neo4J and CouchDB.

### SQL vs NoSQL
- The main differences between both are: 
  - SQL DBs are relational, NoSQL DBs are non-relational.
  - SQL DBs use structured query language and have a predefined schema. NoSQL DBs have dynamic schemas for unstructured data.
  - SQL DBs are vertically scalable, while NoSQL DBs are document, key-value, graph, or wide-column stores.
  - SQL DBs are better for multi-row transactions, while NoSQL is better for unstructured data like documents or JSON.


### Normalization
- Normalization is a database design technique that reduces data redundancy and eliminates undesirable characteristics like Insertion, Update and Deletion Anomalies. 
- Normalization rules divides larger tables into smaller tables and links them using relationships. The purpose of Normalisation in SQL is to eliminate redundant (repetitive) data and ensure data is stored logically.
- Database Normal Forms
  - 1NF (First Normal Form)
    - Each table cell should contain a single value.
    - Each record needs to be unique.
  - 2NF (Second Normal Form)
    - Be in 1NF
    - Single Column Primary Key that does not functionally dependant in any subset of candidate key relation.
  - 3NF (Third Normal Form)
    - Be in 2NF
    - Has no transitive functional dependencies
  - BCNF (Boyce-Codd Normal Form or 3.5NF)
    - Even when a DB is in 3rd Normal Form, still there would be anomalies if it has more than one Candidate Key
  - 4NF (Fourth Normal Form)
    - If no DB table instance contains two or more, independent and multivalued data describing the relevant entity, then it is in 4th NF.
  - 5NF (Fifth Normal Form)
    - A table is in 5th NF only if it is in 4NF and it cannot be decomposed into any number of smaller tables without loss of data.
  - 6NF (Sixth Normal Form)
    - 6th NF is not standardized, yent however, it is being discussed by DB expert for some time. Hopefully, we could havea a clear & standardized definition for 6th NF in the future.
- The Theory of Data Normalization in MySQL server is still being developed further.
- However, in most practical application, normalization achieves its best in 3rd Normal form.
- KEY in SQL, it's a value used to identify records in a table uniquely, An SQL KEY is a single column or combination of multiple columns used to uniquely identify rows or tuples in the table.It also helps to establish a relationship between multiple tables in the DBs.
- Primary Key, It's a single cloumn value used to identify a DBs record uniquely. It cannot be NULL, it must be unique, it values should rarely be changed, it must be given a value when a new record is inserted.
- Composite Key, Its a primary key composed of multiple columns used to identify a record uniquely.
- Foreign Key references the primary key of another table, it helps connect your tables, it can have a different name from it sprimary key, ensures rows in one table have corresponding rows in another, they do  not have to be unique and can be null even though PKs can not.
- Transitive functional dependency is when changing a non-key column, might- cause any of the other non-key columns to change.

### ORMs
- Object-relational-mapping is the idea of being able to write queries like `SELECT * FROM users WHERE email = 'email@email.com';`, as well as much more complicated ones, using the object-oriented paradigm of your preferred programming language.
- TLDR; We are trying to interact with our DB using our language of choice instead of SQL.
- When most people say ORM they are referring to a library that implements this technicque. Ex.
  ```javascript
    var orm = require('generic-orm-library');
    var DBClient = orm.connect(config);
    var user = DBClient('users').where({email: 'email@email.com'})
  ```
- Some PROs of using ORM
  - SQL is a ridiculously powerful language but most developers don't write in it often. You get to write in the language you are already using.
  - It abstracts away the DB system so that switching from MySQL to another DB type, could become easy.
  - Depending on the ORM you get a lof of advanced features out of the box, such as support for transactions, connection pooling, migration seeds, streams, etc.
  - Many of the queries you write will perform better with an ORM.
- Some CONs of using ORM
  - If you are better at SQL, you can probably get more performant queries by writing them yourself.
  - There is overhead involved in learning how to use any given ORM.
  - Initial configuration of an ORM can be a headache.
  - Since ORMs can serve as a crutch to avoid understanding DB and SQL it can make you a weaker dev in that portion of the stack.

### Indexes
- It's a way to optimize the performance of a DB by minimizing th enumber of disk accesses required when a query is processed.
- It is a data structure technique which is used to quickly locate and access the data
- Indexes are created using a few database columns.
  - The first column in the Search key that contains a copy of the primary key or candidate key of the table. these values are stored in sorted so that the corresponding data can be accessed quickly.
  - The second column is the Data Reference or Pointer which contains a set of pointers holding the address of the disk block where that particular key value can be found.
- The indexing has various attributes: 
  - **Access Types**: This refers to the type of access such as value based search, range access, etc.
  - **Access Time**: It refers to the time needed to find particular data element or set of elements.
  - **Insertion Time**: It refers to the time taken to find the appriate space and insert a new data.
  - **Deletion Time**: Time taken to find an item and delete it as well as update the index structure.
  - **Space Overhead**: It refers to the additional space required by the index.
- In general, there are two types of file organization mechanism which are followed by the indexing methods to store the data: 
  1. Sequential File Organization or Ordered Index File: In this, the indices are based on a sorted ordering of the values. These are generally fast and a more traditional type of storing mechanism. These Orderer or Sequential file organization might store the data in a dense or sparse formart:
    - Dense Index:
      - For every search key value in the data file, there is an index record.
      - This record contains the search key and also a reference to the first data record with the search key value.
    - Sparse Index: 
      - The index record appears only for a few intems in the data file. EAch item points to a block as shown.
      - To locate a record, we find the Index record with the largest search key value less than or equal to the search key value we are looking for.
      - We start at that record pointed to by the index record, and proceed along with the pointers in the file (that is, sequentially) until we fin the desired record.
  2. Hash file organization: Indices are based on the values being distributed uniformly across a range of buckets to which a value is assigned is determined by a function called a hash function.
    - Clustered Indexing
    - Non-Clustered or Secondary Indexing
    - Multilevel Indexing
- There are primarly three method of indexing: 
  1. Clustering Indexing 
    - When more than two records are stored in the same file these types of storing known as cluster indexing. 
    - By using the cluster indexing we can reduce the cost of searching reason being multiple records related to the same thing are stored at one place and it also gives the frequent joining of more than two tables (records). 
    - Clustering index is defined on an ordered data file. The data file is ordered on a non-key field. In some cases, the index is created on non-primary key columns which may not be unique for each record.
    - In such cases, in order to identify the records faster, we will group two or more columns together to get the unique values and create index out of them. 
    - This method is known as the clustering index. Basically, records with similar characteristics are grouped together and indexes are created for these groups. 
    - Primary Indexing: This is a type of Clustered Indexing wherein the data is sorted according to the search key and the primary key of the database table is used to create the index. It is a default format of indexing where it induces sequential file organization. As primary keys are unique and are stored in a sorted manner, the performance of the searching operation is quite efficient. 
  2. Non-clustered or Secondary Indexing 
    - A non clustered index just tells us where the data lies, i.e. it gives us a list of virtual pointers or references to the location where the data is actually stored. 
    - Data is not physically stored in the order of the index. Instead, data is present in leaf nodes.
    - The actual data here is not organized but we have an ordered reference to where the data points actually lie. 
    - We can have only dense ordering in the non-clustered index as sparse ordering is not possible because data is not physically organized accordingly. 
  3. Multilevel Indexing
    - With the growth of the size of the database, indices also grow. As the index is stored in the main memory, a single-level index might become too large a size to store with multiple disk accesses. 
    - The multilevel indexing segregates the main block into various smaller blocks so that the same can stored in a single block. The outer blocks are divided into inner blocks which in turn are pointed to the data blocks. This can be easily stored in the main memory with fewer overheads. 

### DB Migrations
- Database migrations, also known as schema migrations, database schema migrations, or simply migrations, are controlled sets of changes developed to modify the structure of the objects within a relational database. 
- Migrations help transition database schemas from their current state to a new desired state, whether that involves adding tables and columns, removing elements, splitting fields, or changing types and constraints.
- Migrations manage incremental, often reversible, changes to data structures in a programmatic way. The goals of database migration software are to make database changes repeatable, shareable, and testable without loss of data. 
- While preventing data loss is generally one of the goals of migration software, changes that drop or destructively modify structures that currently house data can result in deletion. To cope with this, migration is often a supervised process involving inspecting the resulting change scripts and making any modifications necessary to preserve important information.
- Advantages of migration tools
  - Migrations are helpful because they allow database schemas to evolve as requirements change. They help developers plan, validate, and safely apply schema changes to their environments. These compartmentalized changes are defined on a granular level and describe the transformations that must take place to move between various "versions" of the database.
  - being allowed (and sometimes required) to manually tweak the process by separating the generation of the list of operations from the execution of them. Each change can be audited, tested, and modified to ensure that the correct results are obtained while still relying on automation for the majority of the process.
- Disadvantages of migration tools
  - Migration systems are not without their faults but fortunately, most of these can be mitigated through processes and oversight.
  - Because migrations modify existing database structures, care must be taken to avoid data loss. This can be caused by incorrect assumptions made by the tooling or by transformations that require an understanding of the meaning behind the data structures. 

## Authentication

### Single sing-on (SSO)
- SSO is a property of identity and access management (IAM) that enables users to securely authenticate with multiple applications and websites by logging in only once with just one set of credentials.

### SAML
- SAML stands for Security Assertion Markup Language. It is an XML-based open-standard for transferring identity data between two parties: an identity provider (IdP) and a service provider (SP).
  - Identity Provider — Performs authentication and passes the user's identity and authorization level to the service provider.
  - Service Provider — Trusts the identity provider and authorizes the given user to access the requested resource.
- Benefits of SAML Authentication
  - Improved User Experience - Users only need to sign in one time to access multiple service providers. This allows for a faster authentication process and less expectation of the user to remember multiple login credentials for every application.
  - Increased Security - SAML provides a single point of authentication, which happens at a secure identity provider. Then, SAML transfers the identity information to the service providers. This form of authentication ensures that credentials are only sent to the IdP directly.
  - Loose Coupling of Directories - SAML doesn't require user information to be maintained and synchronized between directories.
  - Reduced Costs for Service Providers - With SAML, you don't have to maintain account information across multiple services. The identity provider bears this burden.

### How does SAML Works?
- SAML single sign-on authentication typically involves a service provider and an identity provider. The process flow usually involves the trust establishment and authentication flow stages.
- SAML works by exchanging user information, such as logins, authentication state, identifiers, and other relevant attributes between the identity and service provider. As a result, it simplifies and secures the authentication process as the user only needs to log in once with a single set of authentication credentials.
- SAML uses a claims-based authentication workflow. First, when a user tries to access a site, the service provider asks the identity provider to authenticate the user. Then, the service provider uses the SAML assertion issued by the identity provider to grant the user access. Let's illustrate the workflow with an example.
  - The user opens their browser and navigates to the service provider's web application, which uses an identity provider for authentication.
  - The web application responds with a SAML request.
  - The browser passes SAML request to the identity provider.
  - The identity provider parses the SAML request.
  - The identity provider authenticates the user by prompting for a username and password or some other authentication factor. NOTE: The identity provider will skip this step if the user is already authenticated.
  - The identity provider generates the SAML response and returns it to the user's browser.
  - The browser sends the generated SAML response to the service provider's web application which verifies it.
  - If the verification succeeds, the web application grants the user access.

### Tools
  - OAuth
  - Keycloak
  - passport.js

## Unit Testing
- Unit testing is important to verify the behavior of the smallest units of code in your application. It helps improve the quality of your code and reduces the amount of time and money you spend on bug fixing.
- Helps you find bugs early on in the development life cycle and increases your confidence in the code. 

### Tools
  - NodeJS - Jest, Mocha, Chai
  - Angular - Karma, Jasmine
  - Net Core - xUnit

### End-to-end 
- E2E testing tests an application entirely, verifying whether its flow from beginning to end behaves as expected or not. 
- Unlike unit testing, which focuses on a particular unit of the entire product—such as the database, network, or file system; E2E testing tests if all these individual units work well when they are integrated.
- E2E testing is significant because it exercises the application in the closest possible way to a real end-user experience.

### Stubs
- They are passive implementations of functionality to “fill the gaps” in your code so that testing can proceed. They are often just functions that return dummy values.
- A common practice in test-driven development (TDD) is to write the tests and stubs at the same time, so that the first test run fails everything, then you gradually replace the stubs with actual functionality and watch your “sea of testing red” slowly turn green.
- As a real-life analogy, think of the stubs left on a tree from broken branches; they are eventually “replaced” with full-grown and productive growth, but until that point, they mark the “functional” points on the tree.

### Spies 
- Spies are active implementations of functionality that record the goings-on within your code under test, and optionally try to assert certain truths about the code. 
- Spies are stubs that also record some information based on how they were called. One form of this might be an email service that records how many messages it was sent.

### Mock Objects
- Unit testing relies on mock objects being created to test sections of code that are not yet part of a complete application. Mock objects fill in for the missing parts of the program.
- For example, you might have a function that needs variables or objects that are not created yet. In unit testing, those will be accounted for in the form of mock objects created solely for the purpose of the unit testing done on that section of code.
