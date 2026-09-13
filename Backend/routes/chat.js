import express from 'express';
import Thread from '../models/Thread.js';
import getOpenAIAPIResponse from '../utils/openai.js';
const router = express();

// test

router.post("/test", async (req, res) => {
    try {
        const thread = new Thread({
            threadId: "abc",
            title : "testing new Thread2"
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

router.get("/thread/:threadId", async(req, res) => {
    try {
        const {threadId} = req.params
        const thread = await Thread.find({threadId});
        if(!thread) {
            return res.status(404).json("Invalid Id or thread is not found");
        }
        res.send(thread.messages);

    } catch(err) {
        console.log(err);
        res.status(500).json("Cannot fetch the particular thread");
    }
});

router.delete("/thread/:threadId", async(req, res) => {
    try {
        const {threadId} = req.params;
        const deletedThread = await Thread.findOneAndDelete({threadId});
        if(!deletedThread) {
            return res.status(404).json("thread not found");
        }
        res.status(200).json("Thread deleted successfully");
    } catch(err) {
        console.log(err);
        res.status(500).json("unable to delete the thread");
    }
});


router.post("/chat", async(req, res) => {
    const {threadId, message} = req.body;

    if(!threadId || !message) {
        res.status(404).json("Missing Required Fields");
    }
    try {
        let thread = await Thread.findOne({threadId});
        if(!thread) {
            thread = new Thread({
                threadId,
                title : message,
                messages : [{role : "user", content : message}]
            });
        } else {
            thread.messages.push({role : "user", content : message });
        }
        const assistantReply = await getOpenAIAPIResponse(message);
        thread.messages.push({role : "assistant", content : assistantReply});
        thread.updatedAt = new Date();
        await thread.save();
        res.json({reply : assistantReply});
    } catch(err) {
        console.log(err);
        res.status(500).json("Error! Something Went Wrong");
    }
})
export default router;