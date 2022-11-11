// select All Element in Html
let titel = document.getElementById("titel"); 
let price = document.getElementById("price"); 
let taxes = document.getElementById("taxes"); 
let ads = document.getElementById("ads"); 
let discount = document.getElementById("discount"); 
let total = document.getElementById("total"); 
let count = document.getElementById("count"); 
let category = document.getElementById("category"); 
let submit = document.getElementById("submit"); 
let mood = 'create';
let temp;

const getTotal = () =>{
    if(price.value !=='' && taxes.value !=='' && ads.value !==''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        
        total.innerHTML = result;
        total.style.background="#040";

    }else{
        total.innerHTML = '';
        total.style.background="#ff2020";
    }
}

//creat data
let dataPro;
if(localStorage.getItem("Product") !== null ){
    dataPro = JSON.parse(localStorage.getItem("Product"));
}else{
    dataPro = [];
}

submit.onclick = () =>{
   if(titel.value !== '' && price.value !== '' && category.value !== ''){
    let newPro = {
        titel:titel.value,
        price:price.value,
        taxes:taxes.value || 0,
        ads:ads.value || 0,
        discount:discount.value || 0,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
     
    if(mood === 'create'){
         if(newPro.count >1){
             for(let i =0; i<newPro.count;i++){
            dataPro.push(newPro);
             }
        }else{
            dataPro.push(newPro);
        }
    }else{
        dataPro[temp] = newPro; 
        count.style.display="block";
        submit.innerHTML = 'Create';
        mood = 'create';
    }
   
    // Save Data In LocalStorige 
    localStorage.setItem("Product",JSON.stringify(dataPro));
    //show data in table
    showData();
    //remov data from the field 
    clearInput();
    getTotal();
   }
}
  
//clear All input Feild
let clearInput = () =>{
    titel.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    count.value = '';
    category.value = '';
    total.innerHTML = '';
}

// Show Data In Table 
let showData = () => {
    let table='';
    for(let i = 0 ; i < dataPro.length;i++){
         table += `
          <tr>
            <td>${i+1}</td>
            <td>${dataPro[i].titel}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button id="update" onclick="updateData(${i})">Update</button></td>
            <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
          </tr>
         ` 
    }
    document.getElementById("tbody").innerHTML = table;

    let dedeleteAll = document.getElementById('deleteall');

    if(dataPro.length > 0){
          dedeleteAll.innerHTML = `
          <button onclick = "deleteAll()">DeleatAll (${dataPro.length})</button>
          `;
    }else{
        dedeleteAll.innerHTML ='';
    }
}

showData();

//Delete Item 
let deleteItem = (e) =>{
     dataPro.splice(e,1);
     localStorage.Product = JSON.stringify(dataPro);
     showData();
};
// delete All Data
let deleteAll = () =>{
   localStorage.clear();
   dataPro.splice(0)
   showData();
};

// update data 
let updateData = (e) => {
    titel.value = dataPro[e].titel;
    price.value = dataPro[e].price;
    taxes.value = dataPro[e].taxes;
    ads.value = dataPro[e].ads;
    discount.value = dataPro[e].discount;
    category.value = dataPro[e].category;

    submit.innerHTML="Update";
    count.style.display="none";
    mood = 'update';
    temp = e;
    getTotal();
    scroll({
        top:0,
        behavior:'smooth',

    });
};

// search 

let searchMood = 'titel';
let getSearchMood = (id) =>{
    let search = document.getElementById('search');
    if(id === 'searchTitel'){
        searchMood = 'titel';
    }else{
        searchMood = 'category';
    }
    search.placeholder = "Search By "+searchMood;
    search.focus();
    search.value='';
    showData();
}

let searchData = (value) => {
    let table ='';
     if(searchMood === 'titel'){
        for(let i=0;i<dataPro.length;i++){
              if(dataPro[i].titel.includes(value.toLowerCase())){
                table += `
                <tr>
                  <td>${i+1}</td>
                  <td>${dataPro[i].titel}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button id="update" onclick="updateData(${i})">Update</button></td>
                  <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
                </tr>
               ` 
              }
        }
    }else{
        for(let i=0;i<dataPro.length;i++){
            if(dataPro[i].category.includes(value.toLowerCase())){
              table += `
              <tr>
                <td>${i+1}</td>
                <td>${dataPro[i].titel}</td>
                <td>${dataPro[i].price}</td>
                <td>${dataPro[i].taxes}</td>
                <td>${dataPro[i].ads}</td>
                <td>${dataPro[i].discount}</td>
                <td>${dataPro[i].total}</td>
                <td>${dataPro[i].category}</td>
                <td><button id="update" onclick="updateData(${i})">Update</button></td>
                <td><button id="delete" onclick="deleteItem(${i})">Delete</button></td>
              </tr>
             ` 
            }
    }

  }
  document.getElementById("tbody").innerHTML = table;
}