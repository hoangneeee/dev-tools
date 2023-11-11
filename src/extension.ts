import * as vscode from 'vscode';
import { toCamelCase, toSlug, toSnake } from './converter';

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

  let disposableSnakeCase = vscode.commands.registerCommand('dev-tools.convertToSnakeCase', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);
      const slugText = toSnake(text);
      editor.edit((editBuilder) => {
        editBuilder.replace(selection, slugText);
      });
    }
  });

  let disposableCheckAndConvert = vscode.commands.registerCommand('dev-tools.checkAndConvert', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const selection = editor.selection;
      const text = editor.document.getText(selection);

      if (/[A-Z]/.test(text)) {
        vscode.commands.executeCommand('dev-tools.convertToSnakeCase');
      } else if (/_/.test(text)) {
        vscode.commands.executeCommand('dev-tools.convertToSlug');
      } else {
        vscode.commands.executeCommand('dev-tools.converToCamelCase');
      }
    }
  });

  context.subscriptions.push(disposableCamelCase, disposableSnakeCase, disposableSlug, disposableCheckAndConvert);
}

export function deactivate() {}
