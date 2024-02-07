
// const BaseUrl = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur/jpy.json"
// const dropdowns=document.querySelectorAll(".dropdown select")
// b
// for (let select of dropdowns) {
//     for (let currCode in countryList) {
//         let newOption = document.createElement("option")
//         newOption.innerText = currCode
//         newOption.value = currCode
//         if (select.name === "from" && currCode === "USD") {
//             newOption.selected="selected"
//         }
//         else if(select.name === "to" && currCode == "INR"){
//             newOption.selected="selected"
//         }
//         select.append(newOption)
//     }
// }
        
const BASE_url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/`;
const dropdowns = document.querySelectorAll(".dropdown select")
const button = document.querySelector("form button")
const fromcurr = document.querySelector(".from select")
const tocurr = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for (let select of dropdowns) {
    for (let currCode in countryList) {
        const newOption = document.createElement("option")
        newOption.innerHTML = currCode
        newOption.value = currCode
        select.append(newOption)
        if (select.id == "from" && currCode== "USD") {
            newOption.selected="selected"
        }
        else if (select.id == "to" && currCode== "INR") {
            newOption.selected="selected"
        }
    }

    select.addEventListener("change", (evt) => {
        updateflag(evt.target)
        // console.log(evt.target)
    })
}

function updateflag(element) {
    let currCode = element.value
    let countrycode = countryList[currCode]
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`
    let img = element.parentElement.querySelector('img')
    img.src=newSrc
}

button.addEventListener("click",async (evt)=> {
    evt.preventDefault()
    let amount = document.querySelector(".amount input")
    let amtVal = amount.value
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1
        amount.value="1"
        
    }
    // console.log(fromcurr.value,tocurr.value)
    const URL = `${BASE_url}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json()
    let rate=data[tocurr.value.toLowerCase()]
    let finalAmount = amtVal* rate
    msg.innerText=`${amtVal} ${fromcurr.value}=${finalAmount} ${tocurr.value}`
})



