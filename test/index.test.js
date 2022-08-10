const tape = require("tape");
const gracefulStat = require("../");
const fs = require("fs").promises;
const log = require("mk-log");
const path = require("path");

async function main() {
  const testFilePath = "test/work/test.txt";

  tape("check if file exists", async (t) => {
    try {
      await fs.writeFile(path.resolve(testFilePath), "test");
      const existsResult = await gracefulStat(testFilePath);
      t.ok(existsResult, "File exists");

      await fs.unlink(testFilePath);

      const notExistsResult = await gracefulStat(testFilePath);
      t.notOk(notExistsResult, "File does not exist");
    } catch (err) {
      log.error(err);
    } finally {
      t.end();
    }
  });
}

main();
