Thank you for taking the time to give me this opportunity to demostrate my skills.

The application can be ran by simply:

    node index.js

The folder Kack contains the mock app JSON and READ.me. 

The logic is as follows:

1. Import the json from mock
2. Find duplicates of objects and fields then scenes and views.
    Duplicates are found by find the md5 hash without _id and comparing 
    it to a map. If duplicate found then delete. 
3. Write to a new file called clean_application.json

