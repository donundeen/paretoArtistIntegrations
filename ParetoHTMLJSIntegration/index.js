console.log("started");

const socket = io("http://10.0.0.200:3001");

let raddecList = {};
let dynambList = {};
let spatemList = {};

socket.on("connect", () => {
    console.log("connected");
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on("dynamb", (...args)=>{
    let dynamb = args[0];
    console.log("dynamb ", dynamb);
    let deviceId = dynamb.deviceId;
    let deviceIdType = dynamb.deviceIdType;
    let id = deviceId+"/"+deviceIdType;
    // a BLE device might send out multiple messages, with different properties.
    // so, we're goign to ADD those properties to the currently saved dynamb object.
    if(!dynambList[id]){
        dynambList[id] = dynamb;
    }else{
        Object.assign(dynambList[id], dynamb);
    }
//    dynambList[id] = dynamb;
    showDynambList();

});
socket.on("raddec", (...args)=>{
    let raddec = args[0];
   // console.log("raddec ", raddec);
    let transmitterId = raddec.transmitterId;
    let transmitterIdType = raddec.transmitterIdType;
    let id = transmitterId+"/"+transmitterIdType;
    raddecList[id] = raddec;
    showRaddecList();
});
socket.on("spatem", (...args)=>{
    console.log("spatem ", args);
});

function showRaddecList(){

    let keys = Object.keys(raddecList);
    keys.sort();
    let contentDiv = document.createElement("p");
    contentDiv.setAttribute("id","raddecContent");
    
    for(let i = 0; i<keys.length; i++){
        let raddec = raddecList[keys[i]];
        let rssi = raddec.rssiSignature[0].rssi;
        let br = document.createElement("br");
        let display = document.createElement("span");
        display.textContent = keys[i] + ":" + rssi;       
        contentDiv.append(display);
        contentDiv.append(br);
    }
    document.getElementById("raddecList").replaceChildren(contentDiv);
}

function showDynambList(){
    let keys = Object.keys(dynambList);
    keys.sort();
    let contentDiv = document.createElement("p");
    contentDiv.setAttribute("id","dynambContent");
    
    for(let i = 0; i<keys.length; i++){
        let dynamb = dynambList[keys[i]];
        let br = document.createElement("br");
        let display = document.createElement("pre");
        display.textContent = keys[i] + "\n" + JSON.stringify(dynamb , null , "  ");       
        contentDiv.append(display);
        contentDiv.append("\n");
    }
    document.getElementById("dynambList").replaceChildren(contentDiv);

}

function showSpatemList(){

}
