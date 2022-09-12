// deno-lint-ignore-file
import { Debug } from "../../run.ts"
import { RemoveTraces, ValidatorType, VerifyValue } from "../../validator.ts"
import { AddConst, AddVar, ChangeNextLine, NextLine, ReDeclaration, VariablesGlobal } from "../../variables.ts"

export const regIf = /if (.*?)/
export const regIfEnd = /endif/
export const regElseIf = /a_if (.*?)/
export const regElse = /else:/

export function ConvFoxExpToJS(keys: string[], line: number){
    const value = [];

    for(let key of keys){
        key = key.trim()
        if(key == "T"){
            value.push(true)
        }else if(key == "F"){
            value.push(false)
        }else if(key == "not"){
            value.push("!")
        }else if(key == "eq"){
            value.push("==")
        }else if(key == "!eq"){
            value.push("!=")
        }else if(key == "eq*"){
            value.push("===")
        }else if(key == "!eq*"){
            value.push("!==")
        }else if(key == "and" || key == "or"){
            value.push(key == "and"?"and": "or")
        }else if(key == "<" || key == ">"){
            value.push(key)
        }else if(key == "<eq" || key == ">eq"){
            value.push(key == "<eq"? "<=": ">=")
        }else if(VariablesGlobal[key]){
            if(ValidatorType(VariablesGlobal[key].Value, "bool")){
                value.push(VariablesGlobal[key].Value == "T"? true: false)
            }else{
                value.push(VariablesGlobal[key].Value)
            }
        }else if(ValidatorType(key, "func")){
            value.push(VerifyValue(key, line))
        }else if(ValidatorType(key, "str")){
            value.push(key)
        }else if(ValidatorType(key, "num")){
            value.push(key)
        }else if(key == "T" || key == "F"){
            value.push(key == "T")
        }else{            
            const value_ = VerifyValue(key, line) 
            value.push(`'${value_ || "Unknown"}'`)
        }
    }
    return value ;   
}

function ExecIfBlock(if_block: string[]){
    for(let line = 0; line < if_block.length; line++){
        const varExp = /var (.*[a-z|A-Z]) \> (.*[a-z]) =/ 
        const const_defExp = / const def (.*[a-z|A-Z]) > (.*[a-z]) =/;
        const refRedeclaration = /(.*[a-z]|[A-Z]) =/
        const value = if_block[line].trim()        

        if(regElse.test(value) || regElse.test(value)){                
            break
        }else if(varExp.test(value)){
            throw new Error(`Can't declare variable in if scope, ${line} ${value}`);
            
        }else if(const_defExp.test(value)){
            throw new Error(`Can't declare variable in if scope, ${line} ${value}`);
        }else if(refRedeclaration.test(value)){
            ReDeclaration(value, line + 1)
        }else{
            VerifyValue(value, line + 1, if_block)
        }
    }
}

export function ExecIf(codeLine: string, code_s: string[], line: number, type="if"){
    const if_block = code_s.slice(line, code_s.indexOf("endif"))
    const expression = codeLine.split(type)[1].trim()
    const keys = expression.split(" ");
    
    const value = ConvFoxExpToJS(keys, line)

    let else_block: any[] = []
    let a_if_block: any[] = []

    ChangeNextLine(line + if_block.length)  

    const js_expression = value.join(" ");
    const isTrue = eval(js_expression);   

    let i_else = -1;
    let i_if_else = [];
    let if_else = [];

    for(let line in if_block){
        let code = if_block[line].trim()
        if(regElse.test(code)){
            i_else = Number(line);
            break
        }else if(regElseIf.test(code)){
            i_if_else.push(Number(line))
        }
    }

    if(isTrue || ! "'Unknown'"){
        ExecIfBlock(if_block)
    }else{
        if(i_if_else){
            for(let a_if of i_if_else){
                a_if_block.push(if_block.slice(a_if + 1, i_else))
                     
                const expression = if_block[a_if].split("a_if")[1].trim().split(" ")
                const values = ConvFoxExpToJS(expression, a_if)
                if_else.push(eval(values.join(" ")))    
            }           
        }
        

        if(if_else.includes(true)){
            for(const index in if_else){
                if(if_else[index]) ExecIfBlock(a_if_block[index])                
            }
        }else if(i_else != -1){
            else_block = if_block.slice(i_else + 1)
                        
            ExecIfBlock(else_block)
        }
    }

    return isTrue || if_else.includes(true)
}