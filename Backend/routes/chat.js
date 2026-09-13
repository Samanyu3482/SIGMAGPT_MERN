import express from 'express';
import Thread from '../models/Thread.js';

const router = express();

// test

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "xyz",
            title : "testing new Thread"
        });
        const response = await thread.save();
        res.send(response);
    } catch(err) {
        console.log(err);
        res.status(500).json("Failed to save in DB");
    }
});

// get all threads 

router.get("/thread", async(req, res) => {
    try {
        const threads = await Thread.find({}).sort({updatedAt: -1});
        // descending order of updated val
        res.json(threads);

    } catch(err) {
        console.log(err);
        res.status(500).json("Error while fetching the threads");
    }
})

export default router;