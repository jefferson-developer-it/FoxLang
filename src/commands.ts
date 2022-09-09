import { ExtractArgs, RemoveTraces, TypeExp, ValidatorType, VerifyValue } from "./validator.ts"
import { VariablesGlobal } from "./variables.ts"

export function Write(args: string, line: number){
    const argc = ExtractArgs(args);
    
    let msg_write = ""    

    for(const msg of argc){
        const key: string = msg.trim()
        
        if(ValidatorType(key, "func")){
            msg_write += RemoveTraces(VerifyValue(key, line))
        }else if(ValidatorType(key, "str")){
            msg_write += RemoveTraces(key)
        }else if(VariablesGlobal[key]){
            msg_write += RemoveTraces(VariablesGlobal[key].Value)
        }else{            
            const value = VerifyValue(key, line, [], ()=>{
                throw new Error(`The variable/constant ${key} is not declared.\n Error at line ${line}`);
            }) 
            msg_write += `${RemoveTraces(value) || "Unknown"}`
        }

        msg_write += " "
    }

    msg_write = msg_write.replaceAll("\\n", "\n")
    msg_write = msg_write.replaceAll("\\r", "\r")
    msg_write = msg_write.replaceAll("\\t", "\t")
    

    console.log(msg_write)
}

export function TypeOf(args: string, line: number): string{
    const args_f = ExtractArgs(args);

    if(args_f.length > 1 || !args_f.length) throw new Error(`Error at line ${line}, because expect 1 argument an you give ${args_f.length}`);
     
    
    const nameVar = args_f[0]

    if(TypeExp.str.test(nameVar)) return "str"
    else if(TypeExp.num.test(nameVar)) return "num"
    else if(TypeExp.bool.test(nameVar)) return "bool"
    else if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, because the var ${nameVar} is not declared.`);

    return VariablesGlobal[nameVar].Type
}

export function Const(args: string, line: number){
    const nameVar = args.split("(")[1].replace(")", "").trim();
    if(!VariablesGlobal[nameVar]) throw new Error(`Error at line ${line}, because the var ${nameVar} is not declared.`);

    VariablesGlobal[nameVar].Mutable = false;

    return `The ${nameVar} now is a const. Can't do change your value.`
}