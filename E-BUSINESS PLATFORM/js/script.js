// PRODUCTS WITH THEIR IMAGES (10 PER CATEGORY)

const products = [

    /* ELECTRONICS */
    
    {id:1,name:"Laptop",price:800,category:"Electronics",image:"images/laptop.jpg"},
    {id:2,name:"Phone",price:500,category:"Electronics",image:"images/phone.jpg"},
    {id:3,name:"Tablet",price:350,category:"Electronics",image:"images/tablet.jpg"},
    {id:4,name:"Headphones",price:120,category:"Electronics",image:"images/headphones.jpg"},
    {id:5,name:"Smart Watch",price:150,category:"Electronics",image:"images/smartwatch.jpg"},
    {id:6,name:"Camera",price:650,category:"Electronics",image:"images/camera.jpg"},
    {id:7,name:"Speaker",price:90,category:"Electronics",image:"images/speaker.jpg"},
    {id:8,name:"Keyboard",price:60,category:"Electronics",image:"images/keyboard.jpg"},
    {id:9,name:"Mouse",price:40,category:"Electronics",image:"images/mouse.jpg"},
    {id:10,name:"Monitor",price:220,category:"Electronics",image:"images/monitor.jpg"},
    
    
    /* FASHION */
    
    {id:11,name:"T-Shirt",price:40,category:"Fashion",image:"images/tshirt.jpg"},
    {id:12,name:"Jeans",price:70,category:"Fashion",image:"images/jeans.jpg"},
    {id:13,name:"Shoes",price:80,category:"Fashion",image:"images/shoes.jpg"},
    {id:14,name:"Jacket",price:120,category:"Fashion",image:"images/jacket.jpg"},
    {id:15,name:"Dress",price:90,category:"Fashion",image:"images/dress.jpg"},
    {id:16,name:"Cap",price:20,category:"Fashion",image:"images/cap.jpg"},
    {id:17,name:"Hoodie",price:65,category:"Fashion",image:"images/hoodie.jpg"},
    {id:18,name:"Sneakers",price:95,category:"Fashion",image:"images/sneakers.jpg"},
    {id:19,name:"Sandals",price:45,category:"Fashion",image:"images/sandals.jpg"},
    {id:20,name:"Bag",price:110,category:"Fashion",image:"images/bag.jpg"},
    
    
    /* BOOKS */
    
    {id:21,name:"JavaScript Book",price:30,category:"Books",image:"images/jsbook.png"},
    {id:22,name:"Python Book",price:28,category:"Books",image:"images/pythonbook.jpg"},
    {id:23,name:"Database Book",price:35,category:"Books",image:"images/databook.png"},
    {id:24,name:"Networking Book",price:32,category:"Books",image:"images/networkingbook.jpg"},
    {id:25,name:"AI Book",price:40,category:"Books",image:"images/aibook.jpg"},
    {id:26,name:"Security Book",price:38,category:"Books",image:"images/securitybook.jpg"},
    {id:27,name:"Web Development",price:34,category:"Books",image:"images/webbook.jpg"},
    {id:28,name:"Cloud Computing",price:36,category:"Books",image:"images/cloudbook.jpg"},
    {id:29,name:"UI Design",price:27,category:"Books",image:"images/designbook.jpg"},
    {id:30,name:"Mobile App Development",price:33,category:"Books",image:"images/mobilebook.jpg"}
    
    ];
    
    
    // CART STORAGE
    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    updateCartCount();
    
    
    // DISPLAY PRODUCTS
    
    function displayProducts(list){
    
    const container = document.getElementById("product-list");
    
    if(!container) return;
    
    container.innerHTML="";
    
    list.forEach(product=>{
    
    const card=document.createElement("div");
    card.className="card";
    
    card.innerHTML=`
    
    <img src="${product.image}" class="product-img">
    
    <h3>${product.name}</h3>
    
    <p>$${product.price}</p>
    
    <p>${product.category}</p>
    
    <button onclick="addToCart(${product.id})">Add to Cart</button>
    
    `;
    
    container.appendChild(card);
    
    });
    
    }
    
    displayProducts(products);
    
    
    // ADD TO CART
    
    function addToCart(id){
    
    const product = products.find(p => p.id === id);
    
    const item = cart.find(i => i.id === id);
    
    if(item){
    
    item.quantity++;
    
    }else{
    
    // ADD FULL PRODUCT OBJECT INCLUDING IMAGE
    cart.push({...product, quantity:1});
    
    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    
    updateCartCount();
    
    }
    
    
    // CART COUNT
    
    function updateCartCount(){
    
    const count=document.getElementById("cart-count");
    
    if(count){
    
    let total=0;
    
    cart.forEach(i=>total+=i.quantity);
    
    count.textContent=total;
    
    }
    
    }
    
    
    // DISPLAY CART
    
    function displayCart(){
    
    const cartItems=document.getElementById("cart-items");
    
    if(!cartItems) return;
    
    cartItems.innerHTML="";
    
    let total=0;
    
    cart.forEach(item=>{
    
    total+=item.price*item.quantity;
    
    cartItems.innerHTML+=`
    
    <div class="cart-item">
    
    <img src="${item.image}" class="cart-img">
    
    <h3>${item.name}</h3>
    
    <p>$${item.price}</p>
    
    <button onclick="changeQty(${item.id},-1)">-</button>
    
    ${item.quantity}
    
    <button onclick="changeQty(${item.id},1)">+</button>
    
    <button onclick="removeItem(${item.id})">Remove</button>
    
    </div>
    
    `;
    
    });
    
    const totalElement=document.getElementById("total");
    
    if(totalElement) totalElement.textContent=total.toFixed(2);
    
    }
    
    displayCart();
    
    
    // CHANGE QUANTITY
    
    function changeQty(id,value){
    
    try{
    
    const item=cart.find(i=>i.id===id);
    
    item.quantity+=value;
    
    if(item.quantity<=0){
    
    removeItem(id);
    
    return;
    
    }
    
    localStorage.setItem("cart",JSON.stringify(cart));
    
    displayCart();
    
    updateCartCount();
    
    }catch(error){
    
    alert("Quantity error");
    
    }
    
    }
    
    
    // REMOVE ITEM
    
    function removeItem(id){
    
    cart=cart.filter(item=>item.id!==id);
    
    localStorage.setItem("cart",JSON.stringify(cart));
    
    displayCart();
    
    updateCartCount();
    
    }
    
    
    // SEARCH PRODUCTS
    
    const search=document.getElementById("search");
    
    if(search){
    
    search.addEventListener("keyup",function(){
    
    const text=this.value.toLowerCase();
    
    const filtered=products.filter(p=>
    
    p.name.toLowerCase().includes(text)
    
    );
    
    displayProducts(filtered);
    
    });
    
    }
    
    
    // FILTER PRODUCTS
    
    const filter=document.getElementById("filter");
    
    if(filter){
    
    filter.addEventListener("change",function(){
    
    const category=this.value;
    
    if(category==="all"){
    
    displayProducts(products);
    
    }else{
    
    const filtered=products.filter(p=>p.category===category);
    
    displayProducts(filtered);
    
    }
    
    });
    
    }
    
    
    // CHECKOUT VALIDATION
    
    const form=document.getElementById("checkoutForm");
    
    if(form){
    
    form.addEventListener("submit",function(e){
    
    e.preventDefault();
    
    try{
    
        const name=document.getElementById("name").value;
        const email=document.getElementById("email").value;
        const phone=document.getElementById("phone").value;
        const address=document.getElementById("address").value;
        
        if(!name || !email || !phone || !address){
          throw "All fields are required";
        }
    
    if(!email.includes("@")){
    
    throw "Invalid email";
    
    }
    
    if(cart.length===0){
    
    throw "Cart is empty";
    
    }
    
    alert("Order placed successfully");
    
    localStorage.removeItem("cart");
    
    cart=[];
    
    updateCartCount();
    
    }catch(error){
    
    alert(error);
    
    }
    
    });
    
    }