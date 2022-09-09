import { regReplace,regSplit,regUpper,regLower,regLowerOne,regLen,regUpperOne,regIndex } from "../str.ts";
import { Len, Lower, LowerOne, ReadIndex, Replace, Split, Upper, UpperOne } from "./utils.ts";


export function ManageString(args: string, line: number){
    if(regReplace.test(args)){
        return Replace(args, line)
    }else if(regSplit.test(args)){
        return Split(args, line)
    }else if(regUpper.test(args)){
        return Upper(args, line)
    }else if(regLower.test(args)){
        return Lower(args, line)
    }else if(regLowerOne.test(args)){
        return LowerOne(args, line)
    }else if(regLen.test(args)){
        return Len(args, line)
    }else if(regUpperOne.test(args)){
        return UpperOne(args, line)
    }else if(regIndex.test(args)){
        return ReadIndex(args, line)
    }else{
        throw new Error(`Error at line ${line};\n The method ${args.split(".")[1].split("(")[0]} doesn't exist in str.`);
    }
}