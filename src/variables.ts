import { Variables } from "../interfaces.ts";
import { Debug, ExecBool } from "./run.ts";
import { TypeExp, ValidatorType, VerifyValue } from "./validator.ts";

export const VariablesGlobal: {[x: string]: Variables} = {}
export let NextLine = 0;

export function ChangeNextLine(n: number){
    NextLine = n;
}

export function AddVar(codeLine: string, line: number){
    codeLine = codeLine.replace("var", "").trim()
    const name = codeLine.split(">")[0].trim()
    const type = codeLine.split(">")[1].split("=")[0].trim()
    const value_base = codeLine.split("=")[1].trim()
    let value = VerifyValue(value_base, line);
    
    if(VariablesGlobal[name]) throw new Error(`Erro at line ${line}, the variable/constant ${name} are existent.`);
    
    if(value == "Unknown") value = value_base || "Unknown"
    
    const correctType = ValidatorType(value, type);

    if(!correctType) throw new Error(`Error at line ${line};\nExpect type ${type}, but the value ${value} not is this type.`);
    
    const variable:Variables = {
        Value: value,
        Name: name,
        Type: type,
        Address: Math.random().toString(16),
        Mutable: true
    }


    if(type == "bool"){
        variable.Value = ExecBool(value);        
    }

    VariablesGlobal[name] = variable
}

export function AddConst(codeLine: string, line: number){
    codeLine = codeLine.replace("const def", "").trim()
    const name = codeLine.split(">")[0].trim()    
    const type = codeLine.split(">")[1].split("=")[0].trim()
    const value_base = codeLine.split("=")[1].trim()
    let value = VerifyValue(value_base, line);
    
    if(VariablesGlobal[name]) throw new Error(`Erro at line ${line}, the variable/constant ${name} are existent.`);
    
    if(value == "Unknown") value = value_base || "Unknown"
    
    const correctType = ValidatorType(value, type);

    if(!correctType) throw new Error(`Error at line ${line};\nExpect type ${type}, but the value ${value} not is this type.`);
       

    const variable:Variables = {
        Value: value,
        Name: name,
        Type: type,
        Address: Math.random().toString(16),
        Mutable: false
    } 

    VariablesGlobal[name] = variable
}

export function ReDeclaration(codeLine: string, line: number){
    const name = codeLine.split("=")[0].trim()
    const value_base = codeLine.split("=")[1].trim()
    
    let value = VerifyValue(value_base, line);
    
    if(!VariablesGlobal[name]) throw new Error(`Erro at line ${line}, the variable/constant ${name} are not existent.`);
    if(!VariablesGlobal[name].Mutable) throw new Error(`The variable ${name} is immutable! erro at line ${line}: ${codeLine}\n`);
    
    if(value == "Unknown") value = value_base || "Unknown"

    if(VariablesGlobal[name].Type == "str" && !TypeExp.str.test(value)) value = `'${value}'`
    
    const correctType = ValidatorType(value, VariablesGlobal[name].Type);

    if(!correctType) throw new Error(`Error at line ${line};\nExpect type ${VariablesGlobal[name].Type}, but the value ${value} not is this type.`);
       
    const variable:Variables = {
        ...VariablesGlobal[name],
        Value: value
    } 

    VariablesGlobal[name] = variable
}