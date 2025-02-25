import * as os from "os";
import * as path from "path";
import { workspace, ExtensionContext } from "vscode";

import {
	LanguageClient,
	LanguageClientOptions,
} from "vscode-languageclient/node"

let client: LanguageClient;

export function activate(context: ExtensionContext) {

    const server = "gdshader-lsp-" + os.platform();
	const serverOptions = {
		command: context.asAbsolutePath(path.join("server", server))
	};

	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: "file", pattern: "**/*.{gdshader,gdshaderinc}" }],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher("**/.clientrc")
		}
	};

	client = new LanguageClient(
		"languageServerExample",
		"Language Server Example",
		serverOptions,
		clientOptions
	);

	client.start();
}

export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}

