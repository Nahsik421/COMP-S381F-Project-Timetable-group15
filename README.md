# COMP-S381F-Project-Timetable-group15
student1  student12 

WINDOW KEY+ R, cmd

curl -X POST https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/login -H "Content-Type: application/x-www-form-urlencoded" -d "name=student1&password=student12" -c cookies.txt  login

curl -X GET https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable -b cookies.txt  Read

curl -X POST "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable" -H "Content-Type: application/json" -b cookies.txt -d "{\"subject\":\"Chinese\",\"day\":\"Friday\",\"month\":\"november\",\"date\":\"21\",\"startTime\":\"12:15\",\"endTime\":\"14:15\"}"   Create

curl -X PUT "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable/6924974e600490a479d00858" -H "Content-Type: application/json" -b cookies.txt -d "{\"subject\":\"Chinese\",\"day\":\"Wednesday\",\"month\":\"June\",\"date\":\"6\",\"startTime\":\"12:15\",\"endTime\":\"14:15\"}" update

curl -X DELETE "https://sample-deploy--13704514-app-hva9f0cwhac0hkdd.germanywestcentral-01.azurewebsites.net/api/timetable/692497ed600490a479d0085a" -b cookies.txt  delete 
