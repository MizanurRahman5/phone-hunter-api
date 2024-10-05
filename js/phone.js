const loadPhone = async(status, brand) => {
    const spinner = document.getElementById('spinner');
    spinner.classList.add('hidden')
    // console.log(brand);

    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${brand?brand: "iphone"}`);
    const data = await res.json()
    // console.log(data.data)
    if(brand == 0){
        const emptyMassage = document.getElementById('emty');
        emptyMassage.innerText = 'sorry no phone'
        // console.log('empty')
        return;
    }else if(status == true){
        displayPhone(data.data);
    }else{
        displayPhone(data.data.slice(0, 6));
    }
    

}

const displayPhone = (phone) =>{
    const videoContainer = document.getElementById('video-container');
    
    phone.forEach(item => {
        // console.log(item)
        const {slug,phone_name,image,brand} = item;
       const card = document.createElement('div')
       card.innerHTML = `

       <div class="card bg-base-100 w-96 shadow-xl">
  <figure class="px-10 pt-10">
    <img
      src=${image}
      alt="Shoes"
      class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${brand}</h2>
    <p>${slug}</p>
    <div class="card-actions">
      <button onclick="showDetails('${slug}')" class="btn btn-primary">See Details</button>
    </div>
  </div>
</div>
       
       `

       videoContainer.append(card);
    });
}

const showDetails = async(slugs) =>{
    // console.log(slug);

    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${slugs}`)
    const data = await res.json()
    console.log(data.data);

    const {brand, image, slug} = data.data

    const modalContainer = document.getElementById("modal-container")

    modalContainer.innerHTML = `

    <dialog id="my_modal_1" class="modal">
  <div class="modal-box">
    <h3 class="text-lg font-bold">${brand}</h3>
    <p class="py-4">Press ESC key or click the button below to close</p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
    
    `
    my_modal_1.showModal()




}

const handleShow = () => {
    loadPhone(true);
    // console.log('click')
}
 
const handleSearch = () =>{


    const spinner = document.getElementById('spinner');
    spinner.classList.remove('hidden')
    // console.log('click');

    const textField = document.getElementById('tex-box');
    const textValue = textField.value;

    setTimeout(() => {
        loadPhone(false, textValue);
    }, 3000)


}

loadPhone(false);


