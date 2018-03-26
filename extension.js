
///extension.sayHi
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const beautify = require('./formatters');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // console.log('Congratulations, your extension "beautify-quick-app" is now active!');

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('beautifyQuickApp', function () {
        // The code you place here will be executed every time your command is executed

        const a = vscode.window.activeTextEditor;
        if (a && a.document && /\.(vue)|(wpy)|(ux)$/i.test(a.document.fileName) ) {
            //const langId = a.document.languageId;
            // textEditor option
            let editorInsertSpace = a.options.insertSpaces;
            let editorTabSize = a.options.tabSize;
            let text = a.document.getText(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE));
            let range = a.document.validateRange(new vscode.Range(0, 0, Number.MAX_VALUE, Number.MAX_VALUE))
            let outputText = beautify(text, !editorInsertSpace, editorTabSize, undefined );

            a.edit(editor => editor.replace(range, outputText ));
        }
        
        // vscode.window.showInformationMessage('Hello World!');
    });

    context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;