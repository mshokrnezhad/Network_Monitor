const fs = require("fs");
const nodes = require("./nodes.mongo");
const { parse } = require("csv-parse");
const path = require("path");

function loadNodesData() {
  var nodeCounter = 0;

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
        nodeCounter += 1;
        await saveNode(data);
      })
      .on("error", (error) => {
        console.log(`saving nodes is failed: ${error}`);
        reject();
      })
      .on("end", async () => {
        console.log(`the number of nodes is ${nodeCounter}.`);
        resolve();
      });
  });
}

async function saveNode(data) {
  try {
    await nodes.updateOne(
      {
        nodeName: data.nodeName,
        nodeAddress: data.nodeAddress,
      },
      {
        nodeName: data.nodeName,
        nodeAddress: data.nodeAddress,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`saving nodes is failed: ${error}`);
  }
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

module.exports = {
  loadNodesData,
  getAllNodes,
};
