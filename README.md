Develop a JavaScript web application that fetches a relevantly-sized list of posts from the mock GraphQL API available at https://fakerql.stephix.uk/ and displays a histogram representing the number of posts created in each month of 2019. 

I have firstly looked into FakerQL in the documentation and used Apollo for the communication. I have tested to see if I get the data, and I got the data correctly. Then I went through every post, converted the date from "createdAt" and got the month. 
I used another array "postsMonthly" to get the sum of posts from a month, incrementing it for every post found from a certain month. Then I looked through the VX repository and have added the basic example that they showed. 
I didn't know how to add text at first but after a few minutes of documentation I have found that a element will do the trick. 
I used two text elements, one to display the month under the Bar, and one to display the number of posts at the top of every bar.
