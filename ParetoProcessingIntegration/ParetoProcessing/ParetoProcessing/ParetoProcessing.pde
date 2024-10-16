import oscP5.*;
import netP5.*;
OscP5 oscP5;


void setup(){
    oscP5 = new OscP5(this,8069);

}

void draw(){
    background(0);  
}

void oscEvent(OscMessage theOscMessage) {
  /* check if theOscMessage has the address pattern we are looking for. */
  
  //println("### received an osc message. with address pattern "+theOscMessage.addrPattern() +" and typetag "+theOscMessage.typetag());
  
  
  if(theOscMessage.checkAddrPattern("/pareto/raddec")==true) {
    /* parse theOscMessage and extract the values from the osc message arguments. */
    String jsonData = theOscMessage.get(0).stringValue();
//    println("RADDEC json: "+jsonData);
    JSONObject json = parseJSONObject(jsonData);
    if (json == null) {
      println("JSONObject could not be parsed");
    } else {
      processRaddec(json);
    }      
    return;
  } 
  if(theOscMessage.checkAddrPattern("/pareto/dynamb")==true) {
    /* parse theOscMessage and extract the values from the osc message arguments. */
    String jsonData = theOscMessage.get(0).stringValue();
    println("DYNAMB json: "+jsonData);
    JSONObject json = parseJSONObject(jsonData);
    if (json == null) {
      println("JSONObject could not be parsed");
    } else {
      processDynamb(json);
    }      
    return;
  } 
  if(theOscMessage.checkAddrPattern("/pareto/spatem")==true) {
    /* parse theOscMessage and extract the values from the osc message arguments. */
    String jsonData = theOscMessage.get(0).stringValue();
    println("SPATEM json: "+jsonData);
    JSONObject json = parseJSONObject(jsonData);
    if (json == null) {
      println("JSONObject could not be parsed");
    } else {
      processSpatem(json);
    }      
    return;
  } 
  
}

void processRaddec(JSONObject raddec){
  String transmitterId = raddec.getString("transmitterId");
  int rssi = raddec.getJSONArray("rssiSignature").getJSONObject(0).getInt("rssi");
//  println("### the transmitterId  is " + transmitterId + " and the rssi is " + rssi);
  // do stuff with transmittedID and rssi here.
  
}

void processDynamb(JSONObject dynamb){
  String deviceId = dynamb.getString("deviceId");
  int deviceIdType = dynamb.getInt("deviceIdType");
 // int rssi = raddec.getJSONArray("rssiSignature").getJSONObject(0).getInt("rssi");
  println("### the deviceId  is " + deviceId + " and the deviceIdType is " + deviceIdType);
  
  // introspecting the object here, there's lots of value it could have.
  String[] properties = (String[]) dynamb.keys().toArray(new String[dynamb.size()]);
  for(int i = 0; i < properties.length ; i++){
     String prop = properties[i];
     try{
       String value = dynamb.getString(prop);
       print(prop + " : " + value + ", ");
     }catch(Exception e){ }
     try{
       int value = dynamb.getInt(prop);
       print(prop + " : " + value + ", ");
     }catch(Exception e){ }
     try{
       JSONArray value = dynamb.getJSONArray(prop);
       print(prop + " : " + value + ", ");
     }catch(Exception e){ }
     try{
       Float value = dynamb.getFloat(prop);
       print(prop + " : " + value + ", ");
     }catch(Exception e){ }
     try{
       Boolean value = dynamb.getBoolean(prop);
       print(prop + " : " + value + ", ");
     }catch(Exception e){ }
     
  }
  println();
  // do stuff with the values here
  
  
}

void processSpatem(JSONObject spatem){
  // TBD  
}
