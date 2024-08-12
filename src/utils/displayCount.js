export const displayCount = (count) => {
    let viewCount;
    if(count >= 1000) {
        viewCount = count/1000;
        let decimalValue = viewCount.toString().indexOf(".");
        if(decimalValue[0] === '0'){
            return `${Math.floor(viewCount)}k`;
        } else {
            return `${viewCount.toFixed(1)}k`;
        }
        
        
    } else{
        return `${count}`;
    }
}