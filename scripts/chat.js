// 1. add new chat documents
// 2. set up a real-time listener to get new chats
// 3. update username
// 4. update room

class Chatroom{
    constructor(room, username){
        this.room = room; // "this" is the object
        this.username = username;
        this.chats = db.collection('chats1'); // 向数据库增加collection名为'chats', reference为instance variable "chats"
        this.unsubscribe;
    };
    // 向数据库存object
    async addChat(message){
        // create a chat object
        const now = new Date();
        const chat = {
            message: message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        // save the chat document on database 
        // use "await" to wait for the chat object to be added on database collection
        const response = await this.chats.add(chat);
        //return response;
    };

    // real-time listener当每次change时触发, change如add或delete，
    // 都会从数据库获取和某object对应room的所有数据
    getChats(callback){
        this.unsubscribe = this.chats // 调用this.unsubscribe()，会unsubscribe任何change, 不再listen doc
        .where('room', '==', this.room) // where() method限定为 room property等于用户输入的参数this.room
        .orderBy('created_at')
        .onSnapshot(snapshot => { // snapshot()发生在每次document change
            snapshot.docChanges().forEach(change => {
                if (change.type === 'added'){
                    // update the UI
                    // 由于更新网页的UI是另一个class的活儿，所以给这个函数callback作为参数
                    callback(change.doc.data()); // change.doc.data()就是发生过的所有change的object
                }
            })
        })
    };
    // 更新username
    updateName(username){
        this.username = username;

        // 将username数据存在local storage中，防止刷新后又变成默认名
        localStorage.setItem('username', username);
    };
    // 更新room，当用户点击某button时
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if (this.unsubscribe){ // 确保有doc change存在
            this.unsubscribe(); // 不再get该room的数据
        }
        
    };

}

//const chatroom = new Chatroom('gaming', 'Long');



// chatroom.addChat('hello')
// .then(() => console.log('chat added'));

//chatroom.getChats((data) => console.log(data));


//chatroom.updateRoom('general');




// 改变room后listen新的room数据
// setTimeout(() => {
//     chatroom.updateRoom('music');
//     chatroom.updateName('New Name');
//     chatroom.getChats((data) => console.log(data)); // 重新listen新room的数据
//     chatroom.addChat('hello with new name');
// }, 3000);