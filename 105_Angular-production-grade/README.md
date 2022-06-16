# Angular Production-Grade Summary 

 
 

- For this course I utilize new technologies like NX, Nest and new patterns to develop in Angular 2. 

- Did had some trouble with some packages while setting up the repo, but after some tweaks like installing nx globally, helped and the problems disappeared.  

 
 

## Managing Complexity 

 
 

- Described as the hardest thing about developing software. consisting of managing of state, flow control and code volume. 

 
 

### General rules for managing complexity 

 
 

- Code should be fine grained, do one thing and be self documenting. 

- Favor pure, immutable functions. 

- Abstractions should reduce complexity and coupling and at the same time increase cohesion and portability. 

- Refactor through promotion. 

- Composition over inheritance. 

- Do not confuse convention for repetition. 

- Well-structured code will naturally have a larger surface area. 

- Be mindful over the limitations of your entire team and optimize around that. 

- Favor best practices over introducing idioms however they may be. 

- Consistency is better than righteousness. 

- Follow the style guide until it doesn't make sense for your situation. 

- Eliminate hidden states, nested logic in functions. 

- Do not break the single responsibility principle. 

- Extracting to a method is one of the most effective refactoring strategies available. 

- if you need to clarify your code with comments then it is probably too complex. 

- It is impossible to write good tests for bad code. 

 
 

### Managing complex in Angular 

 
 

- Your routing table will generally describe your features. 

- A feature will generally get a route. 

- A route will navigate to a container component. 

- Everything inside that container component should be a presentation component. 

- A component should only ever do two things:  

    - Consume just enough data to satisfy its templates. 

    - Capture user events and delegate them upwards. 

- Components should be as thin as possible. 

- Container components should satisfy inputs using the async pipe. 

- Components should be oblivious to business logic, to server communication, to business logic, to application state. 

- Facades are an effective delegation layer between components and the rest of the app. 

- Facades are for delegation only. 

- Server communication and state management should be decoupled. 

- Data models should be decoupled especially inside of a mono-repo with client and API Projects. 

- Do not unnecessarily optimize until you have a good reason to do so. 

- For instance, a component should not become a lib until it is going to be used in more than one app. 

 
 

## Angular CLI and NX Workspaces 

 
 

- NX and mono-repo Something new for me, I see it as a way to have multiple projects in one place manageable by a wrapper called NX, you can also create another project within the same place. 

- Discover that we can use libraries like concurrently or run-s to run multiple npm scripts of the same repo. 

- Discover at detail how to structure your npm scripts. 

- It also wraps the Angular cli and adds more functionality to it. 

 
 

- Having multiple projects in the same place allows you to be creative when sharing code, extracting server communication or business logic to a independent folder that we can reuse with any other new project to be created, such is the use for "Libs". 

 
 

## Mocking APIs and Nest 

 
 

- In turns out that in my absents in the world of JS and TS, a new library/framework came out, based on express, uses typescript and similar to the structure of Angular. 

- Nest provides an out-of-the-box application architecture which allows developers and teams to create highly testable, scalable, loosely coupled and easily maintainable applications. 

- Architecture is heavily inspired by Angular. 

- You can use dependency injection like Angular. 

- You can set up easily Swagger. 

 
 

## The Facade Pattern (Reactive Angular) 

 
 

- Facades are a pure delegation layer and should not handle business logic. 

- Facades provide a clean separation between components and the rest of your application. 

- Just as inputs and outputs provide an API for your components, Facades provide an API for your application. 

- Facades are an excellent way to incrementally integrate NGRx. 

- Facades are great for mocking out a business logic layer. 

- For Angular you can create Subjects for the items you are going to handle and register the mutations too. 

- NGRX, similar to redux, just different syntax and names. 

 
 

## Testing, Coverage and Cypress 

 
 

- Doesn't go into details about testing, luckily took another course that had info about. 

- It does explain how to generate coverage reports in more detail. 

- It recommends taking Cypress over protractor. 

- Mentioned something interesting, divide your test by, Specs, Page Objects and commands. 

- Page Objects are files that contain all direct interaction with the elements in the template or storing data that helps the specs. 

- Recommends to use an attribute to detect easily the element that cy.get() is going to detect. 

- Commands help add the mocking APIs or other elements. 

- This structure helps to keep a clean and clear specs, and helps focus in the assertions. 

 
 

## Build and deploy 

 
 

- Always remember to build as prod! 

- You can use tools such as wepack-bundle-analizer, which helps you identify unused libraries and weights of your final build. 

- Recommends using services such as AWS S3 to host your build, others are Heroku digital ocean and vercel. 

- Talks when using docker you can partitioning your projects per image. 

 