import ts = require('typescript');

export async function transform(
	code: ts.SourceFile,
	classData: any
)
// : Promise<string> 
 {
	const addFunctions = <T extends ts.Node>(
		context: ts.TransformationContext
	) => (rootNode: T) => {
		function visit(node: ts.Node): ts.Node {
			if (ts.isClassDeclaration(node)) {
				let functions: any = [];
				classData.functions.map(method => {
					const clonedNode = Object.assign({}, node.members[1]);

					clonedNode.name = ts.createIdentifier(method.functionName);
					functions.push(clonedNode);
				});

				// const updatedClass = ts.updateClassDeclaration(
				// 	node,
				// 	node.decorators,
				// 	node.name,
				// 	node.typeParameters,
				// 	node.heritageClauses,
				// 	ts.createNodeArray([node.members[0]].concat(functions))
				// );

				// return updatedClass;
			}
			return ts.visitEachChild(node, visit, context);
		}
		return ts.visitNode(rootNode, visit);
	};

	// const addIdentifiers = <T extends ts.Node>(
	// 	context: ts.TransformationContext
	// ) => (rootNode: T) => {
	// 	let count = 0;
	// };
}
