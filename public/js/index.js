$(".add").on("click",()=>{
    index = localStorage.getItem("index");
    if(index==null){
        index = 0;
        localStorage.setItem("index",index);
    }
    item = $("#forminput").val();
    if(item!=="")
    {
    localStorage.setItem(Number(index)+1,item);
    localStorage.setItem("index",Number(index)+1);
    $("#forminput").val("");
    

    element = ' <div id="'+index+'"> <input type="checkbox" name="checkbox" onChange="del('+index+')" id="checkbox"><p>'+item+'</p></div><br>';
    $(".listitem").append(element);
    }

});

window.addEventListener("load",()=>{
    index = localStorage.getItem("index");
    if(index!=null){
        for(i=1;i<=index;i++){
            item = localStorage.getItem(i);
            if(item!=null){
            element = '<div id="'+i+'"> <input type="checkbox" name="checkbox"  onChange="del('+i+')" id="checkbox"><p>'+item+'</p></div><br>';
        $(".listitem").append(element);
            }
        }
    }
    if($(".listitem").html().trim()==""){
        index = 0;
        localStorage.setItem("index",0);
    }
});
const del = (index) =>{
    localStorage.removeItem(index);
    $("#"+index).remove();
}