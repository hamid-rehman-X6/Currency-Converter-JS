
// const apikey = "bf9ce75e09ec6c13226730d8"
// const BASEURL = `https://v6.exchangerate-api.com/v6/${apikey}/pair`


let dropdown = document.querySelectorAll(".dropdown select")
let button = document.querySelector("form button")
let fromCurr = document.querySelector('.from select')
let toCurr = document.querySelector('.to select')
const msg = document.querySelector(".msg")


for (let select of dropdown) {
    for (codeCurr in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = codeCurr;
        newOption.value = codeCurr;
        if (select.name === "from" && codeCurr === "USD") {
            newOption.selected = "selected"
        } else if (select.name === "to" && codeCurr === "PKR") {
            newOption.selected = "selected"
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    // console.log("Currency Code: ", currCode)
    let countryCode = countryList[currCode]
    // console.log("Country Code: ", countryCode)

    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newSrc;
}


button.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let newAmount = amount.value;
    if (newAmount === "" || newAmount < 1) {
        newAmount = 1;
        amount.value = "1"
    }
    // console.log(fromCurr.value, toCurr.value);
    const URL = `${BASEURL}/${fromCurr.value}/${toCurr.value}`
    let response = await fetch(URL);
    let data = await response.json();
    const rate = data.conversion_rate;

    const finalRate = newAmount * rate;
    msg.innerHTML = `${newAmount} ${fromCurr.value} = ${finalRate} ${toCurr.value}`

})

