const axios = require("axios");
const latency = require("./latency.mongo");
const node = require("../nodes/nodes.mongo");

const latency = {
    date: Date.now(),
    from: "",
    to: "",
    rtt: 0
};

async function getAllPings(skip, limit) {
    return await launches
        .find({}, { "_id": 0, "__v": 0 })
        .sort({ date: 1 })
        .skip(skip)
        .limit(limit);
}

async function findPing(filter) {
    return await launches.findOne(filter);
};

async function checkLaunchIdAvailable(launchId) {
    return await findLaunch({
        flightNumber: launchId
    });
}

async function getLatestFlightNumber() {
    const latestLaunch = await launches.findOne().sort("-flightNumber");

    if (!latestLaunch) {
        return DEFAULT_FLIGHT_NUMBER;
    };

    return latestLaunch.flightNumber;
}

async function saveLaunch(data) {
    await launches.findOneAndUpdate(
        {
            flightNumber: data.flightNumber
        },
        data,
        {
            upsert: true
        }
    );
};

async function addNewLaunch(launch) {
    const planet = await planets.findOne({
        keplerName: launch.destination
    });

    if (!planet) {
        throw new Error("No matching planet found!");
    }

    const latestFlightNumber = await getLatestFlightNumber() + 1;
    const newLaunch = Object.assign(launch, {
        success: true,
        upcoming: true,
        customers: ["MadMas", "NASA"],
        flightNumber: latestFlightNumber
    });

    await saveLaunch(newLaunch);
}

async function deleteLaunch(launchId) {
    const aborted = await launches.updateOne(
        {
            flightNumber: launchId,
        },
        {
            success: false,
            upcoming: false
        });

    return aborted.modifiedCount === 1;
}

module.exports = {
    loadLaunchesData,
    getAllLaunches,
    addNewLaunch,
    checkLaunchIdAvailable,
    deleteLaunch
};