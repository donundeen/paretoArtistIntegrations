inlets = 1;
outlets = 3;

post("loaded js");

function parseParetoRaddec(jsonstr){
	//post("args", JSON.stringify(arguments));

	var jsonobj = JSON.parse(jsonstr);
	returnArray = [];
	returnArray.push(jsonobj.transmitterId);
	returnArray.push(jsonobj.transmitterIdType);
	returnArray.push(jsonobj.rssiSignature[0].rssi);
	outlet(0, returnArray);

}

function parseParetoDynamb(jsonstr){

	var jsonobj = JSON.parse(jsonstr);
	
	var keys= Object.keys(jsonobj);
	var skipkeys = ["deviceId","deviceIdType"];
	
	var allReturnArray = ["deviceId", jsonobj.deviceId, "deviceIdType", jsonobj.deviceIdType]
	
	for (var i = 0; i < keys.length; i++){
		var returnArray = [jsonobj.deviceId, jsonobj.deviceIdType];
		
		if(skipkeys.indexOf(keys[i]) < 0){
			
			returnArray.push(keys[i]);
			allReturnArray.push(keys[i]);
			if(Array.isArray(jsonobj[keys[i]])){
				returnArray.push(jsonobj[keys[i]].join(" "));
				allReturnArray.push(jsonobj[keys[i]].join(" "));
			}else{
				returnArray.push(jsonobj[keys[i]]);
				allReturnArray.push(jsonobj[keys[i]]);
			}
			post(returnArray);
			post();
			outlet(1, returnArray);				
		}
	}
	outlet(2, allReturnArray);
	
	
	
//	outlet(0, jsonobj.transmitterId);

}

function parseParetoSpatem(jsonstr){

	var jsonobj = JSON.parse(jsonstr);
//	outlet(0, jsonobj.transmitterId);

}

