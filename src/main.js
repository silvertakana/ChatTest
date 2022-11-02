// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBj7GTZ464bbj4nlkB1ib72I66pLMC-UXc",
    authDomain: "democratic-pixel-art.firebaseapp.com",
    databaseURL: "https://democratic-pixel-art-default-rtdb.firebaseio.com",
    projectId: "democratic-pixel-art",
    storageBucket: "democratic-pixel-art.appspot.com",
    messagingSenderId: "274281497150",
    appId: "1:274281497150:web:cd2c4f6bd912fcf110876f",
    measurementId: "G-1RN6JLQLK1"
};

firebase.initializeApp(firebaseConfig);
var DB = firebase.database().ref("Users");
function writeData(e){
    var User = DB.push();
    User.set({
        name:getElemId("nameField").value,
        message: getElemId("msgField").value
    })
    getElemId("msgField").value = ""
}
const getElemId = (id) =>{
    return document.getElementById(id);
}
function updateMessage(){
    DB.on('value', (snap)=>{
        let data = snap.val();
        getElemId("chatHistory").innerHTML = "";
        
        for(let id in data){
            getElemId("chatHistory").innerHTML += 
            "<div class=\"message\">" +
                "<h3>"+data[id].name+"</h3>"+
                "<p>"+data[id].message+"</p>"+
            "</div>"
        }
    })
}
setInterval(updateMessage, 200)