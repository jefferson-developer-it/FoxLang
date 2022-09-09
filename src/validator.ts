import { Const, TypeOf, Write } from "./commands.ts"
import { Random } from "./Math/Utils.ts"
import { ExecIf, regIf } from "./utils/func/if.ts";
import { regConst, regRandom, regTypeOf, regWrite } from "./utils/func/task.ts";
import { regStr } from "./utils/str.ts";
import { ManageString } from "./utils/str/main.ts";

export const TypeExp = {
    str: /'(.*?)'/,
    num: /[0-9]/,
    bool: /[T|F]/,
    func: /([a-z|A-Z].*[a-z|A-Z])\((.*?)\)/,
    arr: /\[(.*?)\]/
}

export function ExtractArgs(args: string){
    const arg_ = args.split("");
    const ind = arg_.indexOf("(")
    let arguments_return = ""
    let has_fun = false
    let funFound = 0

    for(const i in arg_){
        if(Number(i) > ind) arguments_return += arg_[i]
    }
    let newArg = ""
    const funArg:string[] = []
    for(const c of arguments_return){
        if(c == "("){
            has_fun = true
            funFound++;
            funArg[funFound] = "";
            continue
        }else if(c == ")"){
            has_fun = false
            continue
        }

        if(has_fun){
            funArg[funFound] += c;
            newArg += newArg.includes(`*fun${funFound}*`)? "": `*fun${funFound}*` 
        }else{
            newArg += c
        }        
    }

    newArg = newArg.replaceAll("->", "\\->")

    for(const fn in funArg){
        newArg = newArg.replace(`*fun${fn}*`, `(${funArg[fn]})`)
    }

    return newArg.split("\\->")
}

export function ExtractIndex(args: string){
    const index_arr = args.split("[")[1].split("]")
        index_arr[1] = index_arr[1].replace("(", "").replace(")", "")
    
    return index_arr
}

export function ValidatorType(value: string, expect: string) {
    value = value.trim()
    
    switch (expect) {
        case "any":
            return true
        case "arr":
            if(TypeExp.arr.test(value)) return true
            else return false
        case "func":
            if(TypeExp.func.test(value)) return true
            else return false
        case "str":
            if(TypeExp.str.test(value)) return true
            else return false
        case "num":
            if(TypeExp.str.test(value)) return false
            else if(TypeExp.num.test(value)) return true
            else return false
        case "bool":
            if(TypeExp.bool.test(value)) return true
            else return false
        default:
            break;
    }
}

export function RemoveTraces(x: string): string{
    return x.replaceAll("'", "")
}

// deno-lint-ignore no-explicit-any
export function VerifyValue(value: string, line: number, codeArr?: string[], callback?: ()=>void): any {

    if(regWrite.test(value)){
        return Write(value, line)
    }else if(regRandom.test(value)){
        return Random(value, line) 
    }else if(regTypeOf.test(value)){
        return TypeOf(value, line)
    }else if(regConst.test(value)){
        return Const(value, line)
    }else if(regStr.test(value)){
        return ManageString(value, line)
    }else if(regIf.test(value)){
        return ExecIf(value, codeArr || [], line)
    }else{
        if(callback) callback()
        return "Unknown"
    }
}