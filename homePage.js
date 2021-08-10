let list_div=document.getElementById('list')
let wrap_div=document.querySelector('.wrap')
var timer_id;

async function searchEngine(){
    let query=document.getElementById('query').value
    
    if(query.length<=2){
        return false;
    }
    let response= await fetch(`http://api.serpstack.com/search?access_key=382dd57ca9a3e6d30615bf0737e1a6c5&query=${query}`)

    let data=await response.json()
    console.log('data:',data);
     
    //  let{organic_results,search_information}= data

     return data.organic_results;

}
searchEngine()
function throttle(){
    if(timer_id){
        return false;
    }
    timer_id=setTimeout(()=>{
     main();
     timer_id=undefined
    },1000);
}

function appendSearch(el){
    list_div.innerHTML=null;
    el.forEach(({title}) => {
        let li =document.createElement('li')
        li.innerText=title;
        list_div.append(li)
    });
    list_div.style.boxShadow=`1.3px 1.3px 1.3px 2.5px rgb(0,0,0,0.08)`
    // list_div.style.boxShadow=none

}

function searchAppend(el){

   
//   let{search_information}=el
     
//     let about=document.getElementById('About_result')
//     let span1=document.createElement('span')
//     let span2=document.createElement('span')
  
//     span1.innerText=`About${search_information.total_results}results`
//     span2.innerText=`${search_information.time_taken_displayed}`
  
//      about.append(span1,span2)
//      left_div.append(about)
//      wrap_div.append(left_div)
    
    //  document.body.append(wrap_div)
  
    wrap_div.innerHTML=null;


    el.forEach(({title,url})=>{
        let left_div=document.createElement('div')
        left_div.setAttribute('class','left')

     

        let ul=document.createElement('ul')
        ul.setAttribute('class','ul_li')
         
        let li1=document.createElement('li')
        li1.innerText=`${url}`
        let li2=document.createElement('a')
        li2.setAttribute('href',`${url}`)
        li2.innerText=`${title}`
        ul.append(li1)
        ul.append(li2)
        wrap_div.append(ul)
        document.body.append(wrap_div)

    })
    
}


async function main(){
    let search=await searchEngine()
    appendSearch(search)
    searchAppend(search)
    console.log(search);
}