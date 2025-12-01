# COMP-S381F-Project-Timetable-group15
1. Project info: Project name:Student self timetable(system) , Group info (Fok Wing Ki 13710809, Pun Kishan 13704514, Poon Chi Wai 13680954, Tong Chun Hei 13711554 , Kushdeep Singh 13687992)
_________________________________________________________________________________________
2. Project file intro:
- server.js: a brief summary of the functionalities it provided: ther server.js connects, ejs, crud webpage and restfulCrud.
   
  From the crud webpage, The login code: I used teacher note from the lab08/express-session/login/server.js, and just fine tune some parts and pasted it. 
  
  As for the Crud webpage, I used the code from projectsamples/mvcbooking/server.js, at least the important detail, as I was using require('body-parser') and Miss was using require('express-formidable'), which clashed with my coding, so I had to Google to learn how to use body-parser, and some YouTube videos. I had to go down to read which (app.***) is related to 'const'.

 After cross-referencing,  
 - app.post('/timetable', async (req, res), which is Creating, ' .insertOne' from insertDocument, which is linked to handle_Create.

-app.get('/timetable/:id/edit', async (req, res), is just for ejs connection.

-app.post('/timetable/:id/update', async (req, res), which is Updating,

await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: updatedEntry }); , the codes are from updateDocument and  handle_Edit, this one was tricky as there's too much going on, so I just went to MongoDB and tried the simple method, that being, _id being the name, $set: changing everything with updatedEntry. 

-app.get('/timetable/:id/delete', async (req, res), is just for ejs connection.

-app.post('/timetable/:id/delete', async (req, res), which is for Deleting.

Since Miss didn't have a delete on her sample, I just, 

await collection.deleteOne({ _id: new ObjectId(req.params.id) }); and delete the whole thing.


app.get('/timetable/:id/details', async (req, res), which is for Reading single entry and ejs connection,
  Since detail/Read single entry doesn't need that much function so I just connect it to ejs and call it aday.

The way of my coding, CRUD, is by tackling the hardest one for me, one by one so the coding order is a bit messy, Creating, Updating, Deleting and finally Reading. 

as for RestfulCrud, I just follow projectsamples/mvcbooking_outh_restful, 

-app.get('/api/timetable/:id', async (req, res) being Read for one ID

-app.post('/api/timetable', async (req, res) being Create(post)

-app.put('/api/timetable/:id', async (req, res) being Update (put)

-app.delete('/api/timetable/:id', async (req, res) being  Delete (delete)

The original output of JSON was difficult to read, so I JSON.stringify(***, null, 5), which I took from the miss code from mvcbooking.The 5 is just a spacebar to make the code readable to the client.

- package.json: lists of dependencies: 
        "cookie-session": "^2.1.1",
        "ejs": "*",y
        "express": "^5.1.0",
        "mongodb": "6.9.0",
        "nodemon": "*"


- views (folder, if you have): we used EJS, EJS being, create.ejs (page for creating timetable), delete.ejs (page for deleting timetable confirmation), detail.ejs (page for reading single timetable), edit.ejs(page for updating timetable), login.ejs(page for login), timetable.ejs(main page of timetable, showing multipul timetable)
________________________________________________________________________________________
3. The cloud-based server URL (your server host running on the cloud platform) for testing: http://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/
_________________________________________________________________________________________ 
4. Operation guides (like a user flow) for your server
- Use of Login/Logout pages: The requirement was 'Users' meaning minimum of 2 accounts, our group made two login accounts,(name: 'student1', password: 'student12') and (name: 'student23', password: 'student34') , 

- Use of your CRUD web pages:  which button or UI is used to implement create, read,
update, and delete?  

Create - Once you log in to the website site main page ' Timetable Entries', click the HyperLink 'Create New Entry' will send you to another page for creating. After inputting the details, press the 'Create' button, which will create a new entry.

Read- Once you log in to the website site main page, ' Timetable Entries' if there are any entries, you will see a 'Details' HyperLink. Click, and it will send you to another page to read the details of a single entry. if you want to see multiple entries, then just view them on the main page. If there isn't any entry, then proceed to create one first.

Update- Once you log in to the website site main page ' Timetable Entries', click the HyperLink 'Edit' it will send you to another page for updating.After changing the entry, click the button 'Save Changes' it will update the entry for the user. If there isn't any entry, then proceed to create one first.

Delete- Once you log in to the website site main page ' Timetable Entries', click the HyperLink 'Delete' it will send you to another page for confirmation regarding the deletion. Click the button 'Yes, delete this entry' for deletion. If there isn't any entry, then proceed to create one first.

_________________________________________________________________________________________


- Use of your RESTful CRUD services: the lists of APIs? HTTP request types? Path URI?
How to test them? CURL testing commands?

In order to test the RESTful CRUD, we need to open terminal first, WINDOW KEY+ R, cmd .

My code uses cookie,  username - student1, password- student12. 
 


For the list of API, HTTP request types, Path URI and CURL testing commands.
_____________________________________________________________________________________
Api - Login

HTTP request types - post

Path Url - /login

CURL testing commands for login -

curl -X POST https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/login -H "Content-Type: application/x-www-form-urlencoded" -d "name=student1&password=student12" -c cookies.txt
_____________________________________________________________________________________
Api - getting into the main page

HTTP request types - get

Path Url - /api/timetable

CURL testing commands for getting into the main page (Read) - 

 curl -X GET https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable -b cookies.txt 
______________________________________________________________________________________
Api - Reading a single entry

HTTP request types - get

Path Url - /api/timetable/{the unique ID of that object }

CURL testing commands for READ one single entry -

curl -X GET "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable/69274ecc54cab85c13fc3985" -b cookies.txt 

_________________________________________________________________________________________
Api - Creating

HTTP request types - post

Path Url - /api/timetable

CURL testing commands for Creating a single entry -

curl -X POST "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable" -H "Content-Type: application/json" -b cookies.txt -d "{\"subject\":\"Chinese\",\"day\":\"Friday\",\"month\":\"november\",\"date\":\"21\",\"startTime\":\"12:15\",\"endTime\":\"14:15\"}"  
_________________________________________________________________________________________


Api - Updating a single entry

HTTP request types - put

Path Url - /api/timetable/{the unique ID of that object }

CURL testing commands for updating a single entry -

curl -X PUT "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable/692de1f330c4391bf153cd1a" -H "Content-Type: application/json" -b cookies.txt -d "{\"subject\":\"Chinese\",\"day\":\"Wednesday\",\"month\":\"June\",\"date\":\"6\",\"startTime\":\"12:15\",\"endTime\":\"14:15\"}"  
_________________________________________________________________________________________

Api - Deleting a single entry

HTTP request types - delete

Path Url - /api/timetable/{the unique ID of that object }

CURL testing commands for deleting a single entry -

curl -X DELETE "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable/692de1f330c4391bf153cd1a" -b cookies.txt   
