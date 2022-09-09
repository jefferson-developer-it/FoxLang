import * as path from "https://deno.land/std@0.154.0/path/mod.ts"
import { Start, } from "./src/run.ts";
import { VerifyValue } from "./src/validator.ts";
import { AddConst, AddVar, ReDeclaration, VariablesGlobal as _Var } from "./src/variables.ts";

const filename = Deno.args[0]

if(path.extname(filename) != ".fox") {
    throw new Error(`The extension ${path.extname(filename)} is not valid, use .fox.`);
}

const code = await Start(filename)
const code_splitted = code.split("\n");

for(let line = 0; line < code_splitted.length; line++){
    const varExp = /var (.*[a-z|A-Z]) \> (.*[a-z]) =/ 
    const const_defExp = / const def (.*[a-z|A-Z]) > (.*[a-z]) =/;
    const refRedeclaration = /(.*[a-z]|[A-Z]) =/
    const value = code_splitted[line]

    if(varExp.test(value)){
        AddVar(value, line + 1);
    }else if(const_defExp.test(value)){
        AddConst(value, line + 1);
    }else if(refRedeclaration.test(value)){
        ReDeclaration(value, line + 1)
    }else{
        VerifyValue(value, line + 1, code_splitted)
    }
}