let carrinho = [];

function addProduct(id){
    let quantity = document.getElementById("qtd"+id);
    if(quantity.value == '' || quantity.value == 0){
        alert("Sem sapatilhas por comprar")
    }else if(quantity.value < 0 || quantity.value > 10){
        alert("Insira valores entre 1 e 10")
    }else{
        var existe = false;
        carrinho.forEach(element => {
            if(element.id == id){
                existe = true;
            }
        });
        if(existe){
            alert("Sapatilhas ja adicionadas ao carrinho. Tente outras! ")
        }
        my_shoes.forEach(element => {
            if(element.id == id && existe == false){
                createCard(element, quantity.value);
            }
        });
    }   
}
function createCard(my_shoes, qtd){

    carrinho.push({'id':my_shoes.id, 'qty':qtd, 'price':my_shoes.price})

    document.getElementById('carrinho').insertAdjacentHTML(
        "beforeend",
        `
        <div class="card-carrinho" id="card-${my_shoes.id}">
            <div class="card-carrinho-image">
                <img class="image" src="${my_shoes.image2}"> 
            </div>
            <br> 
            <div class="card-carrinho-description" >

                <div class="card-carrinho-item titulo">${my_shoes.name}</div>
                <br> 
                <div class="card-carrinho-item preco">Preço: ${my_shoes.price}</div>
                <br> 
                <div class="card-carrinho-item quantidade">Quantidade:
                <div>
                    <input type="number" class="input_number2" max="10" min="1" id="card-qty-${my_shoes.id}" value="${qtd}"onchange="checkQty('${my_shoes.id}', '${my_shoes.price}', this.value)">
                </div>
                <br> 
                </div>
            </div>
            <br>
            <div class="card-carrinho-total"> <span>Total produto:</span>
                <span class="value" id="${'total'+my_shoes.id}">${my_shoes.price*qtd+".00 MTS"}</span>
            </div>
            <div class="card-carrinho-remove" >   
                <i style="font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;" class='bx bxs-trash button-remove' onclick="removeCard('${my_shoes.id}')">
                </i>
            </div>
            <br></div> `   
    );
    calculateTotal();
}
function checkQty(produtoid, produtoprice, qnty){
    let txtqty = document.getElementById("card-qty-"+produtoid)
    if(qnty == '' || qnty == 0){
        alert("Quantidade nula, por favor insira uma quantidade")
    }else if(qnty< 0){
        alert("A quantidade deve estar no intervalo de 1-10")
        txtqty.value = 1
    }else if(qnty > 10){
        alert("A quantidade deve estar no intervalo de 1-10")
        txtqty.value = 10
    }else{
        carrinho.forEach(element => {
            if(element.id == produtoid){
                element.qty = qnty; 
            }
        });
        document.getElementById('total'+produtoid).innerText = produtoprice*qnty;
        calculateTotal();
    }    
}
function removeCard(produtoid){
    console.log(carrinho);
    let clone = carrinho;
    carrinho = [];
    clone.forEach(element => { 
        console.log(element.id,produtoid);
        if(element.id != produtoid){
            carrinho.push(element);
        }
    });
    console.log(carrinho);
    document.getElementById("card-"+produtoid).remove();
    calculateTotal();
}
function calculateTotal(){
    let total = 0
    carrinho.forEach(element => {
        total += element.price * element.qty;
    });
    document.getElementById('total-products').innerText = ""+total+".00MTS";
}