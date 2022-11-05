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
var DB = firebase.database();
var Users = DB.ref("Users");
var maxIndex = 30
var index;
var messages;

let texted = false;
DB.ref("index").once('value', (snap)=>{
    var data = snap.val();
    index = data;
})
function writeData(e){
    DB.ref(`Users/${index}`).set({
        name:getElemId("nameField").value,
        date: new Date().toString(),
        message: getElemId("msgField").value
    });

    DB.ref("index").set((index+1) % maxIndex); // increase index by 1 each time write
    getElemId("msgField").value = "" // clear message field
    texted = true;
}
const getElemId = (id) =>{
    return document.getElementById(id);
}
let loadUp = true;
Users.on('value', (snap)=>{
    messages = snap.val();
    getElemId("chatHistory").innerHTML = "";
    
    DB.ref("index").once('value', (snap)=>{
        var data = snap.val();
        index = data;

        Notification.requestPermission().then(prem=>{
            console.log(loadUp)
            if(prem == "granted" && !loadUp && !texted){
                let msg = messages[index-1]
                let name = msg.name;
                if(!name) name = "Anonymous";
                var notif = new Notification("New Message from "+ name, {
                    body: `${msg.message}`,
                });
            }
            loadUp = false;
            texted = false;
        });
    })

    for(let i = 0; i <maxIndex; i++){
        let ind = (index+i+1) % maxIndex;
        let message = messages[ind];
        if(!message) continue;
        let name = message.name;
        if(!name) name = "Anonymous";
        getElemId("chatHistory").innerHTML += 
        `<div class="message">
            <div style='clear: both'>
                <h3 id='name'> ${name} </h3>
                <div id='time'>${DateConverter(new Date(message.date))}</div>
            </div>
            <div class="txt_message"><p style='clear: both' id="txt_message_${i}"></p></div>
        </div>
        <hr/>
        `;
        getElemId(`txt_message_${i}`).innerHTML = marked.parse(message.message);
    }
    
})