const debounce = function(fn,delay){
    let timer;
    return function(){
        const context = this;
        const args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(context,args),delay);
    }
}

export default debounce;