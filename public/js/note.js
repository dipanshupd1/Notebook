const save=document.getElementById('save')
const hidinp=document.getElementById('hiddeninp')
const input=document.getElementById('title')
const textar=document.getElementById("texta")
const submit=document.getElementById('submitdata')
const hiddel=document.getElementById('hiddendel')
const deldata=document.getElementById('deldata')

const addnote=()=>{

    if(textar.value===''){
        alert("sorry but you can't save empty note")
    }
    else{
    const note=document.createElement('div');
    note.classList.add('disnote')
    const innerpart=
    `   <div class="divtitle">title</div>
        <div class="divtext">main text</div>
        <button class="delete"><i class="fa-solid fa-trash"></i></i></button>   `;
        
    note.innerHTML=innerpart;
    document.getElementById('main').appendChild(note);
// ------------------------------------------------------------
    // const del=note.querySelector('.delete')
    // const noteid=note.querySelector('.id')
    // del.addEventListener('click',()=>{
    //     // note.remove();
    //     console.log('hii')
    //    hiddel.value=noteid.innerHTML;
    //    deldata.click()

    // })
    // ----------------------------------------------
    const divtitle=note.querySelector('.divtitle')
    const divtext=note.querySelector(".divtext")
    divtitle.innerHTML=input.value;
    divtext.innerHTML=textar.value;


    
    
    submit.click();
    textar.value=''

    }   

}


save.addEventListener('click',addnote)


const del=document.getElementsByClassName('delete')
const emailfordel=document.getElementById('emailfordel')
const noteid=document.getElementsByClassName('id')
for (let i = 0; i < del.length; i++) {

    del[i].addEventListener('click',()=>{
        // note.remove();
        // console.log('hii')
       hiddel.value=noteid[i].innerHTML;
       emailfordel.value=document.getElementById('hiddeninp').value

       deldata.click()
    }) 
    
}


