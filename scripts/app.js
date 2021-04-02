// dom query
const chatList = document.querySelector('.chat-list'); // ul

const newChatForm = document.querySelector('.new-chat'); // user input form

const newNameForm = document.querySelector('.new-name');
const updateMessage = document.querySelector('.update-message');


const rooms = document.querySelector('.chat-rooms');


// check local storage for exsiting name
const username = (localStorage.username) ? localStorage.username : 'guest';


// class instance (Object)
const chatroom = new Chatroom('general', username);
const chatUI = new ChatUI(chatList); // 这里chatUI对象即为ul element


// 添加用户输入的message到数据库
newChatForm.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChatForm.message.value.trim();

    chatroom.addChat(message)
        .then(() => newChatForm.reset());
})


// 更新用户名
newNameForm.addEventListener('submit', e => {
    e.preventDefault();

    // update new name
    const newName = newNameForm.name.value.trim();
    chatroom.updateName(newName);

    newNameForm.reset();

    // show message
    updateMessage.innerText = `
        Your name was updated to ${newName}
    `;

    setTimeout(() => updateMessage.innerText = '' ,3000);
})



// update the chat room 更换聊天室
rooms.addEventListener('click', e => {
    // console.log(e.target);
    if (e.target.tagName === 'BUTTON'){
        // 首先clear当前ui
        chatUI.clear();
        // 更换room name
        chatroom.updateRoom(e.target.getAttribute('id'));
        // 获得数据库中该room的所有数据
        chatroom.getChats(data => chatUI.render(data));
    }
});


// get chats Object and render
// 从数据库获取数据，并渲染到DOM中
chatroom.getChats((data) => { // 这里的data就是chat.js中数据库某room的数据,是object
    chatUI.render(data); //将该object作为参数，调用render method,将html template渲染到DOM的ul中
})