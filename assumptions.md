1. **User Authentication**: It is assumed that user authentication is not required for this application. All users can view and delete posts without logging in.

2. **Data Consistency**: The data fetched from the provided APIs (https://jsonplaceholder.typicode.com/users and https://jsonplaceholder.typicode.com/posts) is assumed to be consistent and reliable for seeding the database.

3. **Internet Connectivity**: Given that users may have unstable internet connections, the application will implement basic error handling to inform users of any issues when fetching or deleting posts.

4. **Post Deletion Confirmation**: It is assumed that a simple confirmation modal will suffice for confirming post deletions, without the need for additional security measures.

5. **Error Handling**: Basic error handling will be implemented for API calls, but it is assumed that more complex error handling and logging will not be required for this project.

6. **Filters and Pagination**: Basic filters and pagination are included to facilitate post visualization. It is assumed that the data volume is not huge, so client-side filtering and pagination are sufficient for this use case.

7. **Seed Script Table Cleanup**: Since this is a test database and to avoid duplicates, the `seed.mts` script cleans (deletes) all records from the relevant tables before inserting new data.

8. **API and DB Security**: It is assumed that advanced security measures (rate limiting, input validation, XSS/CSRF protection) are not required for this technical test, as the app is intended for demonstration and local development purposes only.

