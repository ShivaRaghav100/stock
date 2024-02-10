// const apiKey = 'Y0MEOWL6BNB9HW84'
const apiKey = 'NM63TBL1ZZQSXVJA'
// const apiKey = 'XQOD2LCZVEBNI6QM'
let symbol = 'AMZN'
let time ='DAILY'
// const api = `https://www.alphavantage.co/query?function=TIME_SERIES_${time}&symbol=${symbol}&interval=5min&apikey=${apiKey}`
let responseKey = 'Time Series (Daily)'

const searchInput = document.getElementById("inpt");
const searchButton = document.getElementById("search");
searchButton.addEventListener("click", ()=>{
    symbol=searchInput.value;
    let sbm = searchInput.value;
    console.log(sbm);

    getApiHandler();
})

var form=document.getElementById("input");
function submitForm(event){

   //Preventing page refresh
   event.preventDefault();
}

//Calling a function during form submission.
form.addEventListener('submit', submitForm);

const intraday = document.getElementById('intraday')
intraday.addEventListener("click", ()=>{
    time = 'INTRADAY'
    console.log('abc');
    responseKey = 'Time Series (5min)'
    getApiHandler()
})

const weekly = document.getElementById('weekly')
weekly.addEventListener("click", ()=>{
    time = 'WEEKLY'
    console.log('def');
    responseKey = 'Weekly Time Series'
    getApiHandler()
})

const daily= document.getElementById('daily')
daily.addEventListener("click", ()=>{
    time = 'DAILY'
    console.log('ghi');
    responseKey = 'Time Series (Daily)'
    getApiHandler()
})

const monthly = document.getElementById('monthly')
monthly.addEventListener("click", ()=>{
    time = 'MONTHLY'
    console.log('jkl');
    responseKey = 'Monthly Time Series'
    getApiHandler()
})

async function getApiHandler (){
    const responce = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_${time}&symbol=${symbol}&interval=5min&apikey=${apiKey}`);
    const apiData = await responce.json();
    const metaData = apiData[`${responseKey}`];
    const metaDataSymbl = apiData['Meta Data'];
    console.log({metaData});
    console.log({metaDataSymbl});
    console.log({apiData});
    display(metaDataSymbl,metaData)
}
getApiHandler()

let  titleSpan = null
let times = null
let stockRate = null

function display (metaDataSymbl,metaData){
    const contaner = document.getElementById('contaner');

    while (contaner.firstChild) {
        contaner.firstChild.remove();
    }

    titleSpan = document.createElement("span");
    titleSpan.textContent = metaDataSymbl["2. Symbol"];
    contaner.appendChild(titleSpan)

    times = document.createElement("span");
    times.textContent = time;
    contaner.appendChild(times)

    // const icon = document.createElement('i');
    // icon.classList.add('bx bxs-pin')
    // contaner.appendChild(icon);
    const divEditer = document.getElementById('divEditer')    
    while (divEditer.firstChild) {
        divEditer.firstChild.remove();
    }
    let todayStockRate = null
    for (const [key] of Object.entries(metaData)) {
        if (todayStockRate==null){
            todayStockRate = key
        }

        const div1 = document.createElement('div')

        const spanDate1 = document.createElement('span')
        spanDate1.textContent = key;
        div1.appendChild(spanDate1)
    
        const open1 = document.createElement('span')
        open1.textContent = metaData[`${key}`]['1. open'];
        div1.appendChild(open1)
    
        const high1 = document.createElement('span')
        high1.textContent = metaData[`${key}`]['2. high'];
        div1.appendChild(high1)
    
        const low1 = document.createElement('span')
        low1.textContent = metaData[`${key}`]['3. low'];
        div1.appendChild(low1)
    
        const close1 = document.createElement('span')
        close1.textContent = metaData[`${key}`]['4. close'];
        div1.appendChild(close1)
    
        const volume1 = document.createElement('span')
        volume1.textContent = metaData[`${key}`]['5. volume'];
        div1.appendChild(volume1)
    
        divEditer.appendChild(div1)
    }
    stockRate = document.createElement("span");
    stockRate.textContent =  metaData[`${todayStockRate}`]['4. close'];
    contaner.appendChild(stockRate)
}


// const handleFavStockRemovel = 
// Check if there is data in localStorage
const storedData = localStorage.getItem('stock_watchList');

// Initialize an empty array if localStorage is empty
let watchList = storedData ? JSON.parse(storedData) : [];
function favirateDisplay(watchList){
    for(let i =0;i< watchList.length; i++ ){
        const mainFavList = document.getElementById('favDiv');
        const favDiv = document.createElement("div");

        const favSpanSymbl = document.createElement("span");
        favSpanSymbl.textContent = watchList[i].favtitleSpan;
        favDiv.appendChild(favSpanSymbl)

        const favTime = document.createElement("span");
        favTime.textContent = watchList[i].favTime;
        favDiv.appendChild(favTime)

        const favStockRate = document.createElement("span");
        favStockRate.textContent =watchList[i].favStockRate;
        favDiv.appendChild(favStockRate)

        const icon = document.createElement('i')
        icon.classList.add('bx', 'bx-x');
        icon.id=i
        icon.addEventListener('click',(e)=>{
            console.log(e.target.id);
            for(let i=0; i< watchList.length; i++){
                if(e.target.id <= i){
                    watchList[i] = watchList[i+1]
                }
            }
            localStorage.setItem('stock_watchList',JSON.stringify(watchList))
        })
        favDiv.appendChild(icon)
        

        mainFavList.appendChild(favDiv);
    }
}
favirateDisplay(watchList)


let watchList2=[]
const pin = document.getElementById('pin');
pin.addEventListener('click', ()=>{
    let watchListObj = {
        favtitleSpan:titleSpan.innerHTML,
        favTime:time,
        favStockRate:stockRate.innerHTML
    }
    watchList2.push(watchListObj)
    localStorage.setItem('stock_watchList',JSON.stringify(watchList2))
    console.log(watchList);
    favirateDisplay(watchList)
    console.log('a');
    // console.log({watchListObj});
})

   
//  doubt   add a icon inn favList and add remove btn and if is not present in favList then push in localStorage