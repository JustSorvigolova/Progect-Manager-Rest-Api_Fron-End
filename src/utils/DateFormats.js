export let DateFormats = (data)=>{
let datas = data.replaceAll(".","-")
let a = datas.substring(0,2)
let b = datas.substring(6)
let c = datas.substring(2,6)
let d = b.concat(c)
    return d.concat(a)
}