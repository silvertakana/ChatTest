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
DB.ref("index").on('value', (snap)=>{
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
}
const getElemId = (id) =>{
    return document.getElementById(id);
}
Users.on('value', (snap)=>{
    let data = snap.val();
    getElemId("chatHistory").innerHTML = "";
    
    for(let i = 0; i < maxIndex; i++){
        message = data[(index+i+1) % maxIndex];
        if(!message) continue;
        getElemId("chatHistory").innerHTML += 
        `<div class="message">
            <div style='clear: both'>
                <h3 id='name'> ${message.name} </h3>
                <div id='time'>${DateConverter(new Date(message.date))}</div>
            </div>
            <p style='clear: both'>${message.message}</p>
            <hr/>
        </div>
        `;
    }
})