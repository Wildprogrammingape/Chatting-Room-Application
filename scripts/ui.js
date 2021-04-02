// render chat template to DOM
// clear the list of chats when room changes

// 将通过chatroom.getChat()获取的所有数据库中的数据，渲染到ul的DOM中
class ChatUI{
    constructor(list){
        this.list = list;
    }
    // render method for create HTML template, and render it to DOM
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );
        const html = `
            <li class="list-group-item">
                <span class="username">${data.username}: </span>
                <span class="message">${data.message}</span>
                <div class="time">${when}</div>
            </li>
        `;
        this.list.innerHTML += html;
    };

    clear(){
        this.list.innerHTML = '';
    }

}