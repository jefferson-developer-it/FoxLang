export async function Start(filename: string) {
    try {
        const code_byte = await Deno.readFile(filename);
        return new TextDecoder("utf-8").decode(code_byte)
    } catch (_) {
        throw new Error("The file not exist.");        
    }       
}

export function Debug(...args: any){
    console.log(`Debug: ${args}`)
}