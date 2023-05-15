import { watch } from "turbowatch";

void watch({
  project: __dirname,
  triggers: [
    {
      expression: [
        "allof",
        ["not", ["dirname", "node_modules"]],
        ["match", "*.ts", "basename"],
      ],
      // Because of this setting, Turbowatch will kill the processes that spawn starts
      // when it detects changes when it detects a change.
      interruptible: true,
      name: "start-server",
      onChange: async ({ spawn }) => {
        await spawn`tsc`;
        await spawn`DEBUG=* node ./dist/app.js`;
      },
    },
  ],
});
