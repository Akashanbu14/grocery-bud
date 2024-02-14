// SELECT-ITEMS
const alert=document.querySelector('.alert')
const form=document.querySelector('.grocery-form')
const grocery=document.getElementById('grocery')
const submitbtn=document.querySelector('.submit-btn')
const container=document.querySelector('.grocery-container')
const list=document.querySelector('.grocery-list')
const clearBtn=document.querySelector('.clear-btn')


//  *********************EDIT OPTION **************
let editElement;
let editFlag=false;
let editId="";

// ********************** EVENTLISTNER  ****************
// submitform
form.addEventListener("submit",addItem);
// clearform
clearBtn.addEventListener("click",clearItems);

const deletebtn=document.querySelector('.delete-btn')

// *************FUNCTION************
function addItem(e){
    e.preventDefault();
    let value=grocery.value
    let id= new Date().getTime().toString();
   if(value&& !editFlag){
       const element=document.createElement("article")
       ///add class
       element.classList.add("grocery-item")
       ///add id 
       const attr=document.createAttribute("data-id")
       attr.value=id;
       element.setAttributeNode(attr)
       element.innerHTML=`<p class="title">${value}</p>
       <div class="btn-container">
           <button type="button" style="border: none;"class="edit-btn">
              <i class="material-icons" style="font-size:16px;color:green;">edit</i>
              </button>
           <button type="button" style="border: none;"class="delete-btn">
              <i class="material-icons" style="font-size:16px;color:red;">delete</i>  
              </button>
       </div>`;
       const deleteBtn=element.querySelector('.delete-btn');
       const editBtn=element.querySelector('.edit-btn');
       deleteBtn.addEventListener("click",deleteItem);
       editBtn.addEventListener("click",editItem);
       ///append child
       list.appendChild(element)
          /////display alert
       displayAlert("added item sucessfully","sucess")
       //// showcontainer
       container.classList.add("show-container");
       ///add to localstorage
       addToLocalStorage(id,value)
       ///set back to default
       setBackToDefault()
   }
   else if(value && editFlag){
       editElement.innerHTML=value;
       displayAlert("value is changed","sucess")
       editLocalStorage(editId,value);
       setBackToDefault();

   }
   else{
    displayAlert("please enter value","danger")  
   }
}

//display alert 
function displayAlert(text,action){
    alert.textContent=text;
    alert.classList.add(`alert-${action}`);

setTimeout(function(){
    alert.textContent="";
    alert.classList.remove(`alert-${action}`);
},1000)
}
//clearitems
function clearItems(){
    const items=document.querySelectorAll(".grocery-item");
    if(items.length>0){
        items.forEach(function(item){
            list.removeChild(item);
            container.classList.remove("show-container");
            displayAlert("empty list","danger")
            setBackToDefault(); 
            localStorage.removeItem("list");
        });
    }
    

}
// delete item
function deleteItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    list.removeChild(element);
     if(list.children.length===0){
        container.classList.remove("show-container");
     }
     displayAlert("item removed","danger")
     setBackToDefault();
//remove from localstorage

}
//edit item
function editItem(e){
    const element=e.currentTarget.parentElement.parentElement;
    //set element
    editElement=e.currentTarget.parentElement.previousElementSibling;
    //set form value
    grocery.value=editElement.innerHTML;
    editFlag=true;
    editId=element.dataset.id;
    submitbtn.textContent="edit";
}

// setbacktodefault
function setBackToDefault(){
   grocery.value=""
    editFlag=false;
    editId='';
    submitbtn.textContent="submit";
}
// ******************LOCAL STORAGE*********************
function addToLocalStorage(id,value){
    let grocery={id,value}
    let items=getLocalStorage()
    items.push(grocery)
    console.log(items)
    localStorage.setItem("list",JSON.stringify(items));
}
function removeFromeLocalStorage(id) {
    let items=getLocalStorage()
    items=items.filter(function(item){
        if(items.id!==id){
            return item
        }
    });
}
function editLocalStorage(id,value){
    let items=getLocalStorage()
    items=items.map(function(item){
        if(item.id=id){
          item.value=value;
        }
        return item;
    });
localStorage.setItem("list",JSON.stringify(items));
}
function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}
// localStorage.setItem("rose",JSON.stringify(["ITEM1","ITEM2"]));
// let skyblue=JSON.parse(localStorage.getItem("rose"))
// console.group(skyblue)
// localStorage.removeItem("rose")

 