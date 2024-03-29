let add=100
console.log(add);
function fnn(this:Window){
    alert(this)
}

let box = document.getElementById('box')

// if(box !== null){
//     box.addEventListener('click',function(){
//         alert("hello")
//     })
// }
box?.addEventListener('click', function(){
    alert("hello")
})