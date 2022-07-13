const fs = require("fs");
const nodes = require("./nodes.mongo");
const { parse } = require("csv-parse");
const path = require("path");

function loadNodesData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "..", "data", "nodes.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        await saveNode(data);
      })
      .on("error", (error) => {
        console.log(`saving nodes is failed: ${error}`);
        reject();
      })
      .on("end", async () => {
        const numNodes = (await getAllNodes()).length;
        console.log(`the number of nodes is ${numNodes}.`);
        resolve();
      });
  });
}

async function getAllNodes() {
  return await nodes.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

async function saveNode(data) {
  try {
    await nodes.updateOne(
      {
        nodeName: data.nodeName,
      },
      {
        nodeName: data.nodeName,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`saving nodes is failed: ${error}`);
  }
}

module.exports = {
  loadNodesData,
  getAllNodes,
};
