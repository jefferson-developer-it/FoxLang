import { ExtractArgs, ExtractIndex, RemoveTraces } from "../../validator.ts";
import { VariablesGlobal } from "../../variables.ts";


export function Replace(args: string, line: number){
    const argc = ExtractArgs(args)
    if(argc.length != 3) throw new Error(`Error at line ${line}; Expect tree(3) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 
    const valueOf = RemoveTraces(argc[1].trim()) 
    const valueTo = RemoveTraces(argc[2].trim()) 
    
    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);


    return VariablesGlobal[nameVar].Value.replace(valueOf, valueTo)
}

export function Split(args: string, line: number){
    const argc = ExtractArgs(args)
    if(argc.length != 2) throw new Error(`Error at line ${line}; Expect two(1) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 
    const valueOf = RemoveTraces(argc[1].trim())
    
    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);

    return JSON.stringify(RemoveTraces(VariablesGlobal[nameVar].Value).split(valueOf)).replaceAll('"', "'")
}

export function Lower(args: string, line: number){
    const argc = ExtractArgs(args)
    if(argc.length != 1) throw new Error(`Error at line ${line}; Expect one(1) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 

    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);

    return VariablesGlobal[nameVar].Value.toLocaleLowerCase()
}

export function Upper(args: string, line: number){
    const argc = ExtractArgs(args)
    if(argc.length != 1) throw new Error(`Error at line ${line}; Expect one(1) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 

    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);

    return VariablesGlobal[nameVar].Value.toLocaleUpperCase()
}

export function LowerOne(args: string, line: number){   
    const argc = ExtractArgs(args)
    if(argc.length != 2) throw new Error(`Error at line ${line}; Expect two(2) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 
    const index = argc[1].trim() 

    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);

    const arr = VariablesGlobal[nameVar].Value.split("")
    arr.splice(index, 1,  VariablesGlobal[nameVar].Value[index].toLocaleLowerCase())
    
    return arr.join("")
}

export function UpperOne(args: string, line: number){
    const argc = ExtractArgs(args)
    if(argc.length != 2) throw new Error(`Error at line ${line}; Expect two(2) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 
    const index = argc[1].trim() 

    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);
    const arr = VariablesGlobal[nameVar].Value.split("")
    arr.splice(index, 1,  VariablesGlobal[nameVar].Value[index].toLocaleUpperCase())
    
    return arr.join("")
}

export function Len(args: string, line: number){
    const argc = ExtractArgs(args)
    if(argc.length != 1) throw new Error(`Error at line ${line}; Expect one(1) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[0].trim() 

    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);
    
    return `${VariablesGlobal[nameVar].Value.length - 2}`
}

export function ReadIndex(args: string, line: number){
    const argc = ExtractIndex(args)

    if(argc.length != 2) throw new Error(`Error at line ${line}; Expect one(1) arguments, but recibe only ${argc.length}`);
    
    const nameVar = argc[1].trim() 

    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, variable ${nameVar} not exist.`);
    if(VariablesGlobal[nameVar].Type != "str") throw new Error(`Erro at line ${line}: ${args}, the ${nameVar}'s type is not str.`);
    
    let val = VariablesGlobal[nameVar].Value.at(argc[0]);

    if(argc[0] <= "0") val = VariablesGlobal[nameVar].Value.at(Number(argc[0]) - 2)
    
    return val
}