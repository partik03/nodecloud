import * as fs from 'fs';
import { createSourceFile, ScriptTarget, SyntaxKind } from 'typescript';

import { getAST } from '../../parsers/linode/parser';
import { transform } from '../../transformers/linode/transformer';
import { getDir, printFile } from '../lib/helper';

interface SDKClassData {
	pkgName: string;
	fileName: string;
	functionName: string;
	SDKFunctionName: string;
	params: param[];
	returnType: string;
	client: string;
}

interface FunctionData {
	functionName: string;
	SDKFunctionName: string;
	params: param[];
}

interface ClassData {
	className: string;
	functions: FunctionData[];
	serviceName: string;
}

interface param {
	name: string;
	type: string;
	typeName: string;
	optional: boolean;
}

const dummyFile = process.cwd() + '/dummyClasses/linode.js';

const dummyAst = createSourceFile(
	dummyFile,
	fs.readFileSync(dummyFile).toString(),
	ScriptTarget.Latest,
	true
);

export function extractSDKData(sdkAst, serviceClass) {
	const methods: FunctionData[] = [];
	const functions = [];

	Object.keys(serviceClass).map((key, index) => {
		functions.push(serviceClass[key].split(' ')[2]);
	});

	sdkAst.map(method => {
		// console.log("method",method);

		const methodName = method.name.escapedText;
		if (methodName && functions.includes(methodName)) {
			// console.log(method);

			let name;
			Object.keys(serviceClass).map((key, index) => {
				if (serviceClass[key].split(' ')[2] === methodName) {
					name = key;
				}
			});
			const parameters = [];

			const methodParameters = method.type.parameters;
			console.log(methodParameters[0].name.elements);

			methodParameters.map(param => {
				if (param.name.excapedText !== 'callback') {
					const parameter: param = {
						name: param.name.escapedText,
						optional: param.questionToken ? true : false,
						type: SyntaxKind[param.type.kind],
						typeName: null,
					};
					// common type
					if (param.type.typeName) {
						parameter.typeName = param.type.typeName.text;
					}
					parameters.push(parameter);
				}
			});
			// console.log(parameters);

			methods.push({
				functionName: name.toString(),
				SDKFunctionName: methodName,
				params: parameters,
			});
		}
	});

	return methods;
}

export async function getFunctions(sdkFiles, serviceClass) {
	const functionsArray: FunctionData[] = [];
	await sdkFiles.map(async file => {
		getAST(file).then(async result => {
			const sdkAst = result;
			try {
				const functions: FunctionData[] = extractSDKData(
					sdkAst,
					serviceClass
				);

				functions.map((method, index) => {
					functionsArray.push(method);
				});
			} catch (e) {
				console.error(e);
			}
		});
	});

	return functionsArray;
}

export async function generateLinodeClass(serviceClass, serviceName) {
	try {
		const methods: SDKClassData[] = [];
		if (serviceClass == null) return;
		Object.keys(serviceClass).map((key, index) => {
			methods.push({
				pkgName: serviceClass[key].split(' ')[0],
				fileName: serviceClass[key].split(' ')[1],
				functionName: key,
				SDKFunctionName: serviceClass[key].split(' ')[2],
				params: [],
				returnType: null,
				client: null,
			});
		});

		const files = Array.from(
			new Set(methods.map(method => method.fileName))
		);

		const sdkFiles = files.map(file => {
			return {
				fileName: file,
				pkgName: methods[0].pkgName,
				ast: null,
				client: null,
				sdkFunctionNames: methods
					.filter(method => method.fileName === file)
					.map(method => method.SDKFunctionName),
			};
		});
		const functionsArray: FunctionData[] = await getFunctions(
			sdkFiles,
			serviceClass
		);
		// console.log(functionsArray);

		const classData: ClassData = {
			className: serviceName + 'LinodeClass',
			functions: functionsArray,
			serviceName: serviceName,
		};
		const output = await transform(dummyAst, classData);
		let filePath;
		const dir = getDir(serviceName);

		if (!fs.existsSync(process.cwd() + '/generatedClasses/Linode/' + dir)) {
			fs.mkdirSync(process.cwd() + '/generatedClasses/Linode/' + dir);
		}
		if (/^[A-Z]*$/.test(serviceName)) {
			filePath =
				process.cwd() +
				'/generatedClasses/Linode/' +
				dir +
				'/linode-' +
				serviceName +
				'.js';
		} else {
			filePath =
				process.cwd() +
				'/generatedClasses/Linode/' +
				dir +
				'/linode-' +
				serviceName.charAt(0).toLowerCase() +
				serviceName.slice(1) +
				'.js';
		}
		printFile(filePath, output);
	} catch (e) {
		console.error(e);
	}
}
