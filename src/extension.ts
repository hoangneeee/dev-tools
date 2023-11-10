import * as vscode from 'vscode';
import { toCamelCase, toSlug } from './converter';

export function activate(context: vscode.ExtensionContext) {
  console.log('Congratulations, your extension "dev-tools" is now active!');

  let disposableCamelCase = vscode.commands.registerCommand('dev-tools.converToCamelCase', async () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      const camelCaseText = toCamelCase(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, camelCaseText);
      });
    }

  });

  let disposableSlug = vscode.commands.registerCommand('dev-tools.convertToSlug', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      const slugText = toSlug(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, slugText);
      });
    }
  });

  context.subscriptions.push(disposableCamelCase, disposableSlug);
}

export function deactivate() {}
