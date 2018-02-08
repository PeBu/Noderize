const chalk = require("chalk");
const { getCompiler } = require("./build");
const { options } = require("../options");
const { start } = require("./start");
const supportsColor = require("supports-color");

function run() {
	console.log(`${chalk.yellowBright("[INFO]")} Watching...`);

	const compiler = getCompiler(options);
	let child;
	let first = true;

	compiler.watch(
		{
			ignored: /node_modules/
		},
		(err, stats) => {
			first || console.log(); // Add extra line on rebuilds
			console.log(
				`${chalk.yellowBright("[INFO]")} ${first ? "B" : "Reb"}uilding...`
			);
			first = false;
			console.log(stats.toString({ colors: supportsColor.stdout }));

			if (child) {
				child.kill();
			}
			if (!stats.hasErrors()) {
				child = start();
			}
		}
	);
}

module.exports = { run };