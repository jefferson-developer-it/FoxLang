import { ExtractArgs, ValidatorType } from "../validator.ts";


export function Random(args: string, line: number) {
    const nuns = ExtractArgs(args)

    if(nuns.length > 2 || nuns.length < 2) throw new Error(`Error at line ${line}\nExpect two(2) arguments and recibe ${nuns.length}`);
    
    for(const d of nuns) if(!ValidatorType(d, "num")) throw new Error(`Error at line ${line}, because expect num type and recibe another type, the value is: ${d}`);    

    const min = Number(nuns[0])
    const max = Number(nuns[1])

    return Math.round(Math.random() * (max - min) + min)
}

// export function Round(num: number): number{
//     return Math.round(num)
// }

export function ExecMath(strExec: string){
    return eval(strExec)
}