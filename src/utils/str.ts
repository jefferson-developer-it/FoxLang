export const regReplace = /\.replace\((.*?)\)/
export const regSplit = /\.split\((.*?)\)/
export const regLower = /\.lower\((.*?)\)/
export const regLowerOne = /\.lowerOne\((.*?)\)/
export const regUpper = /\.upper\((.*?)\)/
export const regUpperOne = /\.upperOne\((.*?)\)/
export const regLen =  /\.len\((.*?)\)/
export const regIndex =  /\[[0-9]\]|\[-[0-9]\]\((.*?)\)/

export const regStr = /str(.*?)/

export function replaceLast(str: string, from: string, replaceTo: string){
    const splitted = str.split("");
    const indexLast = splitted.lastIndexOf(from);
    splitted.splice(indexLast, 1, replaceTo)

    return splitted.join("")
}