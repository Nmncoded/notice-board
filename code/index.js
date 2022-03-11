/*
<li class="li">
                <input type="text" name="category" class="category">
                <input type="text" name="title">
            </li>  
*/
function main(){
let form = document.querySelector(`.f-form`);
let rootElm = document.querySelector(`.ul`);

class AllLists {
    constructor(lists = []){
        this.lists = JSON.parse(localStorage.getItem("lists")) || lists;
    }
    addList(title,category){
        let list =  new List(title,category);
        this.lists.push(list);
        localStorage.setItem("lists", JSON.stringify(this.lists));
        this.createUI();
    }
    createUI(){
        rootElm.innerHTML = "";
        this.lists.forEach((list) => {
            let li = document.createElement(`li`);
            li.classList.add(`li`);
            let categoryName = document.createElement(`input`);
            categoryName.type = "text";
            categoryName.name = "category";
            categoryName.value = list.category;
            categoryName.classList.add(`category`);
            categoryName.addEventListener(`blur`, (event) => {
                list.category = event.target.value;
                localStorage.setItem("lists", JSON.stringify(this.lists));
                this.createUI();
            })
            let titleName = document.createElement(`input`);
            titleName.type = "text";
            titleName.name = "title";
            titleName.value = list.title;
            titleName.addEventListener(`blur`, (event) => {
                list.title = event.target.value;
                localStorage.setItem("lists", JSON.stringify(this.lists));
                this.createUI();
            })

            li.append(categoryName,titleName);
            rootElm.append(li);
        
        })
    }
}


class List{
    constructor(title,category){
        this.title = title;
        this.category = category;
    }
}

let noticeBoard = new AllLists();
noticeBoard.createUI();

form.addEventListener(`submit`, (event) => {
    event.preventDefault();
    let input = document.querySelector(`input[name="text"]`);
    let select = document.querySelector(`#drop-down`);
    noticeBoard.addList(input.value, select.value);
    input.value = "";
})
}
main();