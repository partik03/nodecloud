import { getAST } from "../../parsers/linode/parser";

interface FunctionData {
  pkgName: string;
  fileName: string;
  functionName: string;
  SDKFunctionName: string;
  params: param[];
  returnType: string;
  client: string;
}

interface param {
  name: string;
  type: string;
}


export async function generateLinodeClass(serviceClass, serviceName) {
  let methods: FunctionData[] = [];
    console.log("serviceClass", serviceClass);
    
  Object.keys(serviceClass).map((key, index) => {
    methods.push({
      pkgName: serviceClass[key].split(" ")[0],
      fileName: serviceClass[key].split(" ")[1],
      functionName: key,
      SDKFunctionName: serviceClass[key].split(" ")[2],
      params: [],
      returnType: null,
      client: null
    });
  });

  const files = Array.from(new Set(methods.map(method => method.fileName)));

  const sdkFiles = files.map(file => {
    return {
      fileName: file,
      pkgName: methods[0].pkgName,
      ast: null,
      client: null,
      sdkFunctionNames: methods
        .filter(method => method.fileName === file)
        .map(method => method.SDKFunctionName)
    };
  });
  console.log("sdkFiles", sdkFiles);
  

  await Promise.all(
    sdkFiles.map(async file => {
        await getAST(file);
    })
  ); 

}
