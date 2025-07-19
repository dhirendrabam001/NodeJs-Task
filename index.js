const http = require("http");
const fs = require("fs");
const path = require("path");
const { title } = require("process");
const fileName = "dataInfo.txt";
const filePath = path.join(__dirname, fileName);

const server = http.createServer((req, res) => {

    // Read All Data
    fs.readFile(filePath, "utf8", (error, data) => {
        let startingData = []

        if (!error && data) {
            try {
                startingData = JSON.parse(data);

            } catch (error) {
                console.log("Data Store Invalid");

            }
        }


        // Added new Data
        if(req.url === "/add") {
            const newData = {
                id: Date.now(),
                title: "Backend Developer",
                description: "Using nodejs and mongoosedb",
                status: "Pending"
            };

            // Push Data
            startingData.push(newData);
            fs.writeFile(filePath, JSON.stringify(startingData, null, 2), (error) => {
                if(error) {
                    res.writeHead(500, {"Content-type" : "text/plain"});
                    res.end("Data is not updated");
                } else {
                    res.writeHead(200, {"Content-type" : "text/plain"});
                    res.end("Data Added Sucussfully");
                };
            });

        }

        // Update Data
        else if(req.url === "/update") {
            const updateId = 1752942707874;
            const updateData = {
                updateTitle: "Updated Backend Developer",
                updateDes: "Updated Using NodeJs And MongooseDb",
                status: "Pending"
            }

            const updateAllData = startingData.map((item) => {
                if(item && item.id === updateId) {
                    item.title = updateData.updateTitle;
                    item.description = updateData.updateDes;
                    item.status = updateData.status;
                } 
                return item;
            });

            fs.writeFile(filePath, JSON.stringify(updateAllData, null, 2), () => {
                res.end("Data Updated Sucussfully")
            })

        }

        // Delete particular id:
        else if(req.url === "/delete") {
            const deleteId = 1752914476412;
            const deleteAll = startingData.filter((items) => {
                if(items && items.id !== deleteId);
                      });
                    const deleteMain = startingData.length !== deleteAll.length;
                    
                 
                fs.writeFile(filePath, JSON.stringify(deleteAll, null, 2), "utf8", (err) => {
                    if(err) {
                        res.writeHead(500, {"Content-type" : "text/plain"});
                        res.end("Data is not deleted");
                    } else {
                        res.writeHead(200, {"Content-type" : "text/plain"});
                        res.end("Data Delete Sucussfully");
                    };
                });
         
        }

        // Complete status
        else if(req.url ==="/complete") {
            const completeId = 1752942651645;

            const completeAll = startingData.map((items) => {
                if(items && items.id === completeId) {
                    items.status = "Complete"
                }
                return items;        
            });

            fs.writeFile(filePath, JSON.stringify(completeAll, null, 2), "utf8", (error) => {
                if(error) {
                    res.writeHead(500, {"Content-type" : "text/plain"});
                    res.end("Some issue for status completed")
                } else {
                    res.writeHead(200, {"Content-type" : "text/plain"});
                    res.end("Data Completed Fullfill")
                };
            });
        }





    });




});

const PORT = 1000;
server.listen(PORT, () => {
    console.log(`Server Is Running http://localhost:${PORT}`);

})