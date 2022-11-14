const search_bar = document.getElementById('search_bar');
const search_btn = document.querySelector('.fa-magnifying-glass');
const lists=document.querySelector('.lists');
const first_span = document.querySelector(".fs");


import { Music } from "../assets/requests.js";
let music= new Music;

search_btn.onclick=()=>{
    if (first_span.textContent == "Login") {
        document.querySelector('.auth_div').style.display = "flex";
        document.querySelector('#main').style.filter = "brightness(50%)";
    }else{
        let x=music.searchSongs(search_bar.value);
        x.then(e=>displaylist(e))
    }
}

function displaylist(array){
    lists.innerHTML=null;
    array.forEach(el => {
       

        let item=document.createElement('div');
        let player=document.createElement('div');
        let info=document.createElement('div');
        let img=document.createElement('img');
        let title=document.createElement('span');
        let desc=document.createElement('span');
        let btn=document.createElement('i');

        item.className='item';
        player.className='player'
        info.className='info';
        btn.className='fa-sharp fa-solid fa-circle-play';

        img.src=el.image;
        title.textContent=el.title;
        desc.textContent=el.description

        
        info.append(title,desc);
        item.append(img,info,btn,player)
        lists.append(item);
        btn.onclick=()=>{
            let url=music.getSong(el.id);
            url.then(e=>{
                document.querySelectorAll('.player').forEach(e=>e.innerHTML=null);
                player.innerHTML+=`<audio autoplay src=${e} controls class="musicPlayer">
    
                </audio>`
             })
        }
    });
}

