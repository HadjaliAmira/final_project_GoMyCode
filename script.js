var names=["Chocolat Dulcy", "Fudge", "Croquant","Nougat","Mini","Truffes", "Praliné amandes noisettes", "Pate de noix", "Pate de chocolat croustillante","Box"]
var prices=[600,100,300,70,70,100,600,600,600,3500]
var imgs=["Chocolat_Dulcy.png","Fudge.png","Croquant.png","nougat.png","mini.jpg","truffes.jpg","amandes.jpg","noix.png","pate_croustillante.png","box.png"]

var products=[]
var cart=[]
var total= 0

 var productsGridsHtml=""

    for(index=0; index<names.length; index++){
        const name=names[index];
        const prix=prices[index];
        const image=imgs[index];


        var product={
            id:index,
            name:name,
            price:prix,
            image:image,
            quantity:1
            }

        products.push(product);

        productsGridsHtml += `  
                                <div class="col -3">
                                    <div class="card" style="width: 18rem; margin-bottom: 20px;">
                                        <img src=${image} class="card-img-top" alt="..." >
                                        <div class="card-body">
                                            <div style="display: flex; justify-content: space-between;">
                                                <h5 class="card-title">${name}</h5> 
                                            </div>
                                            <div style="display: flex; ">
                                                <a onclick="addtocart(${index})" class="btn btn-primary"  style="margin-right: 40px; background-color: #b86200; border-radius: 30px; border:none; outline:none;">Acheter</a>
                                                <p style="font-weight: bold;">Price: ${prix}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            `
    }
    document.getElementById("products").innerHTML=productsGridsHtml;
    

    function addtocart(index){

        const produitactuel = products[index];
        var items= document.getElementById('cartitems').innerHTML
        const found= cart.find(produit => produit.id == produitactuel.id)

        if (found){
            cart.forEach(product => {
                if (product.id==found.id){
                    product.quantity++;
                    document.getElementById('qty'+ product.id).innerHTML = product.quantity;
                    total+= produitactuel.price;
                    document.getElementById('total').innerHTML=total;
                }
            });
        }else{
                    cart.push(produitactuel)
                        items+= `<tr id="prod-${produitactuel.id}">
                                    <td>${produitactuel.id}</td>
                                    <td>${produitactuel.name}</td>
                                    <td id="qty${produitactuel.id}">${produitactuel.quantity}</td>
                                    <td>${produitactuel.price}</td>
                                    <td>
                                        <div onclick="removeItem(${produitactuel.id})" class="btn btn-danger" style=" background-color:transparent !important; color: black !important; border-color: aliceblue;"><i class="fa-solid fa-circle-minus"></i></div>
                                    </td>
                                </tr>`
                        document.getElementById('cartitems').innerHTML=items;
                        total+= produitactuel.price;
                        document.getElementById('total').innerHTML=total;
                        console.log(cart)
                        console.log(total)
                }
           
    }
    function removeItem(id) {
        cart = cart.filter((element) => element.id != id)
    
        if (products[id].quantity > 1) {
            products[id].quantity--;
            total=total-products[id].price;
            document.getElementById("qty" + products[id].id).innerHTML = products[id].quantity;
            document.getElementById('total').innerHTML=total;
        } else {
            
            document.getElementById("prod-" + id).remove()
            total=total-products[id].price;
            document.getElementById('total').innerHTML=total;
        }
    }



    