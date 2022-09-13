//get total
//create product
//save LocalStorage
//clear inputs
//read
//count
//delete
//update
//search
//clean data

let title =document.getElementById('title');
let price =document.getElementById('price');
let taxes =document.getElementById('taxes');
let ads =document.getElementById('ads');
let discount =document.getElementById('discount');
let total =document.getElementById('total');
let count =document.getElementById('count');
let category =document.getElementById('category');
let submit =document.getElementById('submit');
let mood = 'create';
let tmp; //global variable

// console.log(title,price,taxes,ads,discount,total,count,category,submit);

//get total
// +price.value data type is number 
// price.value data type is string
function getTotal(){
    if(price.value != ''){
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background ='#040'
    }else{
        total.innerHTML = ' ';
        total.style.background ='background: rgb(117, 13, 13)';
    }
}

//create product
//  localStorage testing if it have elements or not
let dataPro; 
if( localStorage.product != null){
    dataPro =JSON.parse(localStorage.product)
}else{
    dataPro = [];
}

// let dataPro =[];// save all objects in array 

submit.onclick = function(){
    let newPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if (title.value != '' && price.value != '' && category.value !='' && newPro.count < 100 ) {
        if(mood === 'create'){
            if( newPro.count > 1){
                for(let i = 0; i < newPro.count ;i++){
                    dataPro.push(newPro)
                }
                
            }else{
                dataPro.push(newPro)
            }
        }else{
            dataPro[tmp]=newPro;
            mood ='create';
            submit.innerHTML ='create';
            count.style.display ='block';
        }
        clearData();
    }

   


    
    // console.log(newPro);
    localStorage.setItem( 'product' , JSON.stringify(dataPro))
    
    console.log(dataPro);

    
    showData();
}


// clear input
function clearData(){
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML= '';
    count.value = '';
    category.value = '';

}


//read
function showData(){
    
    getTotal() // total color work not

    let table ='';
    for(let i = 0; i< dataPro.length; i++){
    // table = dataPro[i];
        // console.log(table);
        table +=`
                    <tr>
                        <td>${i+1}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                    </tr>`;
    }

    document.getElementById('tbody').innerHTML = table;
    let btnDelete =document.getElementById('deleteAll')
    
    if(dataPro.length > 0 ){
        btnDelete.innerHTML =`<button onclick ='deleteAll()'>delete All(${dataPro.length})</button>`
    }else{
        btnDelete.innerHTML ='';
    }
}
showData()


//delete

function deleteData(i){
// console.log(i); // id print
    dataPro.splice(i,1)
    localStorage.product =JSON.stringify(dataPro);
    showData()

}

//delete All
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)// dlete All data from 0 until the end
    showData()

}

//count

//update
function updateData(i){

    console.log(i);
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display ="none"
    category.value = dataPro[i].category;
    submit.innerHTML = "update"
    mood ='update';
    tmp = i; 
    scroll({
        top:0,
        behavior:'smooth'
        }
    )
    
}


//search
let searchMood = 'title';

function getSearchMood(id) {
    // console.log(id);
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMood = 'title';
        // search.placeholder = 'search By Title';
    }else{
        searchMood = 'category';
        // search.placeholder = 'search By Category';
    }
    search.placeholder = 'search By '+ searchMood;

search.focus()
search.value ='';
showData();
    // console.log(searchMood);
}

function searchData(value) {
    // console.log(value);
    let table = '';
    for (let i =0; i< dataPro.length; i++){
        if(searchMood == 'title'){
            // for (let i =0; i< dataPro.length; i++){
                if (dataPro[i].title.includes(value.toLowerCase())) { //return true
                    // console.log(i);
                    table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>`;
                }

            // }
        
        }else{
            // for (let i =0; i< dataPro.length; i++){
                if (dataPro[i].category.includes(value.toLowerCase())) { //return true
                    // console.log(i);
                    table +=`
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick="updateData(${i})" id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>`;
                }

            // }
        }
    }
    document.getElementById('tbody').innerHTML = table;
}


//clean Data