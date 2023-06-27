const axios = require("axios");
const fs = require("fs");
username = "t7kSmfYtfWTDhdVb",
    password = "6PLNpX9zZsW4nxSX1m7DlgvcfhGIl7Ew",
    auth = "Basic " + new Buffer.from(username + ":" + password).toString("base64");

async function map_fivetran_connector(){
    const requestOptions = {
        method: "GET",
        headers: {
            "Authorization": auth,
            "content-type": "application/json",
        },
    };
    let url = 'https://api.fivetran.com/v1/metadata/connector-types?limit=1000';

    try{
        let request = await axios.get(url, requestOptions).then(function(response){
            return response;
        })
        let response = await request;
        let completeResponse = response.data.data.items;
        let responseList = []
        for (let i = 0; i < completeResponse.length; i++) {
            let responseObj = {'name': completeResponse[i].name, 'type': completeResponse[i].type.toString(), 'description': completeResponse[i].description}
            responseList.push(responseObj);

        }
        console.log(responseList)

        const writeStream = fs.createWriteStream('connectorTypeList.csv', 'utf-8');
        writeStream.write("Name" + "," + "Type" + "," + "Description" + '\n');
        for (let i = 0; i < responseList.length; i++){
            try{
                writeStream.write(responseList[i].name + ","  + responseList[i].type + "," + responseList[i].description);
                writeStream.write('\n');
            }catch(error) {
                console.log(error)
            }

        }
    }catch(e){
        console.log(e)
    }




}


map_fivetran_connector().then(() => { console.log("success")})