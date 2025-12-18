const BASE_URL =
"https://open.er-api.com/v6/latest/";
const dropdowns=document.querySelectorAll(".d select");
const but=document.querySelector("#eb"); 
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select"); 
const msg=document.querySelector("ep");
for(let select of dropdowns) {
for(code in countryList) {
    let newo=document.createElement("option");
    newo.innerText=code;
    newo.value=code;
  if (select.name === "from" && code === "USD") {
      newo.selected = "selected";
    } else if (select.name === "to" && code === "INR") {
      newo.selected = "selected";
    }
    select.append(newo); 
} 
select.addEventListener("change",(evt) => {
    updateFlag(evt.target);
});
}
const updateFlag=(element) => {
    let curcode=element.value; 
    let coucode=countryList[curcode];
    let news=`https://flagsapi.com/${coucode}/flat/64.png`;
     let img = element.parentElement.querySelector("img");
  img.src = news;
};
but.addEventListener("click",async (evt)=> {
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amv=amount.value;
    if(amv==""||amv<0) {
        amv=1;
        amount.value="1";
    }
        const url = `${BASE_URL}/${fromcurr.value}`;
    let response=await fetch(url);
    let data=await response.json();
     const rate = data.rates[tocurr.value];
        console.log("Exchange Rate:", rate);

        let result = amv*rate;
        
        console.log("Converted Amount:", result);
        ep.innerText=`${amv}${fromcurr.value}=${result}${tocurr.value}`;
})